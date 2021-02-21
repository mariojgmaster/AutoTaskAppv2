import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import layouts from '../constants/Layout';
import images from '../constants/images';
import colors from '../constants/Colors';

export default function DashBoardScreen({ navigation }) {
    return (
        <SafeAreaProvider>
            {/* <StatusBar hidden={true} /> */}
            <View>
                <Text>DashBoardScreen</Text>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {},
})
