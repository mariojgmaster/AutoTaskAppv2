import { StyleSheet } from 'react-native';

import layouts from '../../constants/Layout';
import colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        height: layouts.window.height,
        padding: 20,
        paddingTop: 40,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: colors.DrawerContent.background,
        marginBottom:40,
    },
    screenTitleContainer: {
        width: '100%',
        paddingBottom: 20,
    },
    screenTitle: {
        color: 'rgba(255,255,255,0.3)',
        fontSize: 20, fontWeight: 'bold',
    },
    itemsContainer_img: {
        alignItems: 'center',
    },
    listContainer: {
        marginBottom:40,
        paddingBottom:40,
    },
    itemsContainer_box: {
        marginTop: 5,
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal:15,
        width: '100%',
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: layouts.window.width * 0.03,
    },
    itemContainer: {
        height: 50,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
        width: 40,
        height: 40,
        // margin: 20,
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
