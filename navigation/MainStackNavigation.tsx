import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';

import ProfileEditScreen from '../screens/editScreens/ProfileEditScreen';
import DepartmentEditScreen from '../screens/editScreens/DepartmentEditScreen';
import DevicesEditScreen from '../screens/editScreens/DevicesEditScreen';
import SensorsEditScreen from '../screens/editScreens/editDevicesScreens/SensorsEditScreen';
import TriggersEditScreen from '../screens/editScreens/editDevicesScreens/TriggersEditScreen';
import SettingsScreen from '../screens/SettingsScreen';

const MainStack = createStackNavigator<RootStackParamList>()

const MainStackNavigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
    return (
        <MainStack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
            <MainStack.Screen name="Root" initialParams={{ colorScheme: colorScheme }} component={BottomTabNavigator} />
            <MainStack.Screen name="ProfileEditScreen" component={ProfileEditScreen} />
            <MainStack.Screen name="DepartmentEditScreen" component={DepartmentEditScreen} />
            <MainStack.Screen name="DevicesEditScreen" component={DevicesEditScreen} />
            <MainStack.Screen name="SensorsEditScreen" component={SensorsEditScreen} />
            <MainStack.Screen name="TriggersEditScreen" component={TriggersEditScreen} />
            <MainStack.Screen name="SettingsScreen" component={SettingsScreen} />
        </MainStack.Navigator>
    );
};

export default MainStackNavigation;
