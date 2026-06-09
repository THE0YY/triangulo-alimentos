import { useState } from "react"
import { enderecoServidor } from "../utils"
import { useNavigate } from "react-router-dom"

export default function Avaliar() {
      const navigate = useNavigate();       

    
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
        setIdProduto('')
        setEmail('')
        setNota('')
        setComentario('')
    }

    return (
        <div style={{gap: 10, display: "flex", flexDirection: "column"}}>
            <div>
                <input type="checkbox"
                    checked={tipoAvaliacao}
                    onChange={(e) => setTipoAvaliacao(e.target.checked)}/>
                {
                    tipoAvaliacao ? (
                        <div style={{display: 'flex', flexDirection: 'column'}} >
                            <label>Setor</label>
                            <input style={{width: 400}} value={idSetor} onChange={(e) => setIdSetor(e.target.value)} />
                        </div>
                    ) : (
                        <div style={{display: 'flex', flexDirection: 'column'}} >
                            <label>Produto</label>
                            <input style={{width: 400}} value={idProduto} onChange={(e) => setIdProduto(e.target.value)} />
                        </div>
                    )
                }
                </div>
            <div style={{display: 'flex', flexDirection: 'column'}} >
                <label>Nota</label>
                <input style={{width: 400}} value={nota} onChange={(e) => setNota(e.target.value)} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}} >
                <label>Comentario</label>
                <input style={{width: 400}} value={comentario} onChange={(e) => setComentario(e.target.value)} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}} >
                <label>Email</label>
                <input style={{width: 400}} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button style={{backgroundColor: '#ddd', borderRadius: 15, border: 'solid', borderColor: '#de2f2f', padding: 10, width: 100, textAlign: "center"}}  onClick={botaoAvaliar}>
                <h2  >Avaliar</h2>
            </button>
            <button style={{backgroundColor: '#ddd', borderRadius: 15, border: 'solid', borderColor: '#de2f2f', padding: 10, width: 100, textAlign: "center"}} onClick={() => navigate('/login')}>
                <h2 >Login</h2>
            </button>
            <h3>{mensagem}</h3>
        </div>
    )
}