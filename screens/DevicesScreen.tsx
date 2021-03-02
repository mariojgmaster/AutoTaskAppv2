import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {
    Text,
    View,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import DoGet from "../services/doGet";
import DeviceItem from "../components/DeviceItem";
import { DeviceStyle as styles } from '../components/Styles';
import ShowToast from "../components/ShowToast";
import IsListEmptyMessage from "../components/IsListEmptyMessage";

export default class DevicesScreen extends React.Component {

    state = { UserData: {}, deviceData: [], isLoading: true }

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
        const dataGet = await DoGet('equipamentos')
        dataGet != undefined ? this.setState({ deviceData: dataGet, isLoading: false }) : null
    }

    render() {
        return (
            <SafeAreaProvider>
                <View style={styles.container}>
                    <View style={styles.screenTitleContainer}>
                        <Text style={styles.screenTitle}>EQUIPAMENTOS</Text>
                    </View>
                    <View>
                        { !this.state.isLoading ?
                            <FlatList
                                keyExtractor={(item, index) => index.toString()}
                                data={this.state.deviceData}
                                refreshing={this.state.isLoading}
                                onRefresh={this.getData}
                                renderItem={({ item, index }) => (
                                    ((item.usuarioCadastro.id == this.state.UserData.id ||
                                        this.state.deviceData.length == 0) && item.ativo == true ?
                                        <DeviceItem id={item.id}
                                            idUser={this.state.UserData.id}
                                            name={item.nome}
                                            active={item.ativo}
                                            turnedOn={item.ligado}
                                            idDepartment={item.departamento.id}
                                            path={item.path}
                                            nav={this.props.navigation}
                                            showToast={ShowToast} /> :
                                        (index == this.state.deviceData.length - 1 ? <IsListEmptyMessage valor="Dispositivos" /> : null))
                                )} /> : <ActivityIndicator style={{paddingTop:100}} size='large' color="#FFF" /> }
                    </View>
                </View>
            </SafeAreaProvider>
        )
    }
}
