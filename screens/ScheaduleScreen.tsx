import { Ionicons, AntDesign, MaterialCommunityIcons, Entypo, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
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

const PickerDateTime = (props) => {
    const [fieldNameValue, setFieldNameValue] = useState(props.titleSch);
    const [date, setDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState(props.dateOrTimeMode == 'time' ? 'Hora' : 'Data');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        if (selectedDate == undefined) { setShow(false); return; }
        let currentDate = selectedDate || date;
        // setFieldNameValue(props.titleSch)
        setShow(false);
        setDate(currentDate);


        if (props.dateOrTimeMode == 'time') {
            let auxHora, auxMinuto
            let hora, minuto
            auxHora = currentDate.getHours()
            auxMinuto = currentDate.getMinutes()
            auxHora < 10 ? hora = `0${auxHora}` : hora = auxHora
            auxMinuto < 10 ? minuto = `0${auxMinuto}` : minuto = auxMinuto
            setFormattedDate(`${hora} : ${minuto}`);
        } else {
            let auxDia, auxMes
            let dia, mes, ano
            auxDia = currentDate.getDate()
            auxMes = currentDate.getMonth() + 1
            auxDia < 10 ? dia = `0${auxDia}` : dia = auxDia
            auxMes < 10 ? mes = `0${auxMes}` : mes = auxMes
            ano = currentDate.getYear() + 1900
            setFormattedDate(`${dia} / ${mes} / ${ano}`);
        }

        console.log('date')
        console.log(date)
        // Usar para trazer a data e a hora (1º Forma)
        console.log('selectedDate')
        console.log(selectedDate)

        // Usar para trazer a data e a hora (2º Forma)
        // console.log(event.nativeEvent.timestamp)
        // var a = new Date(event.nativeEvent.timestamp);
        // var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        // var year = a.getFullYear();
        // var month = months[a.getMonth()];
        // var date = a.getDate();
        // var hour = a.getHours();
        // var min = a.getMinutes();
        // var sec = a.getSeconds();
        // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        // console.log(time)
    };

    return (
        <View>
            <View>
                {
                    props.dateOrTimeMode == 'time' ?
                        <TouchableWithoutFeedback onPress={() => setShow(true)}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, paddingBottom: 10 }}>
                                <AntDesign name="clockcircleo" size={28} color='#CCC' />
                                <Text style={{ width: layouts.window.width * 0.45, fontSize: 20, color: '#AAA', borderBottomWidth: 1, borderBottomColor: '#555', marginLeft: 15, textAlign: 'center' }}>
                                    {formattedDate}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback> :
                        <TouchableWithoutFeedback onPress={() => setShow(true)}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                <MaterialIcons name="date-range" size={32} color='#CCC' />
                                <Text style={{ width: layouts.window.width * 0.45, fontSize: 20, color: '#AAA', borderBottomWidth: 1, borderBottomColor: '#555', marginLeft: 15, textAlign: 'center' }}>
                                    {formattedDate}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                }
            </View>
            {show && (
                <DateTimePicker
                    timeZoneOffsetInSeconds={10800}
                    value={date}
                    mode={props.dateOrTimeMode}
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

        await axios.get(`${Api.EndPoint.URL}/agendamentos`)
            .then(res => {
                console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
                console.log(res.data)
                console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
                this.setState({ scheaduleData: res.data })
            })
            .then(res => this.setState({ isLoading: false }))
            .catch(err => console.error(`Erro no Get de departamentos: ${err}`))
    }

    render() {
        function IsListEmptyMessage(props) {
            return (
                <View style={styles.itemsContainer_box}>
                    <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
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
                            <ToScheadule nav={this.props.navigation} />
                        </View>
                        <View style={{ flex: 3, borderTopWidth: 1, marginTop: 70, borderTopColor: '#55555555' }}>
                            {
                                !this.state.isLoading ?
                                    <FlatList
                                        keyExtractor={(item, index) => index.toString()}
                                        data={this.state.scheaduleData}
                                        renderItem={({ item, index }) => (
                                            // (item.usuarioCadastro.id == this.state.UserData.id ||
                                            //     this.state.UserData.administrador == true ||
                                            //     this.state.deviceData.length == 0 ?
                                                <Item id={item.id}
                                                    // idUser={this.state.UserData.id}
                                                    name={item.nome}
                                                    rules={item.regras}
                                                    // active={item.ativo}
                                                    // turnedOn={item.ligado}
                                                    // idDepartment={item.departamento.id}
                                                    // path={item.path}
                                                    nav={this.props.navigation} />
                                                //     :
                                                // (index == this.state.deviceData.length - 1 ? <IsListEmptyMessage valor="Dispositivos" /> : null))
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

function ToScheadule({ name, nav }) {
    const [fieldNameValue, setFieldNameValue] = useState(name)
    return (
        <View style={styles.itemsContainer_box}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 20, borderBottomWidth: 2, borderBottomColor: '#55555555', marginBottom: 20, paddingVertical: 10, marginTop: 20 }}>
                <Entypo name="text" size={28} color='#CCC' />
                <TextInput
                    style={{ width: layouts.window.width * 0.5, marginLeft: 20, paddingVertical: 10, marginBottom: 15, color: '#AAA', borderBottomWidth: 1, borderBottomColor: '#555', fontSize: 18 }}
                    onChangeText={value => setFieldNameValue(value)} placeholder='Título'
                    secureTextEntry={false} defaultValue={fieldNameValue} placeholderTextColor="#555" />
            </View>
            <View style={{flexDirection:'row', marginBottom: 30}}>
                <View style={{ flex:7, alignItems: 'flex-start', justifyContent: 'space-around', paddingLeft:20}}>
                    <PickerDateTime nav={nav} dateOrTimeMode="time" titleSch={fieldNameValue}/>
                    <PickerDateTime nav={nav} dateOrTimeMode="date" titleSch={fieldNameValue}/>
                </View>
                <TouchableOpacity style={{flex:1, justifyContent:'center', paddingRight:10}} onPress={() => alert()}>
                        <FontAwesome5 name="save" size={28} color='#00990055' />
                </TouchableOpacity>
            </View>
        </View>
    )
}
function Item({ id, name, active, turnedOn, idUser, idDepartment, path, rules, nav }) {
    return (
        <View style={[styles.itemsContainer_box, {marginTop:20}]}>

            <View style={{ paddingVertical: 10 }}>
                <Text style={{ color: '#EEE', fontSize: 18 }}>{name}</Text>
                <Text style={{ color: '#EEE', fontSize: 14 }}>{rules}</Text>
            </View>

            {/* <View style={styles.itemContainer}>
                <View style={styles.imgContainer}>
                    <TabBarIconType2 name="home" color={'#CCC'} />
                </View>
                <TextInput
                    style={{ width: layouts.window.width * 0.5, color: '#AAA', borderBottomWidth: 1, borderBottomColor: '#555' }}
                    onChangeText={value => setFieldNameValue(value)} placeholder='Departamento'
                    secureTextEntry={false} defaultValue={fieldNameValue} placeholderTextColor="#555" />
            </View>

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 }}>
                <View style={styles.itemContainer}>
                    <View style={styles.imgContainer}>
                        <TabBarIconType5 name="online-prediction" color={'#CCC'} />
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
                        <TabBarIconType2 name="poweroff" color={'#CCC'} />
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
                            { text: "Sim", onPress: () => saveDeviceChanges(id, idUser, idDepartment, path) },
                            { text: "Não", style: 'cancel', onPress: () => console.log('Cancelar Salvamento de Departamento') }
                        ], { cancelable: true }
                    )}>
                    <Text style={{ color: '#EEE', fontSize: 16, marginTop: 5 }}>Salvar</Text>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {
                    Alert.alert(
                        "Deseja excluir sua conta?", '',
                        [
                            { text: "Excluir", onPress: () => deleteDevice(id) },
                            { text: "Cancelar", style: 'cancel', onPress: () => console.log('Cancelar Exclusão de Departamento') }
                        ], { cancelable: true }
                    )
                }}>
                    <Text style={{ color: 'rgba(255,0,0,0.8)', fontSize: 16, marginTop: 5 }}>Excluir</Text>
                </TouchableWithoutFeedback>
            </View> */}
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
        width: 32,
        height: 32,
        borderRadius: 32,
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
