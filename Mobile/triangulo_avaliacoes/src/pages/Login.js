import { View, Text, TextInput, TouchableOpacity, Switch, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { enderecoServidor } from '../utils';
import { EstilosLogin } from '../styles/EstilosLogin';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('geraldo.alq@email.com'); //! tirar dps ebaa
    const [senha, setSenha] = useState('SenhaSemCriptografia'); 
    const [mensagem, setMensagem] = useState('');

    const [lembrar, setLembrar] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);

    async function botaoEntrar() {
        try {
            if (email === '' || senha === '') {
                setMensagem('Preencha email e senha do administrador');
                return;
            }

            const dadosLogin = {
                email,
                senha
            };

            const resposta = await fetch(`${enderecoServidor}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosLogin),
            });

            if (resposta.status === 404) {
                setMensagem(`Rota não encontrada: ${resposta.url}`);
                return;
            }

            const dados = await resposta.json();

            if (resposta.status === 500) {
                setMensagem(`Erro no servidor: ${dados.message}`);
                return;
            }

            if (resposta.ok) {
                const dadosComLembrar = {
                    tipoUsuario: 'admin',
                    ...dados,
                    lembrar,
                };

                await AsyncStorage.setItem(
                    'UsuarioLogado',
                    JSON.stringify(dadosComLembrar)
                );

                navigation.navigate('Principal');
            } else {
                setMensagem('❌ Email ou senha incorretos');
            }
        } catch (error) {
            setMensagem(`Erro ao realizar login: ${error.message}`);
        }
    }
    
    return (
        <ScrollView style={EstilosLogin.container}>
            <View style={EstilosLogin.gradiente}>
                {/* Cabeçalho com Triângulo Avaliações */}
                <View style={EstilosLogin.cabecalho}>
                    <View>
                        <Image source={require('../../assets/logo.png')} />
                        <Text style={EstilosLogin.nomeApp}>Triângulo Avaliações</Text>
                        <Text style={EstilosLogin.subtituloApp}>Onde sua opinião importa</Text>
                    </View>
                </View>

                {/* Formulário de login */}
                <View style={EstilosLogin.conteudoPrincipal}>
                    <View style={EstilosLogin.formularioLogin}>
                        <Text style={EstilosLogin.titulo}>Acesse a Dashboard</Text>

                        {/* Email */}
                        <View style={EstilosLogin.grupoInput}>
                            <TextInput
                                placeholder="Digite seu email"
                                placeholderTextColor={EstilosLogin.coresLogin?.placeholder}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                style={EstilosLogin.input}
                            />
                        </View>

                        {/* Senha */}
                        <View style={EstilosLogin.grupoInput}>
                            <TextInput
                                placeholder="Digite sua senha"
                                placeholderTextColor={EstilosLogin.coresLogin?.placeholder}
                                value={senha}
                                onChangeText={setSenha}
                                secureTextEntry={!mostrarSenha}
                                style={EstilosLogin.input}
                            />
                            <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} style={EstilosLogin.alternarVisibilidade}>
                                <Text style={{ fontSize: 18 }}>{mostrarSenha ? '👁️' : '🔒'}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Lembrar-me e Esqueceu a senha */}
                        <View style={EstilosLogin.entreOpcoes}>
                            <View style={EstilosLogin.containerCheckbox}>
                                <Switch
                                    value={lembrar}
                                    onValueChange={setLembrar}
                                    trackColor={{ false: '#d3d3d3', true: 'rgba(0, 87, 168, 0.3)' }}
                                    thumbColor={lembrar ? '#0057A8' : '#f4f3f4'}
                                />
                                <Text style={EstilosLogin.rotuloCheckbox}>Lembrar-me</Text>
                            </View>
                            <Text style={EstilosLogin.esqueceuSenha}>Esqueci a senha</Text>
                        </View>

                        {/* Mensagem de erro */}
                        {mensagem && <Text style={EstilosLogin.mensagemFeedback}>{mensagem}</Text>}

                        {/* Botão Entrar */}
                        <TouchableOpacity onPress={botaoEntrar} style={EstilosLogin.botaoEntrar}>
                            <Text style={EstilosLogin.textoBotaoEntrar}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}