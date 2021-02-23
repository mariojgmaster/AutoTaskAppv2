import { Ionicons, AntDesign, MaterialCommunityIcons, Entypo, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { useState } from 'react';
import {
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    Alert,
    View,
    Image,
    TouchableWithoutFeedback,
    TextInput,
    FlatList,
    ScrollView,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import axios from 'axios';
import Api from '../../services/api'

import layouts from '../../constants/Layout';
import images from '../../constants/images';
import colors from '../../constants/Colors';

export default class DevicesEditScreen extends React.Component {

    state = {
        UserDataSis: {},
        userData: [],
        isLoading: true,
    }

    async componentDidMount() {
        try {
            const UserData = await AsyncStorage.getItem('@UserData')
            if (UserData !== null) {
                let user_data = JSON.parse(UserData)
                this.setState({ UserDataSis: user_data })
                console.log('START - PRIMEIRO ---- this.state.UserDataSis')
                console.log(this.state.UserDataSis)
                console.log('END - PRIMEIRO ---- this.state.UserDataSis')
            }
        } catch (e) { console.log('Error "@UserEmail": ' + e) }

        await axios.get(`${Api.EndPoint.URL}/usuarios`)
            .then(res => {
                console.log(res.data)
                this.setState({ userData: res.data })
            })
            .then(res => this.setState({ isLoading: false }))
            .catch(err => console.error(`Erro no Get de departamentos: ${err}`))
    }

    render() {
        return (
            <SafeAreaProvider>
                <View style={styles.container}>
                    <View style={styles.itemsContainer_img}>
                        <Image style={styles.imgUser} source={images.User.manageUserUri} />
                    </View>
                    <View style={styles.listContainer}>
                        {
                            !this.state.isLoading ?
                                <FlatList
                                    keyExtractor={(item, index) => index.toString()}
                                    data={this.state.UserDataSis.administrador ? this.state.userData : [this.state.UserDataSis]}
                                    renderItem={({ item }) => (
                                        <Item id={item.id}
                                            name={item.nome}
                                            active={item.ativo}
                                            login={item.login}
                                            password={item.senha}
                                            isAdmin={item.administrador}
                                            userIdSis={this.state.UserDataSis.id}
                                            nav={this.props.navigation} />
                                    )} /> : <ActivityIndicator style={{ paddingTop: 100 }} size='large' color="#FFF" />
                        }
                    </View>
                </View>
            </SafeAreaProvider>
        );
    }
}

const showToast = text => {
    ToastAndroid.showWithGravity(
        text,
        ToastAndroid.LONG,
        ToastAndroid.CENTER
    )
}

function Item({ id, name, login, password, active, userIdSis, isAdmin, nav }) {

    const [fieldNameValue, setFieldNameValue] = useState(name)
    const [fieldLoginValue, setFieldLoginValue] = useState(login)
    const [fieldPasswordValue, setFieldPasswordValue] = useState(password)
    const [fieldActiveValue, setFieldActiveValue] = useState(active)

    const saveUserChanges = async (id, idUser, admin) => {
        let payload = {
            id: id,
            nome: fieldNameValue,
            Login: fieldLoginValue,
            Senha: fieldPasswordValue,
            ativo: fieldActiveValue,
            Administrador: admin
        }
        // let payloadSave = { id: id, nome: name, login: mail, senha: pass, ativo: true, administrador: admin }
        console.log('payload');
        console.log(payload);
        console.log('---');
        let res = await axios.put(`${Api.EndPoint.URL}/usuarios/${id}`, payload);
        let data = res.data;
        console.log(data);

        id == idUser ? userData(payload) : null

        showToast("Equipamento alterado com sucesso!")
        nav.goBack()
    }

    const deleteDevice = async id => {
        let res = await axios.delete(`${Api.EndPoint.URL}/usuarios/${id}`);
        let data = res.data;
        console.log(data);
        showToast("Equipamento excluído com sucesso!")
    }

    const userData = async value => {
        try { await AsyncStorage.setItem('@UserData', JSON.stringify(value)) }
		catch (e) { console.log('Error "@UserData": ' + e) }
    }

    return (
        <View key={id} style={styles.itemsContainer_box}>
            <View style={[{ width: '100%', paddingHorizontal: 20 }, userIdSis == id ? { paddingTop: 5 } : null]}>
                {
                    userIdSis == id ?
                        <View style={{ position: 'absolute', right: 15 }}>
                            <Ionicons size={20} name="star" color='#AAAAAA55' />
                        </View> : null
                }
                <View style={styles.itemContainer}>
                    <View style={styles.imgContainer}>
                        <TabBarIconType3 name="account-edit-outline" color="#CCC" />
                    </View>
                    <TextInput
                        style={[styles.inputs, styles.inputs_name]}
                        onChangeText={value => setFieldNameValue(value)} placeholder='Nome'
                        secureTextEntry={false} defaultValue={fieldNameValue} placeholderTextColor="#555" />
                </View>

                <View style={styles.itemContainer}>
                    <View style={styles.imgContainer}>
                        <TabBarIconType4 name="email" color="#CCC" />
                    </View>
                    <TextInput
                        style={[styles.inputs, styles.inputs_name]}
                        onChangeText={value => setFieldLoginValue(value)} placeholder='Login'
                        secureTextEntry={false} defaultValue={fieldLoginValue} placeholderTextColor="#555" />
                </View>

                <View style={styles.itemContainer}>
                    <View style={styles.imgContainer}>
                        <TabBarIconType3 name="form-textbox-password" color="#CCC" />
                    </View>
                    <TextInput
                        style={[styles.inputs, styles.inputs_name]}
                        onChangeText={value => setFieldPasswordValue(value)} placeholder='Senha'
                        secureTextEntry={true} defaultValue={fieldPasswordValue} placeholderTextColor="#555" />
                </View>

                <View style={[styles.itemContainer, {justifyContent:'center'}]}>
                    <View style={styles.imgContainer}>
                        <TabBarIconType5 name="online-prediction" color={'#CCC'} />
                    </View>
                    <Switch
                        trackColor={{ false: "#DDD", true: "rgba(0,150,0,0.8)" }}
                        thumbColor="#BBB"
                        onValueChange={() => setFieldActiveValue(!fieldActiveValue)}
                        value={fieldActiveValue}
                        style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                    />
                </View>
            </View>

            <View style={{ width: '100%', paddingTop: 10, paddingBottom: 5, paddingHorizontal: 20, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                <TouchableWithoutFeedback onPress={() =>
                    Alert.alert(
                        "Deseja salvar as alterações?", '',
                        [
                            { text: "Sim", onPress: () => saveUserChanges(id, userIdSis, isAdmin) },
                            { text: "Não", style: 'cancel', onPress: () => console.log('Cancelar Salvamento de Departamento') }
                        ], { cancelable: true }
                    )}>
                    <Text style={{ color: '#EEE', fontSize: 16, marginTop: 5 }}>Salvar</Text>
                </TouchableWithoutFeedback>

                {
                    id != userIdSis && isAdmin == true ? null:
                        <TouchableWithoutFeedback onPress={() => {
                            Alert.alert(
                                "Deseja excluir sua conta?", '',
                                [
                                    { text: "Excluir", onPress: () => deleteUser(id) },
                                    { text: "Cancelar", style: 'cancel', onPress: () => console.log('Cancelar Exclusão de Departamento') }
                                ], { cancelable: true }
                            )
                        }}>
                            <Text style={{ color: 'rgba(255,0,0,0.8)', fontSize: 16, marginTop: 5 }}>Excluir</Text>
                        </TouchableWithoutFeedback>
                }
            </View>
        </View>
    )
}

function TabBarIconType1(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
    return <Ionicons size={22} {...props} />;
}

function TabBarIconType2(props: { name: React.ComponentProps<typeof AntDesign>['name']; color: string }) {
    return <AntDesign size={22} {...props} />;
}

function TabBarIconType3(props: { name: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color: string }) {
    return <MaterialCommunityIcons size={22} {...props} />;
}

function TabBarIconType4(props: { name: React.ComponentProps<typeof Entypo>['name']; color: string }) {
    return <Entypo size={22} {...props} />;
}

function TabBarIconType5(props: { name: React.ComponentProps<typeof MaterialIcons>['name']; color: string }) {
    return <MaterialIcons size={26} {...props} />;
}

const styles = StyleSheet.create({
    container: {
        height: layouts.window.height,
        paddingHorizontal: 20,
        paddingTop: 40,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: colors.DrawerContent.background,
    },
    itemsContainer_img: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
    },
    listContainer: {
        flex: 3,
        width: layouts.window.width,
        paddingHorizontal: layouts.window.width * 0.1,
        paddingBottom: 10,
    },
    itemsContainer_box: {
        marginTop: 15,
        marginBottom: 10,
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: layouts.window.width * 0.03,
    },
    itemContainer: {
        width: '100%',
        height: 50,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    imgContainer: {
        width: 32,
        height: 32,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    imgUser: {
        width: 140,
        height: 140,
        margin: 20,
        borderRadius: 140,
    },
    text: {
        fontSize: 18,
        color: colors.DrawerContent.text,
    },
    inputs: {
        width: '70%',
        color: '#CCC',
        borderBottomColor: '#CCC',
        borderBottomWidth: 2,
    },
})
