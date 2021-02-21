import { StackScreenProps } from '@react-navigation/stack';
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
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import axios from 'axios';
import Api from '../services/api'

import layouts from '../constants/Layout';
import images from '../constants/images';
import colors from '../constants/Colors';

export default class DevicesScreen extends React.Component {

    // Dados a alterar do device
    // { "id": 1, "usuarioCadastro": { "id": 2 }, "departamento": { "id": 2 }, "nome": "Ar Condicionado Split", "ativo": true, "ligado": false, "path": "001-07" }

    state = {
        UserData: {},
        departmentData: [],
        isFieldEditable: false,
        isLoading: true,
        newNome: [],
        newLigado: false,
        newAtivo: false,
        qtdDepartamentos: 0,
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

        await axios.get(`${Api.EndPoint.URL}/equipamentos`)
            .then(res => {
                console.log(res.data)
                this.setState({ departmentData: res.data })
            }
            )
            .then(res => this.setState({ isLoading: false, qtdDepartamentos: this.state.departmentData.length }))
            .catch(err => console.error(`Erro no Get de departamentos: ${err}`))
    }

    saveChanges = async (id, idUsuario, name, active) => {
        // let payload = { 
        //     Id: id,
        //     UsuarioCadastro: { id: idUsuario }, 
        //     Nome: nome, 
        //     Ativo: active 
        // }
        // console.log('payloadSend');
        // console.log(payloadSend);
        // console.log('---');
        // let res = await axios.put(`${Api.EndPoint.URL}/departamentos/${id}`, payload);
        // let data = res.data;
        // console.log(data);

        // this.props.navigation.goBack()
        // alert(id)
        console.log(this.arrTeste)
    }

    arrTeste = []

    render() {
        return (
            <SafeAreaProvider>
                <View style={styles.container}>
                    <View style={{width:'100%'}}>
                        <Text style={{color:'rgba(255,255,255,0.3)',fontSize:20,fontWeight:'bold'}}>EQUIPAMENTOS</Text>
                    </View>
                    <ScrollView style={{ width: layouts.window.width, paddingHorizontal: layouts.window.width * 0.1, marginBottom: 30 }}>
                        {
                            !this.state.isLoading ?
                                this.state.departmentData.map((item, i) => {

                                    let nomeAux = item.nome
                                    let ativoAux = item.ativo
                                    let aux = { nomeAux, ativoAux }
                                    this.arrTeste.push(aux)

                                    return (<View key={item.id} style={styles.itemsContainer_box}>


                                        {/* Teste sem reaproveitamento de código (Funcionou) - Revisar Depois */}
                                        {/* ---------------------------------------------------------------------------------------------------------------------- */}

                                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingRight: 20, paddingLeft: 10 }}>
                                            <View style={[styles.itemsContainer_img, {flex:1}]}>
                                                <Image style={styles.imgUser} source={images.Device.deviceUri} />
                                            </View>

                                            <View style={{ flex:4, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: '#EEE', fontSize: 14 }}>{item.nome}</Text>
                                            </View>

                                            <TouchableWithoutFeedback
                                                style={[styles.itemContainer, {flex:1}]}>
                                                <View style={styles.itemContainer}>
                                                    <Switch
                                                        trackColor={{ false: "#DDD", true: "rgba(0,150,0,0.8)" }}
                                                        thumbColor={item.ligado ? "#BBB" : "#BBB"}
                                                        onValueChange={() => this.setState({ newLigado: !item.ligado })}
                                                        value={item.ligado}
                                                        style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                                                    />
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>

                                        {/* ---------------------------------------------------------------------------------------------------------------------- */}

                                        {/* <ItemMenu title="Nome" valor={this.state.UserData.nome} />
                                            <ItemMenu title="Login" valor={this.state.UserData.login} />
                                            <ItemMenu title="Senha" valor={this.state.UserData.senha} /> */}
                                    </View>)
                                }) : <ActivityIndicator style={{ paddingTop: 100 }} size='large' color="#FFF" />
                        }
                    </ScrollView>
                    {/* <ItemDepartamento departmentData={this.state.departmentData} /> */}
                </View>
            </SafeAreaProvider>
        );
    }
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
        // width: '100%',
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
