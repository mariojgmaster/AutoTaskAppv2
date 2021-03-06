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
import SensorItem from "../components/SensorItem";
import { SensorStyle as styles } from "../components/Styles";
import IsListEmptyMessage from "../components/IsListEmptyMessage";
import ShowToast from '../components/ShowToast';

export default class DashBoardScreen extends React.Component {

    state = { UserData: {}, DashBoardScreen: [], isLoading: true, sensorsFiltered: [] }

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
        const dataGet = await DoGet('sensores').catch(err => ShowToast('Holve um erro ao carregar sensores.'))
        dataGet != undefined ? this.setState({ DashBoardScreen: dataGet, isLoading: false }) : null
    }

    render() {
        let sensorsFilteredAux = [];
        return (
            <SafeAreaProvider>
                <View style={styles.container}>
                    <View style={styles.screenTitleContainer}>
                        <Text style={styles.screenTitle}>SENSORES</Text>
                    </View>
                    <View style={styles.listContainer}>
                        {
                            !this.state.isLoading ?
                                (this.state.DashBoardScreen.map((item, index) => {
                                    (item.usuarioCadastro.id == this.state.UserData.id || this.state.DashBoardScreen.length == 0) ?
                                        sensorsFilteredAux.push('-') : null
                                }),
                                <FlatList
                                    keyExtractor={(item, index) => index.toString()}
                                    data={this.state.DashBoardScreen}
                                    refreshing={this.state.isLoading}
                                    onRefresh={this.getData}
                                    renderItem={({ item, index }) => (
                                        ((item.usuarioCadastro.id == this.state.UserData.id || this.state.DashBoardScreen.length == 0) ?
                                            <SensorItem id={item.id}
                                                idUser={this.state.UserData.id}
                                                idDepartment=''
                                                name={item.nome}
                                                active={item.ativo}
                                                path={item.path}
                                                nav={this.props.navigation} /> :
                                                (index == sensorsFilteredAux.length && sensorsFilteredAux.length == 0 ? <IsListEmptyMessage valor="Sensores" /> : null))
                                    )} />) : <ActivityIndicator style={{ paddingTop: 100 }} size='large' color="#FFF" />
                        }
                    </View>
                </View>
            </SafeAreaProvider>
        )
    }
}
