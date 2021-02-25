import { Ionicons, AntDesign, MaterialCommunityIcons, Entypo, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    FlatList,
    ScrollView,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import axios from 'axios';
import Api from '../services/api'

import layouts from '../constants/Layout';
import images from '../constants/images';
import colors from '../constants/Colors';

export default class DashBoardScreen extends React.Component {

    state = {
        UserData: {},
        DashBoardScreen: [],
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

        this.getData()
    }

    getData = async () => {
        await axios.get(`${Api.EndPoint.URL}/sensores`)
            .then(res => {
                console.log(res.data)
                this.setState({ DashBoardScreen: res.data })
            })
            .then(res => this.setState({ isLoading: false }))
            .catch(err => console.error(`Erro no Get de sensores: ${err}`))
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
                        <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 20, fontWeight: 'bold' }}>SENSORES</Text>
                    </View>
                    <View style={[styles.listContainer, {marginBottom:40, paddingBottom:40}]}>
                        {
                            !this.state.isLoading ?
                                <FlatList
                                    keyExtractor={(item, index) => index.toString()}
                                    data={this.state.DashBoardScreen}
                                    refreshing={this.state.isLoading}
                                    onRefresh={this.getData}
                                    renderItem={({ item, index }) => (
                                        ((item.usuarioCadastro.id == this.state.UserData.id || this.state.DashBoardScreen.length == 0) ?
                                            <Item id={item.id}
                                                idUser={this.state.UserData.id}
                                                name={item.nome}
                                                active={item.ativo}
                                                path={item.path}
                                                nav={this.props.navigation} /> :
                                            (index == this.state.DashBoardScreen.length - 1 ? <IsListEmptyMessage valor="Dispositivos" /> : null))
                                    )} /> : <ActivityIndicator style={{ paddingTop: 100 }} size='large' color="#FFF" />
                        }
                    </View>
                </View>
            </SafeAreaProvider>
        )
    }
}

const showToast = text => {
    ToastAndroid.showWithGravity(
        text,
        ToastAndroid.LONG,
        ToastAndroid.CENTER
    )
}

function Item({ id, name, active, idUser, idDepartment, path, nav }) {

    const arrTestesUnidMeds = ['%', 'lux', 'ºC', 'dB', 'cm']

    return (

        <View style={styles.itemsContainer_box}>
            <View style={{ width: '100%', alignItems: 'stretch', paddingHorizontal:15 }}>
                <View style={{ alignItems: 'flex-end' }}>
                    <View style={[{padding: 10, borderRadius:10}, active ? {backgroundColor:'#00FF0088'} : {backgroundColor:'#EEEEEE88'}]}></View>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center', paddingRight: 10, paddingVertical:10}}>
                    <Text style={{ color: '#EEE', fontSize:22, textAlign:'center' }}>{name}</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                    <View style={[styles.itemsContainer_img, {flex:3}]}>
                        {/* <Image style={styles.imgUser} source={images.Device.deviceUri} /> */}
                        <AntDesign name="wifi" size={40} color='#EEEEEE44' />
                    </View>
                    <View style={{flex:7, flexDirection:'row', alignItems:'flex-end', justifyContent:'center', paddingBottom:15}}>
                        <Text style={{fontSize:60, color:'#CCCCCC77'}}>{Math.round(Math.random()*30+10)}</Text>
                        <Text style={{fontSize:24, color:'#CCCCCC77', fontWeight:'bold'}}>{arrTestesUnidMeds[Math.round(Math.random()*4)]}</Text>
                    </View>
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
        padding: 20,
        paddingTop: 40,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: colors.DrawerContent.background,
        marginBottom:40,
    },
    itemsContainer_img: {
        alignItems: 'center',
    },
    itemsContainer_box: {
        marginTop: 5,
        marginBottom: 20,
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: layouts.window.width * 0.03,
    },
    itemContainer: {
        // width: '100%',
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
        width: 40,
        height: 40,
        // margin: 20,
        borderRadius: 40,
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
