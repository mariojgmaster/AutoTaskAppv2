import * as React from 'react';
import { Text, View } from 'react-native';
import { SensorStyle as styles } from './Styles';
import Icon from "./Icon";
import IsActiveSignal from "./IsActiveSignal";

export default function SensorItem({ id, name, active, idUser, idDepartment, path, nav }) {

    const arrTestesUnidMeds = ['%', 'lux', 'ºC', 'dB', 'cm']

    return (

        <View style={styles.itemsContainer_box}>
                <View style={{ alignItems: 'flex-end' }}>
                    <IsActiveSignal isActive={active} />
                </View>
                <View style={styles.itemTextContainer}>
                    <Text style={styles.itemText}>{name}</Text>
                </View>
                <View style={styles.bottomCardContainer}>
                    <View style={[styles.itemsContainer_img, {flex:3}]}>
                        <Icon type='AntDesign' name="wifi" size={40} color='#EEEEEE44' />
                    </View>
                    <View style={styles.valueText}>
                        <Text style={{fontSize:60, color:'#CCCCCC77'}}>{Math.round(Math.random()*30+10)}</Text>
                        <Text style={{fontSize:24, color:'#CCCCCC77', fontWeight:'bold'}}>{arrTestesUnidMeds[Math.round(Math.random()*4)]}</Text>
                    </View>
                </View>
        </View>
    )
}
