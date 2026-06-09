import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Principal({ navigation }) {
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

    const estilos = {
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        topoUsuario: {
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            backgroundColor: '#f5f5f5',
        },
        nomeUsuario: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#333',
        },
        conteudo: {
            flex: 1,
            padding: 20,
        },
    }

    return (
        <View style={estilos.container}>
            <View style={estilos.topoUsuario}>
                <Text style={estilos.nomeUsuario}>
                    Usuário: {dadosLogin?.usuario?.nome ?? dadosLogin?.usuario?.email ?? 'Carregando...'}
                </Text>
            </View>

            <View style={estilos.conteudo}>
                {/* Conteúdo principal da página */}
            </View>
        </View>
    )
}