import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"
import { MessageBoxType } from "../../types/MessageBoxType"

interface MessageBoxProps extends MessageBoxType {
    customStyle ?: StyleProp<ViewStyle>
}

const MessageBox = ({message, personName, sendTime, role, customStyle}: MessageBoxProps) => {
    return (
        <View style={[st.container, customStyle, {alignItems: role == 'professor'?'flex-start':'flex-end'}]}>
            <View style={[st.limit]}>
                <View style={[st.boxOutside, {borderBottomLeftRadius: role == 'professor'?0:15, borderBottomRightRadius: role == 'aluno'?0:15}]}>
                    <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 8, textAlign: role == 'professor'?'left':'right'}}>{personName}</Text>

                    <Text style={{fontSize: 16, textAlign: 'left'}}>{message}</Text>
                </View>
                <View style={[st.time]}>
                    <Text style={{textAlign: role == 'professor'?'left':'right'}}>{sendTime}</Text>
                </View>
            </View>
        </View>
    )
}

const st = StyleSheet.create({
    container: {
        flex: 1,
    },
    boxOutside: {
        backgroundColor: 'lightgray',
        padding: 20,
        borderRadius: 15
    },
    limit: {
        maxWidth: '70%'
    },
    time: {
        marginTop: 5
    }
})

export {MessageBox}