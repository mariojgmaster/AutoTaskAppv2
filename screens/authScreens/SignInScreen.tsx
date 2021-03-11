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
import { AuthContext } from '../../contexts/AuthContext';

export default function SignInScreen({ navigation }) {

    const { auth: { signIn } } = React.useContext(AuthContext)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    return (
        <SafeAreaProvider>
            <View style={styles.mainContainer}>
                <Logo />

                <View style={styles.signInFormContainer}>
                    <TextInput style={[styles.signInInput, styles.signInInput_username]}
                        placeholder="Usuário" onChangeText={value => setEmail(value)} value={email} />

                    <TextInput style={[styles.signInInput, styles.signInInput_password]} secureTextEntry={true}
                        onChangeText={value => setPassword(value)} placeholder="Senha" value={password} />

                    <View style={styles.buttonSignInContainer}>
                        <TouchableOpacity style={styles.buttonSignIn} onPress={() => signIn(email, password)}>
                            <Text style={styles.buttonSignInText}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <CallSignUp nav={navigation} />
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

function CallSignUp(props) {
    return (
        <View style={styles.callSignUpContainer}>
            <TouchableWithoutFeedback onPress={() => props.nav.navigate('SignUp')} >
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
