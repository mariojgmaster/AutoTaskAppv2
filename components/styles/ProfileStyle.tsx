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
    },
    itemsContainer_img: {
        width: '100%',
        alignItems: 'center',
    },
    itemsContainer_box: {
        paddingTop: 30,
        width: '100%',
        alignItems: 'center',
    },
    itemContainer: {
        width: '100%',
        height: 50,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    imgContainer: {
        width: 32,
        height: 32,
        // borderWidth: 1,
        // borderColor: '#FFF',
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    imgUser: {
        width: 100,
        height: 100,
        borderRadius: 100,
        margin: 20,
    },
    userNameContainer: {
        width:layouts.window.width,
        alignItems:'center',
        justifyContent:'center',
        paddingTop:10,
    },
    userNameText: {
        color:colors.Profile.icon,
        fontSize:16,
        borderBottomWidth:3,
        borderBottomColor:'#33333377',
    },
    text: {
        fontSize: 18,
        color: colors.DrawerContent.text,
    },
})

export default styles;
