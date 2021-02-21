import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import DashBoardScreen from '../screens/DashBoardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DevicesScreen from '../screens/DevicesScreen';
import ScheaduleScreen from '../screens/ScheaduleScreen';

const BottomTab = createBottomTabNavigator();
export default function BottomTabNavigator() {

	return (
		<BottomTab.Navigator initialRouteName="DashBoardScreen" tabBarOptions={{ activeTintColor: Colors.TabBar.buttonActive }}>

			<BottomTab.Screen
				name="DashBoard"
				component={DashBoardScreen}
				options={{
					tabBarIcon: ({ color }) => <TabBarIconType2 name="dashboard" color={color} />,
				}}
			/>

			<BottomTab.Screen
				name="Dispositivos"
				component={DevicesScreen}
				options={{
					tabBarIcon: ({ color }) => <TabBarIconType3 name="devices" color={color} />,
				}}
			/>

			<BottomTab.Screen
				name="Agendar"
				component={ScheaduleScreen}
				options={{
					tabBarIcon: ({ color }) => <TabBarIconType3 name="timer-outline" color={color} />,
				}}
			/>

			<BottomTab.Screen
				name="Perfil"
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ color }) => <TabBarIconType1 name="person-outline" color={color} />,
				}}
			/>

		</BottomTab.Navigator>
	);
}

function TabBarIconType1(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
	return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconType2(props: { name: React.ComponentProps<typeof AntDesign>['name']; color: string }) {
	return <AntDesign size={24} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconType3(props: { name: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color: string }) {
	return <MaterialCommunityIcons size={24} style={{ marginBottom: -3 }} {...props} />;
}
