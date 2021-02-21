import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useState } from 'react';
import { ColorSchemeName, View, Text, Alert } from 'react-native';

import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import Api from '../services/api'

import ProfileEditScreen from '../screens/editScreens/ProfileEditScreen';
import DepartmentEditScreen from '../screens/editScreens/DepartmentEditScreen';
import DevicesEditScreen from '../screens/editScreens/DevicesEditScreen';
import SensorsEditScreen from '../screens/editScreens/editDevicesScreens/SensorsEditScreen';
import TriggersEditScreen from '../screens/editScreens/editDevicesScreens/TriggersEditScreen';
import SignInScreen from '../screens/authScreens/SignInScreen';
import SignUpScreen from '../screens/authScreens/SignUpScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
	return (<Application colorScheme={colorScheme} />);
}

class Application extends React.Component {

	state = {
		showSignIn: 'true',
		isUserSignedIn: 'false',
		users: [],
        userName: '', // SignUp
        userMail: '', // SignIn / SignUp
        userPass: '', // SignIn / SignUp
	}

	async componentDidMount() {

		try {
			const isUserSignedIn = await AsyncStorage.getItem('@isUserSignedIn')
			const showSignIn = await AsyncStorage.getItem('@showSignIn')
			if (isUserSignedIn !== null && showSignIn !== null) {
				console.log(isUserSignedIn)
				console.log(showSignIn)
				this.setState({ isUserSignedIn, showSignIn })
			}
		} catch (e) {
			console.log('Error "@UserEmail": ' + e)
		}

		await axios.get(`${Api.EndPoint.URL}/usuarios`)
            .then(res => { this.setState({ users: res.data }) })
            .catch(err => console.error(`Erro no Get de Usuários: ${err}`))

	}

	handlerSignIn = (_email, _senha) => {
		// let email = this.state.userMail;
		// let senha = this.state.userPass;
		let email = _email;
		let senha = _senha;
		let stopIt = false;
		let user_data;

		let logado = this.state.users.reduce(function (total, currentValue, currentIndex, arr) {
			if (!stopIt) {
				if ((email == currentValue.login) && (senha == currentValue.senha)) {
					console.log('Logar');
					stopIt = true;
					user_data = arr[currentIndex]
					console.log(user_data)
					return true;
				}
				else { console.log('Não Logar'); stopIt = false; return false; }
			} else { return true; }
		}, false)

		if (logado) {
			const valor = {isUserSignedIn:'true',showSignIn:'true'}
			this.storeAuthData(valor)
			this.userData(user_data)
		}
		else {
			const valor = {isUserSignedIn:'false',showSignIn:'true'}
			this.storeAuthData(valor)
			Alert.alert(
				"Não foi possível efetuar login.",
				"Confira suas informações e tente novamente!",
				[ { text: "OK", onPress: () => console.log("OK Pressed") } ], { cancelable: true }
			);
		}
	}

	storeAuthData = async value => {
        try {
            await AsyncStorage.setItem('@isUserSignedIn', value.isUserSignedIn)
            await AsyncStorage.setItem('@showSignIn', value.showSignIn)
        }
        catch (e) { console.log('Error "@UserEmail": ' + e) }
		this.setState({
			isUserSignedIn: value.isUserSignedIn,
			showSignIn: value.showSignIn,
		})
    }

	userData = async value => {
        try { await AsyncStorage.setItem('@UserData', JSON.stringify(value)) }
		catch (e) { console.log('Error "@UserData": ' + e) }
    }

	signInData = data => {
		this.setState({
			userMail: data.userMail,
			userPass: data.userPass,
		})
		this.handlerSignIn(data.userMail, data.userPass)
	}

	handlerSignUp = async (name, mail, pass) => {
		let payload = {
			Nome: name,
			Login: mail,
			Senha: pass,
			Ativo: true,
			Administrador: false
		}
		let res = await axios.post(`${Api.EndPoint.URL}/usuarios`, payload);
		let data = res.data;
		console.log(data);
	}

	signUpData = data => {
		this.setState({
			userName: data.userName,
			userMail: data.userMail,
			userPass: data.userPass,
		})
		
		let userExists = []
		let userExist = this.state.users.reduce(function (total, currentValue, currentIndex, arr) {
			console.log(data.userMail)
			console.log(currentValue.login)
			if(data.userMail === currentValue.login) {userExists.push(true)}
			else { return false; }
		}, false)

		if(userExists.length>0) {
			Alert.alert(
				"Não foi possível efetuar cadastro.",
				"E-mail já foi cadastrado anteriormente!",
				[ { text: "OK", onPress: () => console.log("OK Pressed") } ],
				{ cancelable: true }
			);
		} else {
			if(data.userName == '' || data.userMail == '' || data.userPass == '') {
				Alert.alert(
					"Não foi possível efetuar cadastro.",
					"Revise as informações Passadas",
					[ { text: "OK", onPress: () => console.log("OK Pressed") } ],
					{ cancelable: true }
				);
			} else {
				this.handlerSignUp(data.userName, data.userMail, data.userPass)
				this.showSignIn(true)
			}
		}
	}

	showSignIn = val => this.setState({ showSignIn: val.toString() })

	render() {
		return (
			<NavigationContainer theme={this.props.colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				{
					this.state.isUserSignedIn != 'true'?
						(
							this.state.showSignIn == 'true' ?
								<SignInScreen signInData={this.signInData} showSignIn={() => this.showSignIn(false)} /> :
								<SignUpScreen signUpData={this.signUpData} showSignIn={() => this.showSignIn(true)} />
						) :
						<RootNavigator />
				}
			</NavigationContainer >
		)
	}
}

const AppStack = createStackNavigator<RootStackParamList>();
function RootNavigator() {
	return (
		<AppStack.Navigator screenOptions={{ headerShown: false }}>
			<AppStack.Screen name="Root" component={BottomTabNavigator} />
			{/* <AppStack.Screen name="SignInScreen" component={SignInScreen} /> */}
			{/* <AppStack.Screen name="SignUpScreen" component={SignUpScreen} /> */}
			<AppStack.Screen name="ProfileEditScreen" component={ProfileEditScreen} />
			<AppStack.Screen name="DepartmentEditScreen" component={DepartmentEditScreen} />
			<AppStack.Screen name="DevicesEditScreen" component={DevicesEditScreen} />
			<AppStack.Screen name="SensorsEditScreen" component={SensorsEditScreen} />
			<AppStack.Screen name="TriggersEditScreen" component={TriggersEditScreen} />
			<AppStack.Screen name="SettingsScreen" component={SettingsScreen} />
		</AppStack.Navigator>
	);
}
