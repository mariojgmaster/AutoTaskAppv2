import { StyleSheet } from 'react-native';

import layouts from '../../constants/Layout';
import colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        height: layouts.window.height,
        paddingHorizontal: 20,
        paddingTop: 30,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: colors.DrawerContent.background,
    },
    screenTitleContainer: {
        width: '100%',
        paddingBottom: 20,
    },
    screenTitle: {
        color: 'rgba(255,255,255,0.3)',
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemsContainer_img: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    listContainer: {
        flex: 1,
        width: layouts.window.width,
        paddingHorizontal: layouts.window.width * 0.05
    },
    itemsContainer_box: {
        paddingTop: 10,
        paddingBottom: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: layouts.window.width * 0.03,
    },
    itemContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#55555555',
        marginBottom: 15,
        marginTop: 5,
    },
    switchsContainer: {
        width: '60%',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRightWidth: 2,
        borderRightColor: '#55555555',
        paddingTop: 5,
        paddingRight: '15%',
    },
    switchContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 10,
    },
    itemTextInput: {
        width: layouts.window.width * 0.55,
        marginLeft: 20,
        paddingVertical: 10,
        marginBottom: 20,
        color: '#AAA',
        borderBottomWidth: 1,
        borderBottomColor: '#555',
        fontSize: 18,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    dateTime: {
        flex: 7,
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        paddingLeft: 20,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingBottom: 10,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
    dateTimeText: {
        width: layouts.window.width * 0.45,
        fontSize: 20,
        color: '#AAA',
        borderBottomWidth: 1,
        borderBottomColor: '#555',
        marginLeft: 15,
        textAlign: 'center',
    },
    saveSchBtn: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: 15,
        paddingTop: 20,
    },
    imgContainer: {
        width: 40,
        height: 40,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    imgUser: {
        width: 140,
        height: 140,
        margin: 20,
        borderRadius: 140,
    },
    text: {
        fontSize: 18,
        color: colors.DrawerContent.text,
    },
    inputs: {
        width: layouts.window.width * 0.7,
        color: colors.DrawerContent.text,
        borderBottomColor: colors.DrawerContent.text,
        borderBottomWidth: 2,
    },
})

export default styles;
