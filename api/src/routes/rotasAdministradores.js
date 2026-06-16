import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";
const SECRET_KEY = 'sua_chave_secreta'
import jwt from "jsonwebtoken";

const router = Router();

// Listar todos os administradores
router.get('/administradores', autenticarToken, async (req, res) => {
    try {
        const comando = `SELECT id_administrador, nome, email FROM administradores`;
        const administradores = await BD.query(comando);

        return res.status(200).json(administradores.rows);
    }catch (error) {
    console.error('Erro ao listar administradores', error);

    return res.status(500).json({
        message: 'Não foi possível listar os administradores.',
        detalhe: error.message
    });
}
});

// Cadastrar novo administrador
router.post('/administradores', async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
    return res.status(400).json({
        message: 'Os campos nome, email e senha são obrigatórios.'
    });
}

    try {
        const comando = `
            INSERT INTO administradores (nome, email, senha)
            VALUES ($1, $2, $3)
        `;

        const valores = [nome, email, senha];

        await BD.query(comando, valores);

        return res.status(201).json({
            message: 'Administrador cadastrado com sucesso.'
        });

    } catch (error) {
    console.error('Erro ao cadastrar administrador', error.message);

    if (error.code === '23505') {
        return res.status(409).json({
            message: 'Já existe um administrador cadastrado com este e-mail.'
        });
    }

    if (error.code === '23502') {
        return res.status(400).json({
            message: 'Existem campos obrigatórios não preenchidos.'
        });
    }

    return res.status(500).json({
        message: 'Não foi possível cadastrar o administrador.',
        detalhe: error.message
    });
}
});

// Atualizar administrador completamente (PUT)
router.put('/administradores/:id_administrador', autenticarToken, async (req, res) => {
    const { id_administrador } = req.params;
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
    return res.status(400).json({
        message: 'Para atualização completa é necessário informar nome, email e senha.'
    });
}

    try {
        const verificarAdministrador = await BD.query(
            `SELECT * FROM administradores WHERE id_administrador = $1`,
            [id_administrador]
        );

        if (verificarAdministrador.rows.length === 0) {
            return res.status(404).json({
            message: `Nenhum administrador encontrado com o ID ${id_administrador}.`
            });
        }

        const comando = `
            UPDATE administradores
            SET nome = $1,
                email = $2,
                senha = $3
            WHERE id_administrador = $4
        `;

        const valores = [nome, email, senha, id_administrador];

        await BD.query(comando, valores);

        return res.status(200).json({
            message: 'Administrador atualizado com sucesso!'
        });

    }catch (error) {
    console.error('Erro ao atualizar administrador', error.message);

    if (error.code === '23505') {
        return res.status(409).json({
            message: 'O e-mail informado já está sendo utilizado por outro administrador.'
        });
    }

    if (error.code === '22P02') {
        return res.status(400).json({
            message: 'O ID informado é inválido.'
        });
    }

    return res.status(500).json({
        message: 'Falha ao atualizar o administrador.',
        detalhe: error.message
    });
}
});

// Excluir administrador
router.delete('/administradores/:id_administrador', autenticarToken, async (req, res) => {
    const { id_administrador } = req.params;

    try {
        const verificarAdministrador = await BD.query(
            `SELECT * FROM administradores WHERE id_administrador = $1`,
            [id_administrador]
        );

        if (verificarAdministrador.rows.length === 0) {
            return res.status(404).json({
                message: `Nenhum administrador encontrado com o ID ${id_administrador}.`
            });
        }

        const comando = `
            DELETE FROM administradores
            WHERE id_administrador = $1
        `;

        await BD.query(comando, [id_administrador]);

        return res.status(200).json({
            message: 'Administrador removido com sucesso'
        });

    } catch (error) {
    console.error('Erro ao remover administrador', error.message);

    if (error.code === '23503') {
        return res.status(409).json({
            message: 'Este administrador não pode ser removido porque possui registros vinculados.'
        });
    }

    if (error.code === '22P02') {
        return res.status(400).json({
            message: 'O ID informado é inválido.'
        });
    }

    return res.status(500).json({
        message: 'Não foi possível remover o administrador.',
        detalhe: error.message
    });
}
});

router.post('/login', async(req, res) =>{
    const {email, senha} = req.body;

    //Validação de entrada
    if(!email || !senha){
        return res.status(400).json({message: 'Informe email e senha para realizar o login.'})
    }
    try{
        //Buscar usuario pelo email
        const comando = 'SELECT id_administrador, nome, email, senha FROM administradores WHERE email = $1'
        const resultado = await BD.query(comando, [email]);

        if(resultado.rows.length === 0) {
            return res.status(401).json({message: 'Nenhuma conta foi encontrada com o e-mail informado.'})
        }

        const usuario = resultado.rows[0]

        //Verifica senha se são iguais
        // Gerando e retornando o token
        // Gerar token com os dados do usuario logado
            // {expiresIn: "15m"} // Expira em 15 minutos
        const token = jwt.sign(
            {id_administrador: usuario.id_administrador, email: usuario.email},
            SECRET_KEY,
            // {expiresIn: "15m"} // Expira em 15 minutos
        )

        return res.status(200).json({
            message: 'Login realizado com sucesso',
            usuario: {
                id_administrador: usuario.id_administrador,
                token: token,
                nome: usuario.nome,
                email: usuario.email
            }
        })
        
        return res.status(200).json({
            message: 'Login realizado com sucesso',
            usuario: {
                id_administrador: usuario.id_administrador,
                nome: usuario.nome,
                email: usuario.email
            }
        })
    }catch(error){
    console.error('Erro ao realizar login', error.message);
    return res.status(500).json({
        message: 'Erro ao processar a solicitação de login.',
        detalhe: error.message
    });
}
})


export default router;