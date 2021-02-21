import { NavigationContainer } from '@react-navigation/native';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import layouts from '../constants/Layout';
import images from '../constants/images';
import colors from '../constants/Colors';

export default class ProfileScreen extends React.Component {

    state = {
        userName: '',
    }

    async componentDidMount() {
        try {
            const UserData = await AsyncStorage.getItem('@UserData')
            if (UserData !== null) { this.setState({ userName: JSON.parse(UserData).nome }) }
        } catch (e) { console.log('Error "@UserEmail": ' + e) }
    }

    render() {
        return (
            <SafeAreaProvider>
                {/* <StatusBar hidden={true} /> */}
                <View style={styles.container}>
                    <View style={styles.itemsContainer_img}>
                        <Image style={styles.imgUser} source={images.User.userUri} />
                    </View>
                    <View style={{width:layouts.window.width,alignItems:'center',justifyContent:'center',paddingTop:10}}>
                        <Text style={{color:colors.Profile.icon,fontSize:16,borderBottomWidth:3,borderBottomColor:'#33333377'}}>{this.state.userName}</Text>
                    </View>
                    <View style={styles.itemsContainer_box}>
                        <ItemMenu title="Editar Perfil" nav={this.props.navigation} screen="ProfileEditScreen" isExit={false} />
                        <ItemMenu title="Editar Departamentos" nav={this.props.navigation} screen="DepartmentEditScreen" isExit={false} />
                        <ItemMenu title="Editar Dispositivos" nav={this.props.navigation} screen="DevicesEditScreen" isExit={false} />
                        {/* <ItemMenu title="Configurações" nav={this.props.navigation} screen="SettingsScreen" isExit={false} /> */}
                        <ItemMenu title="Sair" nav={this.props.navigation} screen="" isExit={true} />
                    </View>
                    {/* <ProfileNavigator /> */}
                </View>
            </SafeAreaProvider>
        )
    }
}

function ItemMenu(props) {
    return (
        <TouchableWithoutFeedback
            onPress={() => (!props.isExit) ? props.nav.navigate(props.screen) : userLogOut({isUserSignedIn:'false',showSignIn:'true'})}
            style={styles.itemContainer}>
            <View style={styles.itemContainer}>
                <View style={styles.imgContainer}>
                    {
                        props.screen == 'ProfileEditScreen' ? <TabBarIconType3 name="account-edit-outline" color={colors.Profile.icon} /> :
                            props.screen == 'DepartmentEditScreen' ? <TabBarIconType3 name="home-edit-outline" color={colors.Profile.icon} /> :
                                props.screen == 'DevicesEditScreen' ? <TabBarIconType3 name="puzzle-edit-outline" color={colors.Profile.icon} /> :
                                    // props.screen == 'SettingsScreen' ? <TabBarIconType1 name="settings-outline" color={colors.Profile.icon} /> :
                                    props.screen == '' ? <TabBarIconType1 name="exit-outline" color={colors.Profile.icon} /> :
                                        <TabBarIconType2 name="edit" color={colors.Profile.icon} />
                    }
                </View>
                <Text style={styles.text}>{props.title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

let userLogOut = async value => {
    try {
        await AsyncStorage.setItem('@isUserSignedIn', value.isUserSignedIn)
        await AsyncStorage.setItem('@showSignIn', value.showSignIn)
    }
    catch (e) { console.log('Error "@UserEmail": ' + e) }
}

function TabBarIconType1(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
    return <Ionicons size={26} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconType2(props: { name: React.ComponentProps<typeof AntDesign>['name']; color: string }) {
    return <AntDesign size={26} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconType3(props: { name: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color: string }) {
    return <MaterialCommunityIcons size={26} style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
    container: {
        height: layouts.window.height,
        padding: 20,
        paddingTop: 40,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: colors.DrawerContent.background,
    },
    itemsContainer_img: {
        width: '100%',
        alignItems: 'center',
    },
    itemsContainer_box: {
        paddingTop: 30,
        width: '100%',
        alignItems: 'center',
    },
    itemContainer: {
        width: '100%',
        height: 50,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    imgContainer: {
        width: 32,
        height: 32,
        // borderWidth: 1,
        // borderColor: '#FFF',
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    imgUser: {
        width: 100,
        height: 100,
        borderRadius: 100,
        margin: 20,
    },
    text: {
        fontSize: 18,
        color: colors.DrawerContent.text,
    },
})
