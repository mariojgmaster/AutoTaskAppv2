import * as React from 'react';
import { useState } from 'react';
import { Switch, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import images from '../constants/images';
import { DeviceStyle as styles } from './Styles';
import DoPost from "../services/doPost";

export default function DeviceItem({ id, name, active, turnedOn, idUser, idDepartment, path, nav, showToast }) {
    const [fieldTurnedOnValue, setFieldTurnedOnValue] = useState(turnedOn)
    const saveDeviceChanges = async (id, isTurnedOn) => {
        let payload = {
            EquipamentoId: id,
            Ligado: isTurnedOn
        }
        DoPost('equipamentos/comando', payload).catch(err => showToast('Holve um erro ao alterar equipamento.'))
        showToast("Equipamento " + (isTurnedOn ? 'Ligado' : 'Desligado'))
    }

    return (
        <View style={styles.itemsContainer_box}>
            <View style={styles.items_box}>
                <View style={[styles.itemsContainer_img, { flex: 1 }]}>
                    <Image style={styles.imgUser} source={images.Device.deviceUri} />
                </View>

                <View style={styles.nameContainer}>
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
}
