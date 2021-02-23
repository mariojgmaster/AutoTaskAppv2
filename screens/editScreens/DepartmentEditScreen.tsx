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

export default class DepartmentEditScreen extends React.Component {

    state = {
        UserData: {},
        departmentData: [],
        isLoading: true,
    }

    async componentDidMount() {
        try {
            const UserData = await AsyncStorage.getItem('@UserData')
            if (UserData !== null) {
                let user_data = JSON.parse(UserData)
                this.setState({ UserData: user_data })
                console.log(this.state.UserData)
            }
        } catch (e) { console.log('Error "@UserEmail": ' + e) }

        await axios.get(`${Api.EndPoint.URL}/departamentos`)
            .then(res => {
                console.log(res.data)
                this.setState({ departmentData: res.data })
            })
            .then(res => this.setState({ isLoading: false }))
            .catch(err => console.error(`Erro no Get de departamentos: ${err}`))
    }

    render() {
        return (
            <SafeAreaProvider>
                <View style={styles.container}>
                    <View style={styles.itemsContainer_img}>
                        <Image style={styles.imgUser} source={images.Department.manageDepartmentUri} />
                    </View>
                    <View style={styles.listContainer}>
                        {
                            !this.state.isLoading ?
                                <FlatList
                                    keyExtractor={(item, index) => index.toString()}
                                    data={this.state.departmentData}
                                    renderItem={({ item }) => (
                                        <Item id={item.id}
                                            idUser={this.state.UserData.id}
                                            name={item.nome}
                                            active={item.ativo}
                                            deptsList={this.state.departmentData}
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

function Item({ id, name, active, idUser, nav }) {

    const [fieldNameValue, setFieldNameValue] = useState(name)
    const [fieldActiveValue, setFieldActiveValue] = useState(active)

    const saveDepartmentChanges = async (id, idUsuario) => {
        let payload = {
            Id: id,
            UsuarioCadastro: { id: idUsuario },
            Nome: fieldNameValue,
            Ativo: fieldActiveValue
        }
        console.log('payload');
        console.log(payload);
        console.log('---');
        let res = await axios.put(`${Api.EndPoint.URL}/departamentos/${id}`, payload);
        let data = res.data;
        console.log(data);

        showToast("Departamento alterado com sucesso!")
        nav.goBack()
    }

    const deleteDepartment = async id => {
        let res = await axios.delete(`${Api.EndPoint.URL}/departamentos/${id}`);
        let data = res.data;
        console.log(data);

        showToast("Departamento excluído com sucesso!")
        nav.goBack()
    }

    return (
        <View key={id} style={styles.itemsContainer_box}>
            <View style={{ paddingVertical: 10 }}>
                <Text style={{ color: '#EEE', fontSize: 18 }}>{name}</Text>
            </View>

            <View style={styles.itemContainer}>
                <View style={styles.imgContainer}>
                    <TabBarIconType2 name="home" color={'#CCC'} />
                </View>
                <TextInput
                    style={{ width: layouts.window.width * 0.5, color: '#AAA', borderBottomWidth: 1, borderBottomColor: '#555' }}
                    onChangeText={value => setFieldNameValue(value)} placeholder='Departamento'
                    secureTextEntry={false} defaultValue={fieldNameValue} placeholderTextColor="#555" />
            </View>

            <View style={styles.itemContainer}>
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

            <View style={{ width: '100%', paddingTop: 10, paddingBottom: 5, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                <TouchableWithoutFeedback onPress={() =>
                    Alert.alert(
                        "Deseja salvar as alterações?", '',
                        [
                            { text: "Sim", onPress: () => saveDepartmentChanges(id, idUser) },
                            { text: "Não", style: 'cancel', onPress: () => console.log('Cancelar Salvamento de Departamento') }
                        ], { cancelable: true }
                    )}>
                    <Text style={{ color: '#EEE', fontSize: 16, marginTop: 5 }}>Salvar</Text>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {
                    Alert.alert(
                        "Deseja excluir sua conta?", '',
                        [
                            { text: "Excluir", onPress: () => deleteDepartment(id) },
                            { text: "Cancelar", style: 'cancel', onPress: () => console.log('Cancelar Exclusão de Departamento') }
                        ], { cancelable: true }
                    )
                }}>
                    <Text style={{ color: 'rgba(255,0,0,0.8)', fontSize: 16, marginTop: 5 }}>Excluir</Text>
                </TouchableWithoutFeedback>
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
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    listContainer: {
        flex: 3,
        width: layouts.window.width,
        paddingHorizontal: layouts.window.width * 0.1
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
        justifyContent: 'center',
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
        width: layouts.window.width * 0.7,
        color: colors.DrawerContent.text,
        borderBottomColor: colors.DrawerContent.text,
        borderBottomWidth: 2,
    },
})
