import * as React from 'react';
import { useState } from 'react';
import { Switch, Text, View, TouchableWithoutFeedback } from 'react-native';
import { ScheaduleStyle as styles } from './Styles';
import DoPut from "../services/doPut";
import FormataDataHora from "./FormataDataHora";
import ShowToast from "./ShowToast";
import Icon from "./Icon";

export default function Item({ id, name, active, turnedOn, idUser, deviceId, path, rules, nav }) {

    const [fieldActiveValue, setFieldActiveValue] = useState(active)
    const [isTurnedOnValue, setIsTurnedOnValue] = useState(turnedOn)

    const saveScheaduleChanges = async (id, name, userId, equipamentoId, isActive, isTurnedOn, regras) => {
        let payload = {
            id: id,
            usuarioCadastro: { id: userId },
            equipamento: { id: equipamentoId },
            nome: name,
            ativo: isActive,
            ligar: isTurnedOn,
            regras: regras
        }
        DoPut(id, 'agendamentos', payload)
        ShowToast(`Agendamento ${(isTurnedOn ? 'Ligado' : 'Desligado')} e ${(isActive ? 'Ativo' : 'Inativo')}`)
    }

    const deleteScheadule = async id => {
        try {
            let res = await axios.delete(`${Api.EndPoint.URL}/agendamentos/${id}`);
            let data = res.data;
            console.log(data);
            ShowToast("Agendamento excluído com sucesso!")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={[styles.itemsContainer_box, { marginVertical: 10, paddingTop: 20 }]}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10, }}>
                <View style={[styles.imgContainer, { flex: 1, alignItems: 'flex-end', justifyContent: 'center', }]}>
                    <Icon type='FontAwesome' size={36} name="calendar" color={'#CCC'} />
                </View>
                <View style={{ flex: 6, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#EEE', fontSize: 22, textAlign: 'center' }}>{name}</Text>
                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                        <Text style={{ color: '#DDD', fontSize: 14, textDecorationLine: 'underline' }}>{FormataDataHora(new Date(rules), 'date')}</Text>
                        <Text style={{ color: '#EEE', fontSize: 14, marginHorizontal: 10, }}>às</Text>
                        <Text style={{ color: '#DDD', fontSize: 14, textDecorationLine: 'underline' }}>{FormataDataHora(new Date(rules), 'time')}</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingTop: 15, width: '60%', borderTopWidth: 1, borderTopColor: '#55555588', marginTop: 15 }}>
                <View style={styles.switchsContainer}>
                    <View style={styles.switchContainer}>
                        <Icon type="AntDesign" name="poweroff" size={20} color={'#CCC'} />
                        <Switch
                            trackColor={{ false: "#DDD", true: "rgba(0,150,0,0.8)" }}
                            thumbColor="#BBB"
                            onValueChange={() => {
                                setIsTurnedOnValue(!isTurnedOnValue)
                                saveScheaduleChanges(id, name, idUser, deviceId, fieldActiveValue, !isTurnedOnValue, rules)
                            }}
                            value={isTurnedOnValue}
                            style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                        />
                    </View>
                    <View style={styles.switchContainer}>
                        <Icon type="MaterialIcons" name="online-prediction" size={24} color={'#CCC'} />
                        <Switch
                            trackColor={{ false: "#DDD", true: "rgba(0,150,0,0.8)" }}
                            thumbColor="#BBB"
                            onValueChange={() => {
                                setFieldActiveValue(!fieldActiveValue)
                                fieldActiveValue==false ? isTurnedOnValue : setIsTurnedOnValue(false)
                                saveScheaduleChanges(id, name, idUser, deviceId, !fieldActiveValue, (fieldActiveValue==false ? isTurnedOnValue : false), rules)
                            }}
                            value={fieldActiveValue}
                            style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                        />
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => deleteScheadule(id)}>
                    <Icon type='FontAwesome' size={32} name="times" color={'#990000AA'} />
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}
