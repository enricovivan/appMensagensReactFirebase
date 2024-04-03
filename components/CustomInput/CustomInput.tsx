import { StyleSheet, TextInput, TextInputProps } from "react-native"
import { lightGreen, textGreen } from "../../colors/colors"

interface CustomInputProps extends TextInputProps {
    type: 'login' | 'chat'
}

const CustomInput = (props: CustomInputProps) => {
    return (
        <TextInput {...props} style={[props.type == 'login'?st.inputLogin:st.inputChat]} multiline={props.type == 'chat'?true:false}/>
    )
}

const st = StyleSheet.create({
    inputLogin: {
        padding: 16,
        fontSize: 20,
        backgroundColor: lightGreen,
        borderRadius: 15,
        color: textGreen
    },
    inputChat: {
        padding: 16,
        fontSize: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderColor: textGreen,
        borderWidth: 2,
        borderBottomWidth: 0,
    }
})

export {CustomInput}