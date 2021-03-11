import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useState } from 'react';
import { ColorSchemeName, View, Text, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthStackNavigation from './AuthStackNavigation';
import MainStackNavigation from './MainStackNavigation';
import { AuthContext } from "../contexts/AuthContext";
import DoPost from '../services/doPost';
import ShowToast from '../components/ShowToast';

const RootStack = createStackNavigator();

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {

	const setUserDataStorage = async value => {
        try { await AsyncStorage.setItem('@UserData', JSON.stringify(value)) }
		catch (e) { console.log('Error "@UserData": ' + e) }
    }

	const removeUserDataStorage = async () => {
        try { await AsyncStorage.removeItem('@UserData') }
		catch (e) { console.log('Error "@UserData": ' + e) }
    }

	const [state, dispatch] = React.useReducer(
		(state, action) => {
			switch (action.type) {
				case 'SET_USER':
					setUserDataStorage(action.payload)
					return {...state, user: { ...action.payload }}
				case 'REMOVE_USER':
					removeUserDataStorage()
					return {...state, user: undefined}
				default: return state
			}
		}, { user: undefined })

	const auth = React.useMemo(() => ({
		signIn: async (email, password) => {
			let payloadUser = { login: email, senha: password }
			const usuario = await DoPost('usuarios/validarlogin', payloadUser)
				.then(res => dispatch({ type: 'SET_USER', payload: res }))
				.catch(err => ShowToast('Não foi possível autenticar usuário.'))
		},
		signOut: async () => {
			dispatch({ type: 'REMOVE_USER' })
		},
		signUp: (name, email, password) => {
			let payloadUser = {
				nome: name,
				login: email,
				senha: password,
				ativo: true,
				administrador: false
			}
			DoPost('usuarios', payloadUser)
				.then(res => ShowToast("Usuário Cadastrado com Sucesso!"))
				.catch(err => ShowToast('Holve um erro ao cadastrar usuário.'))
		},
	}), [])

	const [user, setUser] = React.useState(state.user)
    React.useEffect(() => {
        const getUserData = async () => {
            try { const UserData = await AsyncStorage.getItem('@UserData')
                UserData !== null ? setUser(JSON.parse(UserData)) : setUser(undefined)
            } catch (e) { console.log('Error Getting "@UserEmail": ' + e) }
        }
        getUserData()
    })

	return (
		<AuthContext.Provider value={{ auth, user: state.user }}>
			<NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<RootStack.Navigator screenOptions={{ headerShown: false }}>
					{
						// state.user ?
						user ?
							(<RootStack.Screen name="MainStackNavigation" component={MainStackNavigation} />) :
							(<RootStack.Screen name="AuthStackNavigation" component={AuthStackNavigation} />)
					}
				</RootStack.Navigator>
			</NavigationContainer>
		</AuthContext.Provider>
	);
}
