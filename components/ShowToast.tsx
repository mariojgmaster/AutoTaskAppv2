import { ToastAndroid } from 'react-native';

const ShowToast = text => ToastAndroid.showWithGravity( text, ToastAndroid.LONG, ToastAndroid.CENTER )

export default ShowToast