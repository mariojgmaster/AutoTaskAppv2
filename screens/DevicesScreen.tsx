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
import Api from '../services/api'

import layouts from '../constants/Layout';
import images from '../constants/images';
import colors from '../constants/Colors';

export default class DevicesScreen extends React.Component {

    state = {
        UserData: {},
        deviceData: [],
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

        this.getData()
    }

    getData = async () => {
        await axios.get(`${Api.EndPoint.URL}/equipamentos`)
            .then(res => {
                console.log(res.data)
                this.setState({ deviceData: res.data })
            })
            .then(res => this.setState({ isLoading: false }))
            .catch(err => console.error(`Erro no Get de departamentos: ${err}`))
    }

    render() {
        function IsListEmptyMessage(props) {
            return (
                <View style={styles.itemsContainer_box}>
                    <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18, textAlign: 'center' }}>Não há {props.valor} a serem exibidos.</Text>
                    </View>
                </View>
            )
        }
        return (
            <SafeAreaProvider>
                <View style={styles.container}>
                    <View style={{ width: '100%', paddingBottom: 20 }}>
                        <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 20, fontWeight: 'bold' }}>EQUIPAMENTOS</Text>
                    </View>
                    <View style={styles.listContainer}>
                        {
                            !this.state.isLoading ?
                                <FlatList
                                    keyExtractor={(item, index) => index.toString()}
                                    data={this.state.deviceData}
                                    refreshing={this.state.isLoading}
                                    onRefresh={this.getData}
                                    renderItem={({ item, index }) => (
                                        ((item.usuarioCadastro.id == this.state.UserData.id || this.state.deviceData.length == 0) &&
                                            item.ativo == true ?
                                            <Item id={item.id}
                                                idUser={this.state.UserData.id}
                                                name={item.nome}
                                                active={item.ativo}
                                                turnedOn={item.ligado}
                                                idDepartment={item.departamento.id}
                                                path={item.path}
                                                nav={this.props.navigation} /> :
                                            (index == this.state.deviceData.length - 1 ? <IsListEmptyMessage valor="Dispositivos" /> : null))
                                    )} /> : <ActivityIndicator style={{ paddingTop: 100 }} size='large' color="#FFF" />
                        }
                    </View>
                </View>
            </SafeAreaProvider>
        )
    }
}

const showToast = text => {
    ToastAndroid.showWithGravity(
        text,
        ToastAndroid.LONG,
        ToastAndroid.CENTER
    )
}

function Item({ id, name, active, turnedOn, idUser, idDepartment, path, nav }) {

    const [fieldTurnedOnValue, setFieldTurnedOnValue] = useState(turnedOn)

    const saveDeviceChanges = async (id, isTurnedOn) => {
        let payload = {
            EquipamentoId: id,
            Ligado: isTurnedOn
        }
        console.log('payload');
        console.log(payload);
        console.log('---');
        let res = await axios.post(`${Api.EndPoint.URL}/equipamentos/comando`, payload);
        let data = res.data;
        console.log(data);

        showToast("Equipamento " + (isTurnedOn ? 'Ligado' : 'Desligado'))
    }

    return (

        <View style={styles.itemsContainer_box}>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingRight: 20, paddingLeft: 10 }}>
                <View style={[styles.itemsContainer_img, { flex: 1 }]}>
                    <Image style={styles.imgUser} source={images.Device.deviceUri} />
                </View>

                <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#EEE', fontSize: 14 }}>{name}</Text>
                </View>

                <TouchableWithoutFeedback
                    style={[styles.itemContainer, { flex: 1 }]}>
                    <View style={styles.itemContainer}>
                        <Switch
                            trackColor={{ false: "#DDD", true: "rgba(0,150,0,0.8)" }}
                            thumbColor="#BBB"
                            onValueChange={() => {
                                setFieldTurnedOnValue(!fieldTurnedOnValue)
                                saveDeviceChanges(id, !fieldTurnedOnValue)
                            }}
                            value={fieldTurnedOnValue}
                            style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )

    // return (
    //     <View key={id} style={styles.itemsContainer_box}>

    //         <View style={{ paddingVertical: 10 }}>
    //             <Text style={{ color: '#EEE', fontSize: 18 }}>{name}</Text>
    //         </View>

    //         <View style={styles.itemContainer}>
    //             <View style={styles.imgContainer}>
    //                 <TabBarIconType2 name="home" color={'#CCC'} />
    //             </View>
    //             <TextInput
    //                 style={{ width: layouts.window.width * 0.5, color: '#AAA', borderBottomWidth: 1, borderBottomColor: '#555' }}
    //                 onChangeText={value => setFieldNameValue(value)} placeholder='Departamento'
    //                 secureTextEntry={false} defaultValue={fieldNameValue} placeholderTextColor="#555" />
    //         </View>

    //         <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 }}>
    //             <View style={styles.itemContainer}>
    //                 <View style={styles.imgContainer}>
    //                     <TabBarIconType5 name="online-prediction" color={'#CCC'} />
    //                 </View>
    //                 <Switch
    //                     trackColor={{ false: "#DDD", true: "rgba(0,150,0,0.8)" }}
    //                     thumbColor="#BBB"
    //                     onValueChange={() => setFieldActiveValue(!fieldActiveValue)}
    //                     value={fieldActiveValue}
    //                     style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
    //                 />
    //             </View>

    //             <View style={styles.itemContainer}>
    //                 <View style={styles.imgContainer}>
    //                     <TabBarIconType2 name="poweroff" color={'#CCC'} />
    //                 </View>
    //                 <Switch
    //                     trackColor={{ false: "#DDD", true: "rgba(0,150,0,0.8)" }}
    //                     thumbColor="#BBB"
    //                     onValueChange={() => setFieldTurnedOnValue(!fieldTurnedOnValue)}
    //                     value={fieldTurnedOnValue}
    //                     style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
    //                 />
    //             </View>
    //         </View>

    //         <View style={{ width: '100%', paddingTop: 10, paddingBottom: 5, paddingHorizontal: 20, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
    //             <TouchableWithoutFeedback onPress={() =>
    //                 Alert.alert(
    //                     "Deseja salvar as alterações?", '',
    //                     [
    //                         { text: "Sim", onPress: () => saveDeviceChanges(id, idUser, idDepartment, path) },
    //                         { text: "Não", style: 'cancel', onPress: () => console.log('Cancelar Salvamento de Departamento') }
    //                     ], { cancelable: true }
    //                 )}>
    //                 <Text style={{ color: '#EEE', fontSize: 16, marginTop: 5 }}>Salvar</Text>
    //             </TouchableWithoutFeedback>

    //             <TouchableWithoutFeedback onPress={() => {
    //                 Alert.alert(
    //                     "Deseja excluir sua conta?", '',
    //                     [
    //                         { text: "Excluir", onPress: () => deleteDevice(id) },
    //                         { text: "Cancelar", style: 'cancel', onPress: () => console.log('Cancelar Exclusão de Departamento') }
    //                     ], { cancelable: true }
    //                 )
    //             }}>
    //                 <Text style={{ color: 'rgba(255,0,0,0.8)', fontSize: 16, marginTop: 5 }}>Excluir</Text>
    //             </TouchableWithoutFeedback>
    //         </View>
    //     </View>
    // )
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
        padding: 20,
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
        // width: '100%',
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
        width: 40,
        height: 40,
        // margin: 20,
        borderRadius: 40,
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

// const styles = StyleSheet.create({
//     container: {
//         height: layouts.window.height,
//         paddingHorizontal: 20,
//         paddingTop: 40,
//         flexDirection: 'column',
//         alignItems: 'center',
//         backgroundColor: colors.DrawerContent.background,
//     },
//     itemsContainer_img: {
//         flex: 1,
//         width: '100%',
//         alignItems: 'center',
//     },
//     listContainer: {
//         flex: 3,
//         width: layouts.window.width,
//         paddingHorizontal: layouts.window.width * 0.1
//     },
//     itemsContainer_box: {
//         marginTop: 15,
//         marginBottom: 10,
//         paddingVertical: 10,
//         width: '100%',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'rgba(255,255,255,0.05)',
//         borderRadius: layouts.window.width * 0.03,
//     },
//     itemContainer: {
//         width: '100%',
//         height: 50,
//         borderRadius: 6,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     imgContainer: {
//         width: 32,
//         height: 32,
//         borderRadius: 32,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginRight: 16,
//     },
//     imgUser: {
//         width: 140,
//         height: 140,
//         margin: 20,
//         borderRadius: 140,
//     },
//     text: {
//         fontSize: 18,
//         color: colors.DrawerContent.text,
//     },
//     inputs: {
//         width: layouts.window.width * 0.7,
//         color: colors.DrawerContent.text,
//         borderBottomColor: colors.DrawerContent.text,
//         borderBottomWidth: 2,
//     },
// })
