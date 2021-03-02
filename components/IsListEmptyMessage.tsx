import * as React from 'react';
import { View, Text } from 'react-native';
import { DeviceStyle as styles } from '../components/Styles';

function IsListEmptyMessage(props) {
    return (
        <View style={styles.itemsContainer_box}>
            <View style={styles.items_box}>
                <Text style={styles.itemText_box}>Não há {props.valor} a serem exibidos.</Text>
            </View>
        </View>
    )
}

export default IsListEmptyMessage;
