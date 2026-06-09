import { useState } from "react"
import { enderecoServidor } from "../utils"
import { useNavigate } from "react-router-dom"

export default function AvaliarSetor() {
    const [idSetor, setIdSetor] = useState()
    const [nota, setNota] = useState()
    const [comentario, setComentario] = useState('')
    const [email, setEmail] = useState('')

    const [mensagem, setMensagem] = useState('')

    async function botaoAvaliar() {
        if (nota == undefined) {
            setMensagem('Inserir uma nota é obrigatorio')
        }
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
        console.log(resposta);
        setIdSetor('')
        setEmail('')
        setNota('')
        setComentario('')
    }

    return (
        <div style={{
            gap: 10,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            padding: 30,
            backgroundColor: '#fff',
            color: '#003B73',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div>
                <div style={{ display: 'flex', flexDirection: 'column', color: '#003B73' }} >
                    <h1 style={{ textAlign: 'center', marginBottom: 25 }}>Avalie nosso setor!</h1>
                    <label style={{ fontWeight: 'bold', color: '#0057A8' }}>Setor</label>
                    <input placeholder="Digite o id do setor" style={{ width: 400, borderRadius: 8, border: '1px solid #0057A8', padding: 8, backgroundColor: '#f4f7fb', color: '#003B73' }} value={idSetor} onChange={(e) => setIdSetor(e.target.value)} />
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', color: '#003B73' }} >
                <label style={{ fontWeight: 'bold', color: '#0057A8' }}>Nota</label>
                <input placeholder="Qual nota você daria para este setor?" style={{ width: 400, borderRadius: 8, border: '1px solid #0057A8', padding: 8, backgroundColor: '#f4f7fb', color: '#003B73' }} value={nota} onChange={(e) => setNota(e.target.value)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', color: '#003B73' }} >
                <label style={{ fontWeight: 'bold', color: '#0057A8' }}>Comentario</label>
                <input placeholder="Deixe seu comentário(opcional)" style={{ width: 400, borderRadius: 8, border: '1px solid #0057A8', padding: 8, backgroundColor: '#f4f7fb', color: '#003B73' }} value={comentario} onChange={(e) => setComentario(e.target.value)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', color: '#003B73' }} >
                <label style={{ fontWeight: 'bold', color: '#0057A8' }}>Email</label>
                <input placeholder="Informe seu email" style={{ width: 400, borderRadius: 8, border: '1px solid #0057A8', padding: 8, backgroundColor: '#f4f7fb', color: '#003B73' }} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button style={{ backgroundColor: '#FFC72C', borderRadius: 15, border: '1px solid #003B73', padding: 10, width: 140, textAlign: "center", color: '#003B73', fontWeight: 'bold' }} onClick={botaoAvaliar}>
                Enviar Avaliação
            </button>
            <h3 style={{ color: '#D71920' }}>{mensagem}</h3>
        </div>
    )
}