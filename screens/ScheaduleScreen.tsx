import { Ionicons, AntDesign, MaterialCommunityIcons, Entypo, MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
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
    Button,
    FlatList,
    ScrollView,
    ActivityIndicator,
    ToastAndroid,
    Platform
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import axios from 'axios';
import Api from '../services/api'

import layouts from '../constants/Layout';
import images from '../constants/images';
import colors from '../constants/Colors';
import { useLinkProps } from '@react-navigation/native';

const saveSchedule = async (idUsuario, idEquipamento, nome, ativo, regras) => {
    if ((nome != undefined && ativo != undefined && regras != undefined) && (nome != '' && ativo != '' && regras != '')) {
        let payload = {
            UsuarioCadastro: { Id: idUsuario },
            Equipamento: { Id: idEquipamento },
            Nome: nome,
            Ativo: ativo,
            Regras: regras
        }
        console.log('payload');
        console.log(payload);
        console.log('---');
        let res = await axios.post(`${Api.EndPoint.URL}/agendamentos`, payload);
        let data = res.data;
        console.log(data);
    
        showToast("Agendamento criado com sucesso!")
    } else {
        showToast("Preencha os campos corretamente!")
    }
}

const formataDataHora = (valorDateTime, type) => {
    let retorno = ''
    if (type == 'time') {
        let auxHora, auxMinuto
        let hora, minuto
        auxHora = valorDateTime.getHours()
        auxMinuto = valorDateTime.getMinutes()
        auxHora < 10 ? hora = `0${auxHora}` : hora = auxHora
        auxMinuto < 10 ? minuto = `0${auxMinuto}` : minuto = auxMinuto
        retorno = `${hora} : ${minuto}`
    } else {
        let auxDia, auxMes
        let dia, mes, ano
        auxDia = valorDateTime.getDate()
        auxMes = valorDateTime.getMonth() + 1
        auxDia < 10 ? dia = `0${auxDia}` : dia = auxDia
        auxMes < 10 ? mes = `0${auxMes}` : mes = auxMes
        ano = valorDateTime.getYear() + 1900
        retorno = `${dia} / ${mes} / ${ano}`
    }
    return retorno
}

const PickerDateTime = (props) => {
    // const [fieldNameValue, setFieldNameValue] = useState(props.titleSch);
    const [fieldNameValue, setFieldNameValue] = useState('')
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [formattedTime, setFormattedTime] = useState(formataDataHora(date,'time'));
    const [formattedDate, setFormattedDate] = useState(formataDataHora(date,'date'));
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        console.log(event.type)
        if (selectedDate == undefined) { setShow(false); return; }
        let currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);

        mode == 'time' ?
            setFormattedTime(formataDataHora(currentDate, mode)):
            setFormattedDate(formataDataHora(currentDate, mode))

        console.log('date')
        console.log(date)
    };


    return (
        <View>
            <View>
                <View style={styles.itemsContainer_box}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 20, borderBottomWidth: 2, borderBottomColor: '#55555555', marginBottom: 15, marginTop: 5 }}>
                        <Entypo name="text" size={28} color='#CCC' />
                        <TextInput
                            style={{ width: layouts.window.width * 0.55, marginLeft: 20, paddingVertical: 10, marginBottom: 20, color: '#AAA', borderBottomWidth: 1, borderBottomColor: '#555', fontSize: 18 }}
                            onChangeText={value => setFieldNameValue(value)} placeholder='Título'
                            secureTextEntry={false} defaultValue={fieldNameValue} placeholderTextColor="#555" />
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <View style={{ flex: 7, alignItems: 'flex-start', justifyContent: 'space-around', paddingLeft: 20 }}>

                            <TouchableWithoutFeedback onPress={() => (setShow(true), setMode('time'))}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, paddingBottom: 10 }}>
                                    <AntDesign name="clockcircleo" size={28} color='#CCC' />
                                    <Text style={{ width: layouts.window.width * 0.45, fontSize: 20, color: '#AAA', borderBottomWidth: 1, borderBottomColor: '#555', marginLeft: 15, textAlign: 'center' }}>
                                        {formattedTime}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => (setShow(true), setMode('date'))}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                    <MaterialIcons name="date-range" size={32} color='#CCC' />
                                    <Text style={{ width: layouts.window.width * 0.45, fontSize: 20, color: '#AAA', borderBottomWidth: 1, borderBottomColor: '#555', marginLeft: 15, textAlign: 'center' }}>
                                        {formattedDate}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>

                            {/* <PickerDateTime nav={nav} dateOrTimeMode="time" titleSch={fieldNameValue}/>
                            <PickerDateTime nav={nav} dateOrTimeMode="date" titleSch={fieldNameValue}/> */}
                        </View>
                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: 'center', paddingRight:15, paddingTop:20 }}
                            onPress={() => {
                                saveSchedule(props.idUsuario, props.idEquipamento[0], fieldNameValue, true, date)
                                setTimeout(() => {
                                    setFieldNameValue('')
                                    setFormattedTime(formataDataHora(new Date(),'time'))
                                    setFormattedDate(formataDataHora(new Date(),'date'))
                                }, 500);
                            }}>
                            <FontAwesome5 name="check" size={36} color='#00990088' />
                        </TouchableOpacity>
                    </View>
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
                    onChange={onChange}
                />
            )}
        </View>
    );
};

export default class ScheaduleScreen extends React.Component {

    state = {
        UserData: {},
        scheaduleData: [],
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

        // await axios.get(`${Api.EndPoint.URL}/agendamentos`)
        //     .then(res => {
        //         console.log(res.data)
        //         this.setState({ scheaduleData: res.data })
        //     })
        //     .then(res => this.setState({ isLoading: false }))
        //     .catch(err => console.error(`Erro no Get de departamentos: ${err}`))
        this.getData()
    }

    getData = async () => {
        await axios.get(`${Api.EndPoint.URL}/agendamentos`)
            .then(res => {
                console.log(res.data)
                this.setState({ scheaduleData: res.data })
            })
            .then(res => this.setState({ isLoading: false }))
            .catch(err => console.error(`Erro no Get de departamentos: ${err}`))
    }

    render() {
        function IsListEmptyMessage(props) {
            return (
                <View style={styles.itemsContainer_box}>
                    <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center', marginTop:10 }}>
                        <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18, textAlign: 'center' }}>Não há {props.valor} a serem exibidos.</Text>
                    </View>
                </View>
            )
        }
        return (
            <SafeAreaProvider>
                <View style={styles.container}>
                    <View style={{ width: '100%', paddingBottom: 20 }}>
                        <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 20, fontWeight: 'bold' }}>AGENDAMENTOS</Text>
                    </View>
                    <View style={styles.listContainer}>
                        <View style={{ flex: 1, paddingHorizontal: 20 }}>
                            <PickerDateTime
                                nav={this.props.navigation}
                                idUsuario={this.state.UserData.id}
                                idEquipamento={[4,5]}
                            />
                        </View>
                        <View style={{ flex: 3, borderTopWidth: 1, marginTop: 80, borderTopColor: '#55555555', marginBottom:50 }}>
                            {
                                !this.state.isLoading ?
                                    <FlatList
                                        keyExtractor={(item, index) => index.toString()}
                                        data={this.state.scheaduleData}
                                        refreshing={this.state.isLoading}
                                        onRefresh={this.getData}
                                        renderItem={({ item, index }) => (
                                            (item.usuarioCadastro.id == this.state.UserData.id ||
                                                this.state.scheaduleData.length == 0 ?
                                            <Item id={item.id}
                                                idUser={this.state.UserData.id}
                                                name={item.nome}
                                                rules={item.regras}
                                                active={item.ativo}
                                                deviceId={item.equipamento.id}
                                                // turnedOn={item.ligado}
                                                // idDepartment={item.departamento.id}
                                                path={item.path}
                                                nav={this.props.navigation} />
                                                :
                                            (index == this.state.scheaduleData.length - 1 ? <IsListEmptyMessage valor="Agendamentos" /> : null))
                                        )} /> : <ActivityIndicator style={{ paddingTop: 100 }} size='large' color="#FFF" />
                            }
                        </View>
                    </View>
                </View>
            </SafeAreaProvider>
        );
    }
}

const showToast = text => {
    ToastAndroid.showWithGravity(
        text,
        ToastAndroid.LONG,
        ToastAndroid.CENTER
    )
}

function Item({ id, name, active, turnedOn, idUser, idDepartment, deviceId, path, rules, nav }) {

    const [fieldActiveValue, setFieldActiveValue] = useState(active)

    const saveScheaduleChanges = async (id, name, userId, equipamentoId, isActive, regras) => {
        let payload = {
            id: id,
            usuarioCadastro: { id: userId },
            equipamento: { id: equipamentoId },
            nome: name,
            ativo: isActive,
            regras: regras
        }
        console.log('payload');
        console.log(payload);
        console.log('---');
        let res = await axios.put(`${Api.EndPoint.URL}/agendamentos/${id}`, payload);
        let data = res.data;
        console.log(data);

        showToast("Agendamento " + (isActive ? 'Ligado' : 'Desligado'))
    }

    const deleteScheadule = async id => {
        let res = await axios.delete(`${Api.EndPoint.URL}/agendamentos/${id}`);
        let data = res.data;
        console.log(data);
        showToast("Agendamento excluído com sucesso!")
    }

    return (
        <View style={[styles.itemsContainer_box, { marginTop: 10, marginBottom: 10 }]}>

            <View style={{ paddingTop: 10, width:'100%', alignItems: 'center', justifyContent: 'center', }}>
                <View style={{flexDirection:'row', paddingHorizontal: 15, paddingVertical: 10,}}>
                    <View style={[styles.imgContainer, {flex:1, alignItems: 'center', justifyContent: 'center',}]}>
                        <FontAwesome size={36} name="calendar" color={'#CCC'} />
                    </View>
                    <View style={{flex:8, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{ color: '#EEE', fontSize: 22, textAlign:'center' }}>{name}</Text>
                        <View style={{flexDirection: 'row', paddingTop:10}}>
                            <Text style={{ color: '#DDD', fontSize: 16, textDecorationLine:'underline' }}>{formataDataHora(new Date(rules), 'date')}</Text>
                            <Text style={{ color: '#EEE', fontSize: 14, marginHorizontal: 10, }}>às</Text>
                            <Text style={{ color: '#DDD', fontSize: 16, textDecorationLine:'underline' }}>{formataDataHora(new Date(rules), 'time')}</Text>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-around', paddingTop:15, width:'70%', borderTopWidth:1, borderTopColor:'#55555588', marginTop:15}}>
                    <Switch
                        trackColor={{ false: "#DDD", true: "rgba(0,150,0,0.8)" }}
                        thumbColor="#BBB"
                        onValueChange={() => {
                            setFieldActiveValue(!fieldActiveValue)
                            saveScheaduleChanges(id, name, idUser, deviceId, !fieldActiveValue, rules)
                        }}
                        value={fieldActiveValue}
                        style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                    />
                    <TouchableWithoutFeedback onPress={() => deleteScheadule(id)}>
                        <FontAwesome size={28} name="times" color={'#990000AA'} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    )
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
        paddingHorizontal: 20,
        paddingTop: 30,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: colors.DrawerContent.background,
    },
    itemsContainer_img: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    listContainer: {
        flex: 1,
        width: layouts.window.width,
        paddingHorizontal: layouts.window.width * 0.05
    },
    itemsContainer_box: {
        // marginTop: 15,
        // marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: layouts.window.width * 0.03,
    },
    itemContainer: {
        width: '100%',
        height: 50,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgContainer: {
        width: 40,
        height: 40,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    imgUser: {
        width: 140,
        height: 140,
        margin: 20,
        borderRadius: 140,
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
