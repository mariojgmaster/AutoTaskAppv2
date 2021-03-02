import {
    Ionicons,
    AntDesign,
    MaterialCommunityIcons,
    Entypo,
    MaterialIcons,
    FontAwesome,
    FontAwesome5
} from '@expo/vector-icons';
import * as React from 'react';
import { View } from 'react-native';

function Icon(props) {
    let iconComponent;
    switch (props.type) {
        case 'Ionicons': iconComponent = <Ionicons name={props.name} size={props.size} color={props.color} />
        case 'AntDesign': iconComponent = <AntDesign name={props.name} size={props.size} color={props.color} />
        case 'MaterialCommunityIcons': iconComponent = <MaterialCommunityIcons name={props.name} size={props.size} color={props.color} />
        case 'Entypo': iconComponent = <Entypo name={props.name} size={props.size} color={props.color} />
        case 'MaterialIcons': iconComponent = <MaterialIcons name={props.name} size={props.size} color={props.color} />
        case 'FontAwesome': iconComponent = <FontAwesome name={props.name} size={props.size} color={props.color} />
        case 'FontAwesome5': iconComponent = <FontAwesome5 name={props.name} size={props.size} color={props.color} />
        default: break;
    }
    return <View>{iconComponent}</View>
}

export default Icon;