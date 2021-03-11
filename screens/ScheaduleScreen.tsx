import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import DoGet from "../services/doGet";
import { ScheaduleStyle as styles } from '../components/Styles';
import ScheaduleItem from '../components/ScheaduleItem';
import PickerDateTime from '../components/PickerDateTime';
import IsListEmptyMessage from "../components/IsListEmptyMessage";
import ShowToast from '../components/ShowToast';

export default class ScheaduleScreen extends React.Component {

    state = { UserData: {}, scheaduleData: [], isLoading: true }

    async componentDidMount() {
        try {
            const UserData = await AsyncStorage.getItem('@UserData')
            if (UserData !== null) { this.setState({ UserData: JSON.parse(UserData) }) }
        } catch (e) { console.log('Error "@UserEmail": ' + e) }
        this.getData()
    }

    getData = async () => {
        const dataGet = await DoGet('agendamentos').catch(err => ShowToast('Holve um erro ao carregar agendamentos.'))
        dataGet != undefined ? this.setState({ scheaduleData: dataGet, isLoading: false }) : null
    }

    render() {
        let scheadulesFilteredAux = [];
        return (
            <SafeAreaProvider>
                <View style={styles.container}>
                    <View style={styles.screenTitleContainer}>
                        <Text style={styles.screenTitle}>AGENDAMENTOS</Text>
                    </View>
                    <View style={styles.listContainer}>
                        <View style={{ flex: 1, paddingHorizontal: 20 }}>
                            <PickerDateTime nav={this.props.navigation} idUsuario={this.state.UserData.id} idEquipamento={[4, 5]} />
                        </View>
                        <View style={{ flex: 3, borderTopWidth: 1, marginTop: 80, borderTopColor: '#55555555', marginBottom: 50, marginHorizontal: 10, paddingTop: 5, }}>
                            {
                                !this.state.isLoading ?
                                    (this.state.scheaduleData.map((item, index) => {
                                        (item.usuarioCadastro.id == this.state.UserData.id || this.state.scheaduleData.length == 0) ?
                                            scheadulesFilteredAux.push('-') : null
                                    }),
                                        <FlatList
                                            keyExtractor={(item, index) => index.toString()}
                                            data={this.state.scheaduleData}
                                            refreshing={this.state.isLoading}
                                            onRefresh={this.getData}
                                            renderItem={({ item, index }) => (
                                                (item.usuarioCadastro.id == this.state.UserData.id || this.state.scheaduleData.length == 0 ?
                                                    <ScheaduleItem id={item.id}
                                                        idUser={this.state.UserData.id}
                                                        name={item.nome}
                                                        rules={item.regras}
                                                        active={item.ativo}
                                                        deviceId={item.equipamento.id}
                                                        turnedOn={item.ligado}
                                                        path={item.path}
                                                        nav={this.props.navigation} /> :
                                                    (index == scheadulesFilteredAux.length && scheadulesFilteredAux.length == 0 ? <IsListEmptyMessage valor="Agendamentos" /> : null))
                                            )} />) : <ActivityIndicator style={{ paddingTop: 100 }} size='large' color="#FFF" />
                            }
                        </View>
                    </View>
                </View>
            </SafeAreaProvider>
        );
    }
}
