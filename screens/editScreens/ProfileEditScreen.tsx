import { StackScreenProps } from '@react-navigation/stack';
import { Ionicons, AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert, View, Image, TouchableWithoutFeedback, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import axios from 'axios';
import Api from '../../services/api'

import layouts from '../../constants/Layout';
import images from '../../constants/images';
import colors from '../../constants/Colors';

export default class ProfileEditScreen extends React.Component {

    // Dados a alterar do usuario
    // { "Id":2, "Nome": "Sistema", "Login":"sistema", "Senha":"abcd", "Ativo":true, "Administrador":true }

    state = {
        UserData: {},
        isFieldEditable: false,
        newNome: '',
        newLogin: '',
        newSenha: '',
    }

    userData = async value => {
        try { await AsyncStorage.setItem('@UserData', JSON.stringify(value)) }
		catch (e) { console.log('Error "@UserData": ' + e) }
    }

    async componentDidMount() {
        try {
            const UserData = await AsyncStorage.getItem('@UserData')
            if (UserData !== null) {
                let user_data = JSON.parse(UserData)
                this.setState({
                    UserData: user_data,
                    newNome: user_data.nome,
                    newLogin: user_data.login,
                    newSenha: user_data.senha,
                })
                console.log(this.state.UserData.nome)
            }
        } catch (e) { console.log('Error "@UserEmail": ' + e) }
    }

    saveChanges = async (id, name, mail, pass, active, admin) => {
        let payloadSend = {
            Id: id,
            Nome: name,
            Login: mail,
            Senha: pass,
            Ativo: active,
            Administrador: admin
        }
        let payloadSave = { id: id, nome: name, login: mail, senha: pass, ativo: true, administrador: admin }
        console.log('payloadSend');
        console.log(payloadSend);
        console.log('---');
        let res = await axios.put(`${Api.EndPoint.URL}/usuarios/${id}`, payloadSend);
        let data = res.data;
        console.log(data);

        this.userData(payloadSave)

        this.props.navigation.goBack()
    }

    render() {
        return (
            <SafeAreaProvider>
                <View style={styles.container}>
                    <View style={{ width: layouts.window.width, paddingBottom: 30, paddingRight: 20, alignItems: 'flex-end' }}>
                        <TouchableWithoutFeedback onPress={() => {
                            Alert.alert(
                                "Deseja salvar as alterações?", '',
                                [
                                    {
                                        text: "Sim", onPress: () => this.saveChanges(
                                            this.state.UserData.id,
                                            this.state.newNome,
                                            this.state.newLogin,
                                            this.state.newSenha,
                                            this.state.UserData.ativo,
                                            this.state.UserData.administrador
                                        )
                                    },
                                    { text: "Não", onPress: () => console.log('Cancelar') }
                                ], { cancelable: true }
                            )
                        }}>
                            <Text style={{ color: '#EEE', fontSize: 16 }}>Salvar</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.itemsContainer_img}>
                        <Image style={styles.imgUser} source={images.User.manageUserUri} />
                    </View>
                    <View style={styles.itemsContainer_box}>

                        {/* Teste sem reaproveitamento de código (Funcionou) - Revisar Depois */}
                        {/* ---------------------------------------------------------------------------------------------------------------------- */}

                        <TouchableWithoutFeedback
                            onPress={() => this.setState({ isFieldEditable: !this.state.isFieldEditable })} onBlur={() => this.setState({ isFieldEditable: !this.state.isFieldEditable })}
                            style={styles.itemContainer}>
                            <View style={styles.itemContainer}>
                                <View style={styles.imgContainer}>
                                    <TabBarIconType3 name="account-edit-outline" color={this.state.isFieldEditable ? colors.Profile.icon : '#CCC'} />
                                </View>
                                <TextInput
                                    style={ this.state.isFieldEditable ? [styles.inputs, styles.inputs_name] :
                                            {width:layouts.window.width*0.5,color:'#AAA',borderBottomWidth:1,borderBottomColor:'#555'}}
                                    onChangeText={value => this.setState({ newNome: value })}
                                    // editable={this.state.isFieldEditable}
                                    secureTextEntry={false} value={this.state.newNome} placeholder='Nome'
                                    onBlur={() => this.setState({ isFieldEditable: !this.state.isFieldEditable })} placeholderTextColor="#555" />
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback
                            onPress={() => this.setState({ isFieldEditable: !this.state.isFieldEditable })} onBlur={() => this.setState({ isFieldEditable: !this.state.isFieldEditable })}
                            style={styles.itemContainer}>
                            <View style={styles.itemContainer}>
                                <View style={styles.imgContainer}>
                                    <TabBarIconType4 name="email" color={this.state.isFieldEditable ? colors.Profile.icon : '#CCC'} />
                                </View>
                                <TextInput
                                    style={ this.state.isFieldEditable ? [styles.inputs, styles.inputs_name] :
                                            {width:layouts.window.width*0.5,color:'#AAA',borderBottomWidth:1,borderBottomColor:'#555'}}
                                    onChangeText={value => this.setState({ newLogin: value })}
                                    // editable={this.state.isFieldEditable}
                                    secureTextEntry={false} value={this.state.newLogin} placeholder='Login'
                                    onBlur={() => this.setState({ isFieldEditable: !this.state.isFieldEditable })} placeholderTextColor="#555" />
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback
                            onPress={() => this.setState({ isFieldEditable: !this.state.isFieldEditable })} onBlur={() => this.setState({ isFieldEditable: !this.state.isFieldEditable })}
                            style={styles.itemContainer}>
                            <View style={styles.itemContainer}>
                                <View style={styles.imgContainer}>
                                    <TabBarIconType3 name="form-textbox-password" color={this.state.isFieldEditable ? colors.Profile.icon : '#CCC'} />
                                </View>
                                <TextInput
                                    style={ this.state.isFieldEditable ? [styles.inputs, styles.inputs_name] :
                                            {width:layouts.window.width*0.5,color:'#AAA',borderBottomWidth:1,borderBottomColor:'#555'}}
                                    onChangeText={value => this.setState({ newSenha: value })}
                                    // editable={this.state.isFieldEditable}
                                    secureTextEntry={true} value={this.state.newSenha} placeholder='Senha'
                                    onBlur={() => this.setState({ isFieldEditable: !this.state.isFieldEditable })} placeholderTextColor="#555" />
                            </View>
                        </TouchableWithoutFeedback>

                        {/* ---------------------------------------------------------------------------------------------------------------------- */}

                        {/* <ItemMenu title="Nome" valor={this.state.UserData.nome} />
                        <ItemMenu title="Login" valor={this.state.UserData.login} />
                        <ItemMenu title="Senha" valor={this.state.UserData.senha} /> */}
                    </View>
                </View>
            </SafeAreaProvider>
        );
    }
}


/* TODO: REVER MÉTODO DEPOIS */
// class ItemMenu extends React.Component {

//     state = {
//         isFieldEditable: false,
//         valor: ''
//     }


//     componentDidMount() {
//         console.log(this.props.valor)
//         this.setState({ valor: this.props.valor })
//     }

//     render() {
//         return (
//             <TouchableWithoutFeedback
//                 onPress={() => this.setState({ isFieldEditable: !this.state.isFieldEditable })} onBlur={() => this.setState({ isFieldEditable: !this.state.isFieldEditable })}
//                 style={styles.itemContainer}>
//                 <View style={styles.itemContainer}>
//                     <View style={styles.imgContainer}>
//                         {
//                             this.props.title == 'Nome' ? <TabBarIconType3 name="account-edit-outline" color={this.state.isFieldEditable ? colors.Profile.icon : '#CCC'} /> :
//                                 this.props.title == 'Login' ? <TabBarIconType3 name="home-edit-outline" color={this.state.isFieldEditable ? colors.Profile.icon : '#CCC'} /> :
//                                     this.props.title == 'Senha' ? <TabBarIconType3 name="form-textbox-password" color={this.state.isFieldEditable ? colors.Profile.icon : '#CCC'} /> :
//                                         <TabBarIconType2 name="edit" color={colors.Profile.icon} />
//                         }
//                     </View>
//                     <TextInput
//                         style={
//                             this.state.isFieldEditable ?
//                                 [styles.inputs, styles.inputs_name] :
//                                 { width: layouts.window.width * 0.5, color: '#AAA', borderBottomWidth: 1, borderBottomColor: '#555' }
//                         }
//                         onChangeText={value => this.setState({ valor: value })}
//                         editable={this.state.isFieldEditable}
//                         secureTextEntry={this.props.title == 'Senha' ? true : false} value={this.state.valor} placeholder={this.props.title}
//                         onBlur={() => this.setState({ isFieldEditable: !this.state.isFieldEditable })} placeholderTextColor="#555" />
//                 </View>
//             </TouchableWithoutFeedback>
//         )
//     }
// }

function TabBarIconType1(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
    return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconType2(props: { name: React.ComponentProps<typeof AntDesign>['name']; color: string }) {
    return <AntDesign size={28} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconType3(props: { name: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color: string }) {
    return <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconType4(props: { name: React.ComponentProps<typeof Entypo>['name']; color: string }) {
    return <Entypo size={28} style={{ marginBottom: -3 }} {...props} />;
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
        width: '100%',
        alignItems: 'center',
    },
    itemsContainer_box: {
        paddingTop: 40,
        width: '100%',
        alignItems: 'center',
    },
    itemContainer: {
        width: '100%',
        height: 50,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10,
    },
    imgContainer: {
        width: 32,
        height: 32,
        // borderWidth: 1,
        // borderColor: '#FFF',
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    imgUser: {
        width: 140,
        height: 140,
        borderRadius: 140,
        margin: 20,
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
