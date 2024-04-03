import { ButtonProps, Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native"
import { lightGreen, textGreen } from "../../colors/colors"

const buttonTypes = ['primary', 'secondary', 'success', 'danger'] as const
type ButtonType = (typeof buttonTypes)[number]

interface CustomButtonProps extends ButtonProps {
    type?: ButtonType
    style?: StyleProp<ViewStyle>
}

const CustomButton = (props: CustomButtonProps) => {

    /**
     * Colors
     */
    function typeToColors (type: ButtonType): string{
        switch (type){
            case 'primary':
                return '#0d6efd'
            case 'secondary':
                return '#6c757d'
            case 'danger':
                return '#dc3545'
            case 'success':
                return textGreen
            default:
                return '#ffffff'
        }
    }

    return (
        <Pressable {...props} style={[props.style, {
            backgroundColor: typeToColors(props.type),
            padding: 16,
            borderRadius: 15,
        }]}>
            <Text style={{
                color: props.type == undefined?textGreen:'white',
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '900'
            }}>{props.title}</Text>
        </Pressable>
    )
}

export {CustomButton}