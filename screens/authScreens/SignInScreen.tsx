import * as React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TouchableWithoutFeedback,
    TextInput,
    Alert,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import layouts from '../../constants/Layout';
import images from '../../constants/images';
import colors from '../../constants/Colors';

export default function SignInScreen(props, { navigation }) {
    return (
        <SafeAreaProvider>
            <View style={styles.mainContainer}>
                <Logo />
                <SignInForm signInData={props.signInData} />
                <CallSignUp showSignIn={props.showSignIn} />
            </View>
        </SafeAreaProvider>
    );
}

function Logo() {
    return (
        <View style={styles.logoContainer}>
            <Image style={styles.logoImage} source={images.LogIn.logoUri} />
        </View>
    );
}

class SignInForm extends React.Component {

    state = { userMail: '', userPass: '' }
    userData = () => {return {userMail:this.state.userMail,userPass:this.state.userPass}}

    render() {
        return (
            <View style={styles.signInFormContainer}>
                <TextInput style={[styles.signInInput, styles.signInInput_username]}
                    placeholder="E-mail" onChangeText={value => this.setState({ userMail: value })} />
                <TextInput style={[styles.signInInput, styles.signInInput_password]} secureTextEntry={true}
                    onChangeText={value => this.setState({ userPass: value })} placeholder="Senha" />
                <View style={styles.buttonSignInContainer}>
                    <TouchableOpacity style={styles.buttonSignIn} onPress={() => this.props.signInData(this.userData())}>
                        <Text style={styles.buttonSignInText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

function CallSignUp(props) {
    return (
        <View style={styles.callSignUpContainer}>
            <TouchableWithoutFeedback onPress={() => props.showSignIn(false)} >
                <Text style={styles.callSignUpLinkText}>Cadastrar Nova Conta</Text>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: colors.SignIn.background,
        paddingVertical: layouts.window.height / 10,
    },
    logoContainer: {},
    signInFormContainer: {
        width: layouts.window.width,
        paddingVertical: layouts.window.height / 10,
        paddingHorizontal: layouts.window.width * 0.4,
        alignItems: 'center',
    },
    signInInput: {
        width: layouts.window.width / 1.2,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 18,
        borderWidth: 1,
        backgroundColor: '#FFF',
        borderRadius: layouts.window.width / 1.5,
    },
    signInInput_username: {
        marginBottom: layouts.window.height / 40,
    },
    signInInput_password: {},
    buttonSignInContainer: {
        width: layouts.window.width,
        alignItems: 'flex-end',
        paddingHorizontal: '40%',
    },
    buttonSignIn: {
        width: layouts.window.width / 3,
        fontSize: 24,
        marginTop: '15%',
        padding: '3%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: layouts.window.width / 3,
        backgroundColor: colors.SignIn.button,
    },
    buttonSignInText: {
        color: colors.SignIn.text,
    },
    callSignUpContainer: {},
    callSignUpLinkText: {
        color: colors.SignIn.text,
        fontSize: 16,
        opacity: 0.6,
        textDecorationLine: 'underline',
    },
    logoImage: {
        width: layouts.window.width / 2.5,
        height: layouts.window.width / 2.5,
        borderRadius: layouts.window.width / 2.5,
    }
})
