import * as React from 'react';
import { Text, View, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from "./Icon";
import { ModalStyle as styles } from "./Styles";
import CreateDevice from "./CreateDevice";
import CreateDepartment from "./CreateDepartment";

export default function ModalAdd({ addDeviceBtn, type }) {

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
                        {
                            [type == 'device' ? <CreateDevice key={0} closeModal={() => setModalVisible(!modalVisible)} />:null,
                            type == 'department' ? <CreateDepartment key={1} closeModal={() => setModalVisible(!modalVisible)} />:null]
                        }
                    </View>
                </>
            </Modal>

            <TouchableOpacity style={addDeviceBtn} onPress={() => setModalVisible(true)}>
                <Icon type="Ionicons" name="md-add-circle-sharp" size={60} color="#FFFFFF77" />
            </TouchableOpacity>
        </>
    )
}
