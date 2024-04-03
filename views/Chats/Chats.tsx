import { FlatList, Pressable, StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from "react-native"
import { CustomButton, CustomInput, MessageBox } from "../../components"
import { useEffect, useRef, useState } from "react"
import { MessageBoxType } from "../../types/MessageBoxType"
import { Ionicons } from '@expo/vector-icons';
import { textGreen } from "../../colors/colors";

const filters = ['todos', 'alunos', 'professores'] as const
type Filters = (typeof filters)[number]

interface ButtonsFilters {
    title: string,
    selected: boolean,
    onClick: () => void,
    specificStyle?: StyleProp<ViewStyle>
}

const Chats = () => {

    const [chatFilter, setChatFilter] = useState<Filters>('todos')
    const [messageInput, setMessageInput] = useState<string>('')
    const [messagesDummy, setMessagesDummy] = useState<MessageBoxType[]>([
        {
            personName: 'Professor Joia',
            message: 'Bom dia pessoas',
            sendTime: '15:55',
            role: 'professor'
        },
        {
            personName: 'Aluno 1',
            message: 'Boa tarde né!',
            sendTime: '16:00',
            role: 'aluno'
        },
        {
            personName: 'Eu',
            message: 'Cr3do v6 2',
            sendTime: '16:01',
            role: 'aluno'
        },
        {
            personName: 'Professor Brabo',
            message: 'QUE LINGUAJAR É ESSE?? DIGA NOVAMENTE ESSAS PALAVRAS E EU LHE FAREI DESEJAR A MORTE!!!',
            role: 'professor',
            sendTime: '16:15'
        },
        {
            personName: 'Aluno 2',
            message: 'cringe 🗿🍷',
            role: 'aluno',
            sendTime: '16:16'
        }
    ])

    const [filteredMessages, setFilteredMessages] = useState<MessageBoxType[]>()

    const refList = useRef(null)

    
    /**
     * Functions
     */
    const btnTodosClick = () => {
        console.log('todos')
        setChatFilter('todos')

        // filtra mensagens
        setFilteredMessages(messagesDummy)
    }

    const btnAlunosClick = () => {
        console.log('alun')
        setChatFilter('alunos')

        // filtra mensagens
        setFilteredMessages(messagesDummy.filter(item => item.role == 'aluno'))
    }

    const btnProfessoresClick = () => {
        console.log('prof')
        setChatFilter('professores')

        // filtra mensagens
        setFilteredMessages(messagesDummy.filter(item => item.role == 'professor'))
    }

    const btnSendMessage = () => {
        console.log("Mandou a mensagem")
        console.log(messageInput)

        if (messageInput == '') return

        const data = new Date()

        setMessagesDummy([
            ...messagesDummy,
            {
                message: messageInput,
                personName: 'Eu',
                role: 'aluno',
                sendTime: `${data.getHours()}:${data.getMinutes()}`
            }
        ])

        // depois de mandar pro banco de dados apaga a mensagem
        setMessageInput('')
    }

    /**
     * CONSTS
     */
    const btnFilters: ButtonsFilters[] = [
        {
            title: 'Todos',
            selected: chatFilter == 'todos'?true:false,
            onClick: btnTodosClick
        },
        {
            title: 'Alunos',
            selected: chatFilter == 'alunos'?true:false,
            onClick: btnAlunosClick
        },
        {
            title: 'Professores',
            selected: chatFilter == 'professores'?true:false,
            onClick: btnProfessoresClick,
            specificStyle: {flex: 2}
        }
    ]

    useEffect(()=>{
        setFilteredMessages(messagesDummy)
        refList.current.scrollToEnd({animated: true})
    }, [messagesDummy])

    return (
        <View style={[st.containerGeneral, {}]}>
            <View style={[st.headerRow, {padding: 20}]}>
                {btnFilters.map((item, index) => <CustomButton key={index} title={item.title} style={[item.specificStyle?item.specificStyle:{flex: 1}]} type={item.selected?'success':undefined} onPress={item.onClick}/>)}
            </View>
            <View style={{flex: 1, padding: 20}}>
                <FlatList ref={refList} data={filteredMessages} renderItem={({item, index}) => <MessageBox key={index} personName={item.personName} message={item.message} sendTime={item.sendTime} role={item.role} customStyle={{marginBottom: 15}}/>}/>
            </View>
            <View style={{position: 'relative', backgroundColor: 'rgba(0,0,0,0)'}}>
                <CustomInput type="chat" placeholder="Digite sua mensagem" value={messageInput} onChangeText={text => setMessageInput(text)}/>
                                
                <Pressable style={{position: 'absolute', right: 8, top: 8, padding: 8}} onPress={btnSendMessage}>
                    <Ionicons name="send" size={30} color={textGreen}/>
                </Pressable>

            </View>
        </View>
    )
}

const st = StyleSheet.create({
    containerGeneral: {
        flex: 1,
    },
    headerRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: 10,
        top: 0,
        marginBottom: 15
    }
})

export default Chats