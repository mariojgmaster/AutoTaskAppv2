import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import images from '../constants/images';
import { ProfileStyle as styles } from '../components/Styles';
import ItemMenu from "../components/ProfileItem";

export default class ProfileEditStyle extends React.Component {

    state = { userName: '', isUserAdmin: false }

    async componentDidMount() {
        try {
            const UserData = await AsyncStorage.getItem('@UserData')
            if (UserData !== null) { this.setState({ userName: JSON.parse(UserData).nome, isUserAdmin: JSON.parse(UserData).administrador }) }
        } catch (e) { console.log('Error "@UserEmail": ' + e) }
    }

    render() {
        return (
            <SafeAreaProvider>
                <View style={styles.container}>
                    <View style={styles.itemsContainer_img}>
                        <Image style={styles.imgUser} source={images.User.userUri} />
                    </View>
                    <View style={styles.userNameContainer}>
                        <Text style={styles.userNameText}>{this.state.userName}</Text>
                    </View>
                    <View style={styles.itemsContainer_box}>
                        <ItemMenu title="Editar Perfil" nav={this.props.navigation} screen="ProfileEditScreen" isExit={false} />
                        {
                            this.state.isUserAdmin ?
                                [<ItemMenu key={0} title="Editar Departamentos" nav={this.props.navigation} screen="DepartmentEditScreen" isExit={false} />,
                                <ItemMenu key={1} title="Editar Dispositivos" nav={this.props.navigation} screen="DevicesEditScreen" isExit={false} />] : null
                        }
                        {/* <ItemMenu title="Configurações" nav={this.props.navigation} screen="SettingsScreen" isExit={false} /> */}
                        <ItemMenu title="Sair" nav={this.props.navigation} screen="" isExit={true} />
                    </View>
                </View>
            </SafeAreaProvider>
        )
    }
}
