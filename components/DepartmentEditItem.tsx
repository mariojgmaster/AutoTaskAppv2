import * as React from 'react';
import { useState } from 'react';
import { Switch, Text, View, TouchableWithoutFeedback, TextInput, Alert } from 'react-native';
import { DepartmentEditStyle as styles } from './Styles';
import Icon from "./Icon";
import DoPut from '../services/doPut';
import ShowToast from './ShowToast';
import DoDelete from '../services/doDelete';
import layouts from '../constants/Layout';

export default function DepartmentItem({ id, name, active, idUser, nav, refresh }) {

    const [fieldNameValue, setFieldNameValue] = useState(name)
    const [fieldActiveValue, setFieldActiveValue] = useState(active)

    const saveDepartmentChanges = async (id, idUsuario) => {
        let payload = {
            Id: id,
            UsuarioCadastro: { id: idUsuario },
            Nome: fieldNameValue,
            Ativo: fieldActiveValue
        }
        DoPut(id, 'departamentos', payload)
        .then(res => {
            ShowToast("Departamento criado com sucesso!")
            // nav.goBack()
            refresh()
        })
        .catch(err => ShowToast('Holve um erro ao criar departamento.'))
    }

    const deleteDepartment = async id => {
        try {
            DoDelete(id, 'departamentos')
            .then(res => ShowToast("Departamento excluído com sucesso!"))
            .catch(err => ShowToast('Holve um erro ao deletar usuário.'))
            refresh()
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
                <TextInput style={{ width: layouts.window.width * 0.5, color: '#AAA', borderBottomWidth: 1, borderBottomColor: '#555' }}
                    onChangeText={value => setFieldNameValue(value)} placeholder='Departamento'
                    secureTextEntry={false} defaultValue={fieldNameValue} placeholderTextColor="#555" />
            </View>

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

            <View style={{ width: '100%', paddingTop: 10, paddingBottom: 5, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                <TouchableWithoutFeedback onPress={() =>
                    Alert.alert(
                        "Deseja salvar as alterações?", '',
                        [
                            { text: "Sim", onPress: () => saveDepartmentChanges(id, idUser) },
                            { text: "Não", style: 'cancel', onPress: () => console.log('Cancelar Salvamento de Departamento') }
                        ], { cancelable: true }
                    )}><Text style={{ color: '#EEE', fontSize: 16, marginTop: 5 }}>Salvar</Text>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {
                    Alert.alert(
                        "Deseja excluir sua conta?", '',
                        [
                            { text: "Excluir", onPress: () => deleteDepartment(id) },
                            { text: "Cancelar", style: 'cancel', onPress: () => console.log('Cancelar Exclusão de Departamento') }
                        ], { cancelable: true }
                    )
                }}><Text style={{ color: 'rgba(255,0,0,0.8)', fontSize: 16, marginTop: 5 }}>Excluir</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}