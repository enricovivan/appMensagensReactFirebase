import { NavigationProp, ParamListBase } from "@react-navigation/native"
import { StyleSheet, Text, ToastAndroid, View } from "react-native"

import { Entypo } from '@expo/vector-icons';
import { darkGreen, textGreen } from "../../colors/colors";
import { CustomButton, CustomInput } from "../../components";
import { useState } from "react";

interface FormLogin {
    email: string,
    pass: string
}

const Login = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {

    /**
     * STATES
     */
    const [formState, setFormState] = useState<FormLogin>({
        email: '',
        pass: ''
    })

    /**
     * FUNCTIONS
     */
    const handleFormState = (name: string, value: string) => {
        setFormState(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // BUTTON CLICKS
    const btnLoginClick = () => {
        console.log("Login")
        console.log(formState);
        const regexVerificaIFPR = /^[a-zA-Z0-9._%+-]+@(.*\.)?ifpr/

        if (formState.email == '' || formState.pass == '') {
            ToastAndroid.show("Preencha todos os campos!!", ToastAndroid.SHORT)    
            return
        }

        if (!regexVerificaIFPR.test(formState.email)) {
            ToastAndroid.show("O e-mail deve ser de domínio do IFPR!", ToastAndroid.SHORT)
            return
        }

        navigation.navigate("chats")
    }

    const btnRegisterClick = () => {
        console.log("Register")
        navigation.navigate('register')
    }

    return (
        <View style={st.container}>
            <View style={st.textContainer}>
                <Entypo name="chat" size={150} color="white" />
            </View>
            <View style={st.textContainer}>
                <Text style={st.title}>Acesso ao Chat</Text>
                <Text style={st.text}>Use seu e-mail e senha cadastrados para acessar o painel de conversas</Text>
                <View style={{gap: 10, marginTop: 20}}>
                    <CustomInput type="login" placeholder="E-mail" placeholderTextColor={textGreen} onChangeText={text => handleFormState('email', text)} value={formState.email} inputMode="email" caretHidden={false}/>
                    <CustomInput type="login" placeholder="Senha" placeholderTextColor={textGreen} onChangeText={text => handleFormState('pass', text)} value={formState.pass} secureTextEntry/>
                </View>
            </View>
            <View style={[st.textContainer, {gap: 10, width: '100%'}]}>
                <CustomButton title="Login" onPress={btnLoginClick} />
                <CustomButton title="Cadastrar" type="success" onPress={btnRegisterClick} />
            </View>
        </View>
    )
}

const st = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkGreen,
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center'
    },

    title: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 15,
        marginTop: 15,
        color: 'white',
    },

    text: {
        fontSize: 20,
        fontWeight: '300',
        textAlign: 'center',
        color: 'white'
    },

    textContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
    },
})

export default Login