import * as React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TouchableWithoutFeedback,
    TextInput
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import layouts from '../../constants/Layout';
import images from '../../constants/images';
import colors from '../../constants/Colors';
import { AuthContext } from '../../contexts/AuthContext';

export default function SignUpScreen({ navigation }) {

    const { auth: { signUp } } = React.useContext(AuthContext)

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    return (
        <SafeAreaProvider>
            <View style={styles.mainContainer}>
                <Logo />

                <View style={styles.signUpFormContainer}>
                    <TextInput style={[styles.signUpInput, styles.signUpInput_name]}
                        placeholder="Nome" onChangeText={value => setName(value)} value={name} />

                    <TextInput style={[styles.signUpInput, styles.signUpInput_username]}
                        placeholder="E-mail" onChangeText={value => setEmail(value)} value={email} />

                    <TextInput style={[styles.signUpInput, styles.signUpInput_password]} secureTextEntry={true}
                        onChangeText={value => setPassword(value)} placeholder="Senha" value={password} />

                    <View style={styles.buttonSignUpContainer}>
                        <TouchableOpacity style={styles.buttonSignUp} onPress={() => (signUp(name, email, password), navigation.goBack())}>
                            <Text style={styles.buttonSignUpText}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <CallSignIn nav={navigation} />
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

function CallSignIn(props) {
    return (
        <View style={styles.callSignUpContainer}>
            <TouchableWithoutFeedback onPress={() => props.nav.navigate('SignIn')} >
                <Text style={styles.callSignUpLinkText}>Voltar para Login</Text>
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
        backgroundColor: colors.SignUp.background,
        paddingVertical: layouts.window.height / 10,
    },
    logoContainer: {},
    signUpFormContainer: {
        width: layouts.window.width,
        paddingVertical: layouts.window.height / 10,
        paddingHorizontal: layouts.window.width * 0.4,
        alignItems: 'center',
    },
    signUpInput: {
        width: layouts.window.width / 1.2,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 18,
        borderWidth: 1,
        backgroundColor: '#FFF',
        borderRadius: layouts.window.width / 1.5,
    },
    signUpInput_name: {
        marginBottom: layouts.window.height / 40,
    },
    signUpInput_username: {
        marginBottom: layouts.window.height / 40,
    },
    signUpInput_password: {},
    buttonSignUpContainer: {
        width: layouts.window.width,
        alignItems: 'flex-end',
        paddingHorizontal: '40%',
    },
    buttonSignUp: {
        width: layouts.window.width / 3,
        fontSize: 24,
        marginTop: '15%',
        padding: '3%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: layouts.window.width / 3,
        backgroundColor: colors.SignUp.button,
    },
    buttonSignUpText: {
        color: colors.SignUp.text,
    },
    callSignUpContainer: {},
    callSignUpLinkText: {
        color: colors.SignUp.text,
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
