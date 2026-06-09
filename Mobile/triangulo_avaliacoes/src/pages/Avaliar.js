import { useState } from "react"
import { TouchableOpacity } from "react-native"
import { Text, TextInput, View, Switch, Picker } from "react-native-web"
import { enderecoServidor } from "../utils"
import { ViewBase } from "react-native"

export default function Avaliar( { navigation } ) {
    const [tipoAvaliacao, setTipoAvaliacao] = useState(false)
    
    const [idProduto, setIdProduto] = useState()
    const [idSetor, setIdSetor] = useState()
    const [nota, setNota] = useState()
    const [comentario, setComentario] = useState('')
    const [email, setEmail] = useState('')

    const [mensagem, setMensagem] = useState('')

    async function botaoAvaliar() {
        if (nota == undefined) {
            setMensagem('Inserir uma nota é obrigatorio')
        }

        if (tipoAvaliacao == false) { //^ PRODUTO
            const resposta = await fetch(`${enderecoServidor}/avaliacoes-produtos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_produto: idProduto,
                    nota: nota,
                    comentario: comentario,
                    email: email
                })
            })
            console.log(resposta);
        }else if (tipoAvaliacao == true) { //^ SETOR
            const resposta = await fetch(`${enderecoServidor}/avaliacoes-setores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_setor: idSetor,
                    nota: nota,
                    comentario: comentario,
                    email: email
                })
            })
            console.log(resposta);
        }

        
    }

    return (
        <View style={{}}>
            <View>
                <Switch value={tipoAvaliacao} onValueChange={setTipoAvaliacao} />
                {
                    tipoAvaliacao ? (
                        <View>
                            <Text>Setor</Text>
                            <TextInput value={idSetor} onChangeText={setIdSetor} />
                        </View>
                    ) : (
                        <View>
                            <Text>Produto</Text>
                            <TextInput value={idProduto} onChangeText={setIdProduto} />
                        </View>
                    )
                }
                </View>
            <View>
                <Text>Nota</Text>
                <TextInput value={nota} onChangeText={setNota} />
            </View>
            <View>
                <Text>Comentario</Text>
                <TextInput value={comentario} onChangeText={setComentario} />
            </View>
            <View>
                <Text>Email</Text>
                <TextInput value={email} onChangeText={setEmail} />
            </View>
            <TouchableOpacity  onPress={botaoAvaliar}>
                <Text style={{backgroundColor: '#ddd', borderRadius: 15, border: 'solid', borderColor: '#de2f2f', padding: 10, width: 100, textAlign: "center"}} >Avaliar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{backgroundColor: '#ddd', borderRadius: 15, border: 'solid', borderColor: '#de2f2f', padding: 10, width: 100, textAlign: "center"}}>Login</Text>
            </TouchableOpacity>
            <Text>{mensagem}</Text>
        </View>
    )
}