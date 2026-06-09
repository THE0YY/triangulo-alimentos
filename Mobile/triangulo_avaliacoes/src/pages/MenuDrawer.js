import { createDrawerNavigator } from '@react-navigation/drawer'
import { View, Text, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Principal from './Principal'

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    const [dadosLogin, setDadosLogin] = useState(null)

    useEffect(() => {
        async function buscarUsuario() {
            try {
                const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado')
                if (usuarioLogado != null) {
                    setDadosLogin(JSON.parse(usuarioLogado))
                }
            } catch (error) {
                console.error('Erro ao buscar usuário:', error)
            }
        }
        buscarUsuario()
    }, [])

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 14, color: '#666', marginBottom: 20 }}>
                Usuário: {dadosLogin?.usuario?.nome ?? dadosLogin?.usuario?.email ?? 'Carregando...'}
            </Text>
        </View>
    )
}

export default function MenuDrawer() {
    async function botaoLogout(navigation) {
        try {
            await AsyncStorage.removeItem('UsuarioLogado')
            navigation.navigate('Login')
        } catch (error) {
            console.error('Erro ao fazer logout:', error)
        }
    }

    return (
        <Drawer.Navigator
            drawerContent={CustomDrawerContent}
            screenOptions={({ navigation }) => ({
                headerShown: true,
                drawerLabelStyle: { fontSize: 14 },
                headerRight: () => (
                    <TouchableOpacity 
                        onPress={() => botaoLogout(navigation)}
                        style={{ 
                            marginRight: 15, 
                            paddingVertical: 8,
                            paddingHorizontal: 12,
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 4
                        }}
                    >
                        <Text style={{ fontSize: 14, color: '#333', fontWeight: '500' }}>Sair</Text>
                    </TouchableOpacity>
                ),
            })}
        >
            <Drawer.Screen 
                name="Principal" 
                component={Principal}
                options={{
                    title: 'FinanControl',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />
        </Drawer.Navigator>
    )
}