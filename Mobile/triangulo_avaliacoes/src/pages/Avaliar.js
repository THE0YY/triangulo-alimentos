import { useState } from "react"
import { TouchableOpacity, Text, TextInput, View} from "react-native"
import { enderecoServidor } from "../utils"

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
        <View style={{width: 350, shadowColor: '#333', shadowOffset: {height: 10, width: 7}, shadowOpacity: 0.12, shadowRadius: 10, borderRadius: 18, padding: 20, marginHorizontal: 'auto', marginVertical: 'auto', backgroundColor: '#e7ebfb60'}}>
            <View >
                {/* <Switch value={tipoAvaliacao} onValueChange={setTipoAvaliacao} /> */}
                {/* {
                    tipoAvaliacao ? (
                        <View>
                            <Text>Setor</Text>
                            <TextInput style={{backgroundColor: '#ddd'}} value={idSetor} onChangeText={setIdSetor} />
                        </View>
                    ) : (
                    )
                } */}
                <Text style={{fontSize: 20, fontWeight: "bold", textAlign: "center", marginVertical: 15}}>Avalie nosso produto!</Text>
                        <View>
                            <Text style={{fontWeight: "bold", color: '#0057a8'}}>Produto*</Text>
                            <TextInput placeholder="Digite o id do produto" placeholderTextColor={'#005f7f'} style={{padding: 7,backgroundColor: '#f4f7fb', border: 'solid', borderColor: '#0057a8', color: '#003b73', borderRadius: 10}} value={idProduto} onChangeText={setIdProduto} />
                        </View>
                </View>
            <View>
                <Text style={{fontWeight: "bold", color: '#0057a8'}}>Nota*</Text>
                <TextInput placeholder="Qual nota você daria para este produto?" placeholderTextColor={'#005f7f'} style={{padding: 7,backgroundColor: '#f4f7fb', border: 'solid', borderColor: '#0057a8', color: '#003b73', borderRadius: 10}} value={nota} onChangeText={setNota} />
            </View>
            <View>
                <Text style={{fontWeight: "bold", color: '#0057a8'}}>Comentario</Text>
                <TextInput placeholder="Deixe um comentario(opcional)" placeholderTextColor={'#005f7f'} style={{padding: 7,backgroundColor: '#f4f7fb', border: 'solid', borderColor: '#0057a8', color: '#003b73', borderRadius: 10}} value={comentario} onChangeText={setComentario} />
            </View>
            <View>
                <Text style={{fontWeight: "bold", color: '#0057a8'}}>Email</Text>
                <TextInput placeholder="Informe seu email" placeholderTextColor={'#005f7f'} style={{padding: 7,backgroundColor: '#f4f7fb', border: 'solid', borderColor: '#0057a8', color: '#003b73', borderRadius: 10}} value={email} onChangeText={setEmail} />
            </View>
            <TouchableOpacity style={{backgroundColor: '#ffc72c', borderRadius: 15, border: 'solid', borderColor: '#003b73', padding: 10, width: '100%', marginTop: 10}} onPress={botaoAvaliar}>
                <Text style={{textAlign: "center", fontWeight: "bold", color: "#003b73"}} >Enviar Avaliação</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{backgroundColor: '#ddd', borderRadius: 15, border: 'solid', borderColor: '#de2f2f', padding: 10, width: 100, textAlign: "center"}}>Login</Text>
            </TouchableOpacity> */}
            <Text>{mensagem}</Text>
        </View>
    )
}