import { StyleSheet } from 'react-native';

import layouts from '../../constants/Layout';
import colors from '../../constants/Colors';

const styles = StyleSheet.create({
    closeArea: {
        width: layouts.window.width,
        flex: 1,
        backgroundColor: 'transparent',
    },
    container: {
        width: layouts.window.width,
        flex: 1,
        backgroundColor: colors.DrawerContent.background,
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderTopColor: '#FFF',
        borderRightColor: '#FFF',
        borderLeftColor: '#FFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingVertical: 20,
    },
})

export default styles;
