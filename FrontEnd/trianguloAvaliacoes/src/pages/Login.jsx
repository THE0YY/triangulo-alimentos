import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { enderecoServidor } from "../utils";
import './Login.css';

import {
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("geraldo.alq@email.com");
  const [senha, setSenha] = useState("SenhaSemCriptografia");
  const [mensagem, setMensagem] = useState("");

  const [lembrar, setLembrar] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  async function botaoEntrar(event) {
    event.preventDefault();

    try {
      if (email === "" || senha === "") {
        setMensagem("Preencha email e senha do administrador");
        return;
      }

      const dadosLogin = { email, senha };

      const resposta = await fetch(`${enderecoServidor}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        localStorage.setItem(
          "UsuarioLogado",
          JSON.stringify({...dados, lembrar })
        );

        navigate("/principal");
      } else {
        setMensagem("❌ Email ou senha incorretos");
      }
    } catch (error) {
      setMensagem(`Erro ao realizar login: ${error.message}`);
    }
  }

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("UsuarioLogado");
    if (usuarioLogado) {
      const usuario = JSON.parse(usuarioLogado);
      if (usuario.lembrar === true) navigate("/principal");
    }
  }, [navigate]);

  return (
    <div className="login-page">
      <header className="header">
        <div className="header-info">
          <h1>Triângulo Avaliações</h1>
          <p>Onde sua opinião importa</p>
        </div>
      </header>

      <main className="main">
        <form className="login-form" onSubmit={botaoEntrar}>
          <div className="form-title">Acesse sua conta</div>

          {/* Apenas administrador */}

          <div className="field">
            <div className="input-group">
              <MdEmail />
              <input
                className="input"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <div className="input-group">
              <MdLock />
              <input
                className="input"
                type={mostrarSenha ? "text" : "password"}
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <button type="button" className="show-pass" onClick={() => setMostrarSenha(!mostrarSenha)}>
                {mostrarSenha ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>
          </div>

          <div className="options">
            <label className="checkbox">
              <input type="checkbox" checked={lembrar} onChange={(e) => setLembrar(e.target.checked)} />
              <span>Lembrar-me</span>
            </label>

            <a href="#">Esqueci a senha</a>
          </div>

          {mensagem && <div className="error">{mensagem}</div>}

          <button className="btn-primary" type="submit">Entrar</button>
        </form>
      </main>
    </div>
  );
}