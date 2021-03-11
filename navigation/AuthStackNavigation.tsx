import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../screens/authScreens/SignInScreen';
import SignUpScreen from '../screens/authScreens/SignUpScreen';

const AuthStack = createStackNavigator()
const LoginStack = createStackNavigator()

const AuthStackNavigation = () => {
  return (
    <AuthStack.Navigator mode="modal" screenOptions={{ headerShown: false }}>

        <AuthStack.Screen name="SignInStack">
            {
                () => (
                    <LoginStack.Navigator mode="card" screenOptions={{ headerShown: false }}>
                        <LoginStack.Screen name='SignIn' component={SignInScreen} />
                    </LoginStack.Navigator>
                )
            }
        </AuthStack.Screen>

        <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigation;
