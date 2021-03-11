import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { View, Image, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {DevicesEditStyle as styles} from "../../components/Styles";
import DevicesEditItem from "../../components/DevicesEditItem";
import ModalAdd from "../../components/ModalAdd";
import IsListEmptyMessage from "../../components/IsListEmptyMessage";
import images from '../../constants/images';
import ShowToast from '../../components/ShowToast';
import DoGet from '../../services/doGet';

export default class DevicesEditScreen extends React.Component {

    state = { UserData: {}, deviceData: [], isLoading: true }

    async componentDidMount() {
        try {
            const UserData = await AsyncStorage.getItem('@UserData')
            if (UserData !== null) { this.setState({ UserData: JSON.parse(UserData) }) }
        } catch (e) { console.log('Error "@UserEmail": ' + e) }
        this.getData()
    }

    getData = async () => {
        const dataGet = await DoGet('equipamentos').catch(err => ShowToast('Holve um erro ao carregar equipamentos.'))
        dataGet != undefined ? this.setState({ deviceData: dataGet, isLoading: false }) : null
    }

    render() {
        return (
            <SafeAreaProvider>
                <View style={styles.container}>
                    <View style={styles.itemsContainer_img}>
                        <Image style={styles.imgUser} source={images.Device.manageDeviceUri} />
                    </View>
                    <View style={styles.listContainer}>
                        {
                            !this.state.isLoading ?
                                <FlatList
                                    keyExtractor={(item, index) => index.toString()}
                                    data={this.state.deviceData}
                                    renderItem={({ item, index }) => (
                                        (item.usuarioCadastro.id == this.state.UserData.id ||
                                            this.state.UserData.administrador == true ||
                                            this.state.deviceData.length == 0 ?
                                            <DevicesEditItem id={item.id}
                                                idUser={item.usuarioCadastro.id}
                                                name={item.nome}
                                                active={item.ativo}
                                                turnedOn={item.ligado}
                                                idDepartment={item.departamento.id}
                                                path={item.path}
                                                nav={this.props.navigation}
                                                refresh={this.getData} /> :
                                                (index == this.state.deviceData.length - 1 ? <IsListEmptyMessage valor="Dispositivos" /> : null))
                                    )} /> : <ActivityIndicator style={{ paddingTop: 100 }} size='large' color="#FFF" />
                        }
                    </View>
                    <ModalAdd refresh={this.getData} type="device" addDeviceBtn={styles.addDeviceBtn} />
                </View>
            </SafeAreaProvider>
        );
    }
}
