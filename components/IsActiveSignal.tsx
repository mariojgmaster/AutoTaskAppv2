import * as React from 'react';
import { View } from 'react-native';
import Colors from "../constants/Colors";
import { IsActiveSignalStyle as styles } from "./Styles";

export default function IsActiveSignal(props) {
    return (
        <View style={[ styles.dotSignal,
                props.isActive ?
                    { backgroundColor: Colors.isActiveSignal.active } :
                    { backgroundColor: Colors.isActiveSignal.inactive }
            ]}>
        </View>
    )
}
