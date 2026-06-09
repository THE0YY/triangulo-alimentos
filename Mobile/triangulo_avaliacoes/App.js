import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './src/pages/Login.js'
import Principal from './src/pages/Principal.js'
import Avaliar from './src/pages/Avaliar.js'

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Avaliar' component={Avaliar} options={{headerShown:false}}  />
                <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
                <Stack.Screen name='Principal' component={Principal} options={{headerShown:false}}  />
            </Stack.Navigator>
        </NavigationContainer>
    )
} 