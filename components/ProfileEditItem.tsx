import * as React from 'react';
import { useState } from 'react';
import { Switch, Text, View, TouchableWithoutFeedback, TextInput, Alert } from 'react-native';
import { ProfileEditStyle as styles } from './Styles';
import Icon from "../components/Icon";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DoPut from '../services/doPut';
import ShowToast from './ShowToast';
import DoDelete from '../services/doDelete';

export default function ProfileItem({ id, name, login, password, active, userIdSis, isAdmin, isUserSisAdmin, nav }) {

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
        DoPut(id, 'usuarios', payload)
        .then(res => {
            ShowToast("Usuário alterado com sucesso!")
            id == idUser ? userData(payload) : null
            nav.goBack()
        }).catch(err => ShowToast('Holve um erro ao alterar usuário.'))
    }

    const deleteUser = async id => {
        try {
            DoDelete(id, 'usuarios')
            .then(res => ShowToast("Usuário excluído com sucesso!"))
            .catch(err => ShowToast('Holve um erro ao deletar usuário.'))
        } catch (err) { console.log(err) }
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
                            <Icon type="Ionicons" size={20} name="star" color='#AAAAAA55' />
                        </View> : null
                }
                <View style={styles.itemContainer}>
                    <View style={styles.imgContainer}>
                        <Icon type="MaterialCommunityIcons" size={22} name="account-edit-outline" color="#CCC" />
                    </View>
                    <TextInput style={[styles.inputs, styles.inputs_name]}
                        onChangeText={value => setFieldNameValue(value)} placeholder='Nome'
                        secureTextEntry={false} defaultValue={fieldNameValue} placeholderTextColor="#555" />
                </View>

                <View style={styles.itemContainer}>
                    <View style={styles.imgContainer}>
                        <Icon type="Entypo" size={22} name="email" color="#CCC" />
                    </View>
                    <TextInput style={[styles.inputs, styles.inputs_name]}
                        onChangeText={value => setFieldLoginValue(value)} placeholder='Login'
                        secureTextEntry={false} defaultValue={fieldLoginValue} placeholderTextColor="#555" />
                </View>

                <View style={styles.itemContainer}>
                    <View style={styles.imgContainer}>
                        <Icon type="MaterialCommunityIcons" size={22} name="form-textbox-password" color="#CCC" />
                    </View>
                    <TextInput style={[styles.inputs, styles.inputs_name]}
                        onChangeText={value => setFieldPasswordValue(value)} placeholder='Senha'
                        secureTextEntry={true} defaultValue={fieldPasswordValue} placeholderTextColor="#555" />
                </View>
                {
                    !isUserSisAdmin ? null:
                        <View style={[styles.itemContainer, {justifyContent:'center'}]}>
                            <View style={styles.imgContainer}>
                                <Icon type="MaterialIcons" size={26} name="online-prediction" color={'#CCC'} />
                            </View>
                            <Switch
                                trackColor={{ false: "#DDD", true: "rgba(0,150,0,0.8)" }}
                                thumbColor="#BBB"
                                onValueChange={() => setFieldActiveValue(!fieldActiveValue)}
                                value={fieldActiveValue}
                                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }} />
                        </View>
                }
            </View>

            <View style={styles.ctrlBtns}>
                <TouchableWithoutFeedback onPress={() =>
                    Alert.alert(
                        "Deseja salvar as alterações?", '',
                        [
                            { text: "Sim", onPress: () => saveUserChanges(id, userIdSis, isAdmin) },
                            { text: "Não", style: 'cancel', onPress: () => console.log('Cancelar Salvamento de Departamento') }
                        ], { cancelable: true }
                    )}><Text style={{ color: '#EEE', fontSize: 16, marginTop: 5 }}>Salvar</Text>
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
                        }}><Text style={{ color: 'rgba(255,0,0,0.8)', fontSize: 16, marginTop: 5 }}>Excluir</Text>
                        </TouchableWithoutFeedback>
                }
            </View>
        </View>
    )
}