import { StyleSheet, Text, ToastAndroid, View } from "react-native"
import { darkGreen, lightGreen, textGreen } from "../../colors/colors"
import { CustomButton, CustomInput } from "../../components"
import { useState } from "react"
import { Feather } from '@expo/vector-icons';

interface FormRegister {
    email: string,
    pass: string,
    cPass: string
}

const Register = ({navigation}) => {

    const [formState, setFormState] = useState<FormRegister>({
        email: '',
        pass: '',
        cPass: ''
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

    const btnRegisterClick = () => {
        console.log(formState);

        const regexVerificaIFPR = /^[a-zA-Z0-9._%+-]+@(.*\.)?ifpr/

        if (formState.email == '' || formState.pass == '' || formState.cPass == '') {
            ToastAndroid.show("Preencha todos os campos!!", ToastAndroid.SHORT)    
            return
        }

        if (!regexVerificaIFPR.test(formState.email)) {
            ToastAndroid.show("O e-mail deve ser de domínio do IFPR!", ToastAndroid.SHORT)
            return
        }

        if (formState.cPass != formState.pass){
            ToastAndroid.show("As duas senhas são diferentes!", ToastAndroid.SHORT)
            return
        }

        // salva para o banco de dados

        // retorna pra tela de login com uma mensagem
        navigation.goBack()
        ToastAndroid.show("Obrigado por se registrar, agora faça login!", ToastAndroid.SHORT)
    }

    const btnCancelarClick = () => {
        console.log("cancelando registro...");

        setFormState({
            cPass: '',
            email: '',
            pass: ''
        })

        navigation.goBack()
    }

    return (
        <View style={st.container}>
            <Feather name="at-sign" size={150} color="white" style={{marginBottom: 30}}/>
            <View style={st.card}>
                <Text style={st.title}>Registre-se Agora</Text>
                <View style={{gap: 10, padding: 20, backgroundColor: '#32703f', borderRadius: 20}}>
                    <CustomInput type="login" placeholder="E-mail" placeholderTextColor={textGreen} onChangeText={text => handleFormState('email', text)} value={formState.email} inputMode="email" caretHidden={false}/>
                    <CustomInput type="login" placeholder="Senha" placeholderTextColor={textGreen} onChangeText={text => handleFormState('pass', text)} value={formState.pass} secureTextEntry/>
                    <CustomInput type="login" placeholder="Confirme sua Senha" placeholderTextColor={textGreen} onChangeText={text => handleFormState('cPass', text)} value={formState.cPass} secureTextEntry/>
                </View>
                <CustomButton title="Registrar-se" style={{marginTop: 20}} onPress={btnRegisterClick}/>
                <CustomButton title="Cancelar Registro" style={{marginTop: 10}} type="danger" onPress={btnCancelarClick}/>
            </View>
        </View>
    )
}

const st = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkGreen,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        backgroundColor: 'rgba(5,47,14,1)',
        width: '100%',
        borderRadius: 20
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 30
    }
})

export default Register