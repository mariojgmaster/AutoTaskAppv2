import * as React from 'react';
import { useState } from 'react';
import {
    Switch,
    Text,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
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
                <View style={{justifyContent: 'center', alignItems: 'center', paddingRight: 10, paddingBottom:10}}>
                    <Text style={{ color: '#EEE', fontSize:22, textAlign:'center' }}>{name}</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                    <View style={[styles.itemsContainer_img, {flex:3}]}>
                        {/* <Image style={styles.imgUser} source={images.Device.deviceUri} /> */}
                        <Icon type='AntDesign' name="wifi" size={40} color='#EEEEEE44' />
                    </View>
                    <View style={{flex:7, flexDirection:'row', alignItems:'flex-end', justifyContent:'center', paddingBottom:15}}>
                        <Text style={{fontSize:60, color:'#CCCCCC77'}}>{Math.round(Math.random()*30+10)}</Text>
                        <Text style={{fontSize:24, color:'#CCCCCC77', fontWeight:'bold'}}>{arrTestesUnidMeds[Math.round(Math.random()*4)]}</Text>
                    </View>
                </View>
        </View>
    )
}
