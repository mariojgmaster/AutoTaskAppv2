import * as React from 'react';
import { Text, View, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from "./Icon";
import { ModalStyle as styles } from "./Styles";
import CreateDevice from "./CreateDevice";

export default function ModalAdd({ addDeviceBtn }) {

    const [modalVisible, setModalVisible] = React.useState(false)

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => alert('Modal has been closed.')}>
                <>
                    <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                        <View style={styles.closeArea}></View>
                    </TouchableWithoutFeedback>
                    <View style={styles.container}>
                        <CreateDevice closeModal={() => setModalVisible(!modalVisible)} />
                    </View>
                </>
            </Modal>

            <TouchableOpacity style={addDeviceBtn} onPress={() => setModalVisible(true)}>
                <Icon type="Ionicons" name="md-add-circle-sharp" size={60} color="#FFFFFF77" />
            </TouchableOpacity>
        </>
    )
}
