import * as React from 'react';
import { useState } from 'react';
import { Alert, Switch, Text, View, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { DevicesEditStyle as styles } from './Styles';
import DoPut from "../services/doPut";
import ShowToast from './ShowToast';
import DoDelete from '../services/doDelete';
import Icon from "./Icon";
import layouts from '../constants/Layout';
import DoPost from '../services/doPost';

export default function DevicesEditItem({ closeModal }) {

    const [fieldNameValue, setFieldNameValue] = useState('')
    const [fieldUserIdValue, setFieldUserIdValue] = useState('')
    const [fieldDepartmentIdValue, setFieldDepartmentIdValue] = useState('')
    const [fieldActiveValue, setFieldActiveValue] = useState(true)
    const [fieldTurnedOnValue, setFieldTurnedOnValue] = useState(true)

    const saveDeviceChanges = async () => {
        let payload = {
            UsuarioCadastro: { id: fieldUserIdValue },
            Departamento: { id: fieldDepartmentIdValue },
            Nome: fieldNameValue,
            Ativo: fieldActiveValue,
            ligado: fieldTurnedOnValue,
            path: '001-07',
        }
        DoPost('equipamentos', payload)
        .then(res => {
            ShowToast("Equipamento alterado com sucesso!")
            closeModal()
        }).catch(err => ShowToast('Holve um erro ao alterar equipamento.'))
    }

    return (
        <>
            <TouchableOpacity
                style={{width:'100%',alignItems:'flex-end',paddingRight:15}}
                onPress={() => closeModal()}>
                <View><Icon type="AntDesign" size={22} name="close" color={'#CCC'} /></View>
            </TouchableOpacity>

            <View style={styles.itemContainer}>
                <View style={styles.imgContainer}>
                    <Icon type="AntDesign" size={22} name="home" color={'#CCC'} />
                </View>
                <TextInput
                    style={{ width: layouts.window.width * 0.5, color: '#AAA', borderBottomWidth: 1, borderBottomColor: '#555' }}
                    onChangeText={value => setFieldNameValue(value)} placeholder='Equipamento'
                    secureTextEntry={false} defaultValue={fieldNameValue} placeholderTextColor="#555" />
            </View>

            <View style={styles.itemContainer}>
                <View style={styles.imgContainer}>
                    <Icon type="AntDesign" size={22} name="home" color={'#CCC'} />
                </View>
                <TextInput
                    style={{ width: layouts.window.width * 0.5, color: '#AAA', borderBottomWidth: 1, borderBottomColor: '#555' }}
                    onChangeText={value => setFieldUserIdValue(value)} placeholder='Id de Usuário'
                    secureTextEntry={false} defaultValue={fieldUserIdValue.toString()} placeholderTextColor="#555" />
            </View>

            <View style={styles.itemContainer}>
                <View style={styles.imgContainer}>
                    <Icon type="AntDesign" size={22} name="home" color={'#CCC'} />
                </View>
                <TextInput
                    style={{ width: layouts.window.width * 0.5, color: '#AAA', borderBottomWidth: 1, borderBottomColor: '#555' }}
                    onChangeText={value => setFieldDepartmentIdValue(value)} placeholder='Id de Departamento'
                    secureTextEntry={false} defaultValue={fieldDepartmentIdValue.toString()} placeholderTextColor="#555" />
            </View>

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 }}>
                <View style={styles.itemContainer}>
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

                <View style={styles.itemContainer}>
                    <View style={styles.imgContainer}>
                        <Icon type="AntDesign" size={22} name="poweroff" color={'#CCC'} />
                    </View>
                    <Switch
                        trackColor={{ false: "#DDD", true: "rgba(0,150,0,0.8)" }}
                        thumbColor="#BBB"
                        onValueChange={() => setFieldTurnedOnValue(!fieldTurnedOnValue)}
                        value={fieldTurnedOnValue}
                        style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }} />
                </View>
            </View>

            <View style={{ width: '100%', paddingTop: 10, paddingBottom: 5, paddingHorizontal: 20, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                <TouchableWithoutFeedback onPress={() =>
                    Alert.alert("Deseja salvar as alterações?", '',
                        [
                            { text: "Sim", onPress: () => saveDeviceChanges() },
                            { text: "Não", style: 'cancel', onPress: () => console.log('Cancelar Salvamento de Equipamento') }
                        ], { cancelable: true }
                    )}><Text style={{ color: '#EEE', fontSize: 16, marginTop: 5 }}>Criar Equipamento</Text>
                </TouchableWithoutFeedback>
            </View>
        </>
    )
}