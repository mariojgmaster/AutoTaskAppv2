
import DateTimePicker from '@react-native-community/datetimepicker';
import * as React from 'react';
import { useState } from 'react';
import { Text, TouchableOpacity, View, TouchableWithoutFeedback, TextInput } from 'react-native';
import { ScheaduleStyle as styles } from './Styles';
import FormataDataHora from "./FormataDataHora";
import Icon from "./Icon";
import ShowToast from "./ShowToast";
import DoPost from "../services/doPost";

const saveSchedule = async (idUsuario, idEquipamento, nome, ativo, regras) => {
    if ((nome != undefined && ativo != undefined && regras != undefined) && (nome != '' && ativo != '' && regras != '')) {
        let payload = {
            UsuarioCadastro: { Id: idUsuario },
            Equipamento: { Id: idEquipamento },
            Nome: nome,
            Ativo: ativo,
            Regras: regras
        }
        DoPost('agendamentos', payload)
        ShowToast("Agendamento criado com sucesso!")
    } else { ShowToast("Preencha os campos corretamente!") }
}

const PickerDateTime = (props) => {
    const [fieldNameValue, setFieldNameValue] = useState('')
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [formattedTime, setFormattedTime] = useState(FormataDataHora(date, 'time'));
    const [formattedDate, setFormattedDate] = useState(FormataDataHora(date, 'date'));
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        console.log(event.type)
        if (selectedDate == undefined) { setShow(false); return; }
        let currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        mode == 'time' ? setFormattedTime(FormataDataHora(currentDate, mode)) : setFormattedDate(FormataDataHora(currentDate, mode))
        console.log(date)
    };

    return (
        <View>
            <View style={styles.itemsContainer_box}>
                <View style={styles.itemContainer}>
                    <Icon type="Entypo" name="text" size={28} color='#CCC' />
                    <TextInput style={styles.itemTextInput}
                        onChangeText={value => setFieldNameValue(value)} placeholder='Título'
                        secureTextEntry={false} defaultValue={fieldNameValue} placeholderTextColor="#555" />
                </View>
                <View style={styles.dateTimeContainer}>
                    <View style={styles.dateTime}>
                        <TouchableWithoutFeedback onPress={() => (setShow(true), setMode('time'))}>
                            <View style={styles.timeContainer}>
                                <Icon type='AntDesign' name="clockcircleo" size={28} color='#CCC' />
                                <Text style={styles.dateTimeText}>
                                    {formattedTime}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => (setShow(true), setMode('date'))}>
                            <View style={styles.dateContainer}>
                                <Icon type='MaterialIcons' name="date-range" size={32} color='#CCCCCC' />
                                <Text style={styles.dateTimeText}>
                                    {formattedDate}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <TouchableOpacity style={styles.saveSchBtn}
                        onPress={() => {
                            saveSchedule(props.idUsuario, props.idEquipamento[0], fieldNameValue, true, date)
                            setTimeout(() => {
                                setFieldNameValue('')
                                setFormattedTime(FormataDataHora(new Date(), 'time'))
                                setFormattedDate(FormataDataHora(new Date(), 'date'))
                            }, 500); }}>
                        <Icon type='FontAwesome5' name="check" size={36} color='#00990088' />
                    </TouchableOpacity>
                </View>
            </View>
            {show && (
                <DateTimePicker
                    timeZoneOffsetInSeconds={10800}
                    value={date}
                    mode={mode}
                    display='default'
                    is24Hour={true}
                    minimumDate={new Date()}
                    onChange={onChange} />
            )}
        </View>
    );
}

export default PickerDateTime
