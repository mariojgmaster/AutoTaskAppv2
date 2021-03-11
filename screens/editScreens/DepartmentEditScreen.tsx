import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { View, Image, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DepartmentEditStyle as styles } from '../../components/Styles';
import DepartmentItem from '../../components/DepartmentEditItem';

import ModalAdd from "../../components/ModalAdd";
import images from '../../constants/images';
import DoGet from '../../services/doGet';
import ShowToast from '../../components/ShowToast';

export default class DepartmentEditScreen extends React.Component {

    state = { UserData: {}, departmentData: [], isLoading: true }

    async componentDidMount() {
        try {
            const UserData = await AsyncStorage.getItem('@UserData')
            if (UserData !== null) { this.setState({ UserData: JSON.parse(UserData) }) }
        } catch (e) { console.log('Error "@UserEmail": ' + e) }
        this.getData()
    }

    getData = async () => {
        const dataGet = await DoGet('departamentos').catch(err => ShowToast('Holve um erro ao carregar departamentos.'))
        dataGet != undefined ? this.setState({ departmentData: dataGet, isLoading: false }) : null
    }

    render() {
        return (
            <SafeAreaProvider>
                <View style={styles.container}>
                    <View style={styles.itemsContainer_img}>
                        <Image style={styles.imgUser} source={images.Department.manageDepartmentUri} />
                    </View>
                    <View style={styles.listContainer}>
                        {
                            !this.state.isLoading ?
                                <FlatList
                                    keyExtractor={(item, index) => index.toString()}
                                    data={this.state.departmentData}
                                    renderItem={({ item }) => (
                                        <DepartmentItem id={item.id}
                                            idUser={this.state.UserData.id}
                                            name={item.nome}
                                            active={item.ativo}
                                            deptsList={this.state.departmentData}
                                            nav={this.props.navigation} />
                                    )} /> : <ActivityIndicator style={{ paddingTop: 100 }} size='large' color="#FFF" />
                        }
                    </View>
                    <ModalAdd type="department" addDeviceBtn={styles.addDepartmentBtn} />
                </View>
            </SafeAreaProvider>
        );
    }
}
