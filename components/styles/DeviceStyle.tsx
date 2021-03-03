import { StyleSheet } from 'react-native';

import layouts from '../../constants/Layout';
import colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        height: layouts.window.height,
        padding: 20,
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
    itemsContainer_box: {
        marginTop: 15,
        marginBottom: 10,
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: layouts.window.width * 0.03,
    },
    items_box: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemText_box: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 18,
        textAlign: 'center',
    },
    itemContainer: {
        height: 50,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgContainer: {
        width: 32,
        height: 32,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    imgUser: {
        width: 40,
        height: 40,
        borderRadius: 40,
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
