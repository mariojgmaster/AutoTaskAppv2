import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import Colors from '../constants/Colors';
import DashBoardScreen from '../screens/DashBoardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DevicesScreen from '../screens/DevicesScreen';
import ScheaduleScreen from '../screens/ScheaduleScreen';
import Icon from '../components/Icon';

const BottomTab = createBottomTabNavigator();
export default function BottomTabNavigator({ route }) {
	return (
		<BottomTab.Navigator initialRouteName="DashBoardScreen" tabBarOptions={{activeTintColor: route.params.colorScheme === 'dark' ? '#AACCFF99' : Colors.TabBar.buttonActive}}>

			<BottomTab.Screen
				name="Sensores"
				component={DashBoardScreen}
				options={{ tabBarIcon: ({ color }) => <Icon type="AntDesign" style={{marginTop:3}} name="dashboard" size={24} color={color} /> }} />

			<BottomTab.Screen
				name="Dispositivos"
				component={DevicesScreen}
				options={{ tabBarIcon: ({ color }) => <Icon type="MaterialCommunityIcons" style={{marginTop:3}} name="devices" size={24} color={color} /> }} />

			<BottomTab.Screen
				name="Agendar"
				component={ScheaduleScreen}
				options={{ tabBarIcon: ({ color }) => <Icon type="MaterialCommunityIcons" style={{marginTop:3}} name="timer-outline" size={24} color={color} /> }} />

			<BottomTab.Screen
				name="Perfil"
				component={ProfileScreen}
				options={{ tabBarIcon: ({ color }) => <Icon type="Ionicons" style={{marginTop:3}} name="person-outline" size={24} color={color} /> }} />

		</BottomTab.Navigator>
	);
}
