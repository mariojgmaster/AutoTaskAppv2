import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { View, Image, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import images from '../../constants/images';
import DoGet from '../../services/doGet';
import ShowToast from '../../components/ShowToast';
import ProfileEditItem from '../../components/ProfileEditItem';
import { ProfileEditStyle as styles } from '../../components/Styles';

export default class DevicesEditScreen extends React.Component {

    state = { UserDataSis: {}, userData: [], isLoading: true }

    async componentDidMount() {
        try {
            const UserData = await AsyncStorage.getItem('@UserData')
            if (UserData !== null) { this.setState({ UserDataSis: JSON.parse(UserData) }) }
        } catch (e) { console.log('Error "@UserEmail": ' + e) }
        this.getData()
    }

    getData = async () => {
        const dataGet = await DoGet('usuarios').catch(err => ShowToast('Holve um erro ao carregar usuários.'))
        dataGet != undefined ? this.setState({ userData: dataGet, isLoading: false }) : null
    }

    render() {
        return (
            <SafeAreaProvider>
                <View style={styles.container}>
                    <View style={styles.itemsContainer_img}>
                        <Image style={styles.imgUser} source={images.User.manageUserUri} />
                    </View>
                    <View style={styles.listContainer}>
                        {
                            !this.state.isLoading ?
                                <FlatList
                                    keyExtractor={(item, index) => index.toString()}
                                    data={this.state.UserDataSis.administrador ? this.state.userData : [this.state.UserDataSis]}
                                    renderItem={({ item }) => (
                                        <ProfileEditItem id={item.id}
                                            name={item.nome}
                                            active={item.ativo}
                                            login={item.login}
                                            password={item.senha}
                                            isAdmin={item.administrador}
                                            isUserSisAdmin={this.state.UserDataSis.administrador}
                                            userIdSis={this.state.UserDataSis.id}
                                            nav={this.props.navigation}
                                            refresh={this.getData} />
                                    )} /> : <ActivityIndicator style={{ paddingTop: 100 }} size='large' color="#FFF" />
                        }
                    </View>
                </View>
            </SafeAreaProvider>
        );
    }
}
