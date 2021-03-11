import * as React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { ProfileStyle as styles } from './Styles';
import Icon from "../components/Icon";
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/Colors';

export default function ItemMenu(props) {
    return (
        <TouchableWithoutFeedback
            onPress={() => (!props.isExit) ? props.nav.navigate(props.screen) : props.signOut()}
            style={styles.itemContainer}>
            <View style={styles.itemContainer}>
                <View style={styles.imgContainer}>
                    {
                        props.screen == 'ProfileEditScreen' ? <Icon type="MaterialCommunityIcons" size={26} name="account-edit-outline" color={colors.Profile.icon} /> :
                            props.screen == 'DepartmentEditScreen' ? <Icon type="MaterialCommunityIcons" size={26} name="home-edit-outline" color={colors.Profile.icon} /> :
                                props.screen == 'DevicesEditScreen' ? <Icon type="MaterialCommunityIcons" size={26} name="puzzle-edit-outline" color={colors.Profile.icon} /> :
                                    // props.screen == 'SettingsScreen' ? <Icon type="Ionicons" size={26} name="settings-outline" color={colors.Profile.icon} /> :
                                    props.screen == '' ? <Icon type="Ionicons" size={26} name="exit-outline" color={colors.Profile.icon} /> :
                                        <Icon type="AntDesign" size={26} name="edit" color={colors.Profile.icon} />
                    }
                </View>
                <Text style={styles.text}>{props.title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}
