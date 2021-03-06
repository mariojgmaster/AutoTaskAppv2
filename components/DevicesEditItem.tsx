import * as React from 'react';
import { useState } from 'react';
import { Alert, Switch, Text, View, TextInput, TouchableWithoutFeedback } from 'react-native';
import { DevicesEditStyle as styles } from './Styles';
import DoPut from "../services/doPut";
import ShowToast from './ShowToast';
import DoDelete from '../services/doDelete';
import Icon from "./Icon";
import layouts from '../constants/Layout';

export default function DevicesEditItem({ id, name, active, turnedOn, idUser, idDepartment, path, nav }) {

    const [fieldNameValue, setFieldNameValue] = useState(name)
    const [fieldActiveValue, setFieldActiveValue] = useState(active)
    const [fieldTurnedOnValue, setFieldTurnedOnValue] = useState(turnedOn)

    const saveDeviceChanges = async (id, idUsuario, idDepart) => {
        let payload = {
            Id: id,
            UsuarioCadastro: { id: idUsuario },
            departamento: { id: idDepart },
            Nome: fieldNameValue,
            Ativo: fieldActiveValue,
            ligado: fieldTurnedOnValue
        }
        DoPut(id, 'equipamentos', payload)
        .then(res => {
            ShowToast("Equipamento alterado com sucesso!")
            nav.goBack()
        }).catch(err => ShowToast('Holve um erro ao alterar equipamento.'))
    }

    const deleteDevice = async id => {
        try {
            DoDelete(id, 'equipamentos')
            .then(res => ShowToast("Equipamento excluído com sucesso!"))
            .catch(err => ShowToast('Holve um erro ao deletar equipamento.'))
        } catch (err) { console.log(err) }
    }

    return (
        <View key={id} style={styles.itemsContainer_box}>

            <View style={{ paddingVertical: 10 }}>
                <Text style={{ color: '#EEE', fontSize: 18 }}>{name}</Text>
            </View>

            <View style={styles.itemContainer}>
                <View style={styles.imgContainer}>
                    <Icon type="AntDesign" size={22} name="home" color={'#CCC'} />
                </View>
                <TextInput
                    style={{ width: layouts.window.width * 0.5, color: '#AAA', borderBottomWidth: 1, borderBottomColor: '#555' }}
                    onChangeText={value => setFieldNameValue(value)} placeholder='Departamento'
                    secureTextEntry={false} defaultValue={fieldNameValue} placeholderTextColor="#555" />
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
                        style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                    />
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
                        style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                    />
                </View>
            </View>

            <View style={{ width: '100%', paddingTop: 10, paddingBottom: 5, paddingHorizontal: 20, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                <TouchableWithoutFeedback onPress={() =>
                    Alert.alert(
                        "Deseja salvar as alterações?", '',
                        [
                            { text: "Sim", onPress: () => saveDeviceChanges(id, idUser, idDepartment) },
                            { text: "Não", style: 'cancel', onPress: () => console.log('Cancelar Salvamento de Departamento') }
                        ], { cancelable: true }
                    )}><Text style={{ color: '#EEE', fontSize: 16, marginTop: 5 }}>Salvar</Text>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {
                    Alert.alert(
                        "Deseja excluir sua conta?", '',
                        [
                            { text: "Excluir", onPress: () => deleteDevice(id) },
                            { text: "Cancelar", style: 'cancel', onPress: () => console.log('Cancelar Exclusão de Departamento') }
                        ], { cancelable: true }
                    )
                }}><Text style={{ color: 'rgba(255,0,0,0.8)', fontSize: 16, marginTop: 5 }}>Excluir</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}