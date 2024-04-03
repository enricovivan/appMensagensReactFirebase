import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './views/Login';
import Home from './views/Home';
import Chats from './views/Chats';
import Register from './views/Register';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='login' screenOptions={{
        animation: 'default',
        headerShown: false
      }}>
        <Stack.Screen name='login' component={Login}/>
        <Stack.Screen name='home' component={Home}/>
        <Stack.Screen name='chats' component={Chats}/>
        <Stack.Screen name='register' component={Register}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
