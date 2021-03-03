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
        case 'Ionicons': iconComponent = <Ionicons style={props.style} name={props.name} size={props.size} color={props.color} />; break;
        case 'AntDesign': iconComponent = <AntDesign style={props.style} name={props.name} size={props.size} color={props.color} />; break;
        case 'MaterialCommunityIcons': iconComponent = <MaterialCommunityIcons style={props.style} name={props.name} size={props.size} color={props.color} />; break;
        case 'Entypo': iconComponent = <Entypo style={props.style} name={props.name} size={props.size} color={props.color} />; break;
        case 'MaterialIcons': iconComponent = <MaterialIcons style={props.style} name={props.name} size={props.size} color={props.color} />; break;
        case 'FontAwesome': iconComponent = <FontAwesome style={props.style} name={props.name} size={props.size} color={props.color} />; break;
        case 'FontAwesome5': iconComponent = <FontAwesome5 style={props.style} name={props.name} size={props.size} color={props.color} />; break;
        default: break;
    }
    return <View>{iconComponent}</View>
}

export default Icon;