import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import images from '../constants/images';
import { ProfileStyle as styles } from '../components/Styles';
import ItemMenu from "../components/ProfileItem";
import { AuthContext } from '../contexts/AuthContext';

export default function ProfileEditStyle({ navigation }) {

    const { auth: { signOut }, user } = React.useContext(AuthContext)

    const [userNome, setUserNome] = React.useState('')
    const [userAdmin, setUserAdmin] = React.useState('')

    React.useEffect(() => {
        const getUserData = async () => {
            try {
                const UserData = await AsyncStorage.getItem('@UserData')
                if (UserData !== null) { setUserNome(JSON.parse(UserData).nome), setUserAdmin(JSON.parse(UserData).administrador) }
            } catch (e) { console.log('Error "@UserEmail": ' + e) }
        }
        getUserData()
    })

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <View style={styles.itemsContainer_img}>
                    <Image style={styles.imgUser} source={images.User.userUri} />
                </View>
                <View style={styles.userNameContainer}>
                    <Text style={styles.userNameText}>{userNome}</Text>
                </View>
                <View style={styles.itemsContainer_box}>
                    <ItemMenu title="Editar Perfil" nav={navigation} screen="ProfileEditScreen" isExit={false} />
                    {
                        userAdmin ?
                            [<ItemMenu key={0} title="Editar Departamentos" nav={navigation} screen="DepartmentEditScreen" isExit={false} />,
                            <ItemMenu key={1} title="Editar Dispositivos" nav={navigation} screen="DevicesEditScreen" isExit={false} />] : null
                    }
                    {/* <ItemMenu title="Configurações" nav={navigation} screen="SettingsScreen" isExit={false} /> */}
                    <ItemMenu title="Sair" nav={navigation} screen="" isExit={true} signOut={signOut} />
                </View>
            </View>
        </SafeAreaProvider>
    )
    // }
}
