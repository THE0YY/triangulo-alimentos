import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";
const SECRET_KEY = 'sua_chave_secreta'
import jwt from "jsonwebtoken";

const router = Router();

// Listar todos os setores
router.get('/setores', autenticarToken, async (req, res) => {
    try {
        const comando = `SELECT * FROM setores`;
        const setores = await BD.query(comando);

        return res.status(200).json(setores.rows);
    } catch (error) {
    console.error('Erro ao listar setores', error);

    return res.status(500).json({
        message: 'Não foi possível carregar a lista de setores.',
        detalhe: error.message
    });
}
});

// Cadastrar novo setor
router.post('/setores', autenticarToken, async (req, res) => {
    const { estado, cidade } = req.body;

    try {
        const comando = `
            INSERT INTO setores (estado, cidade)
            VALUES ($1, $2)
        `;

        const valores = [estado, cidade];

        await BD.query(comando, valores);

        return res.status(201).json({
            message: 'Setor cadastrado com sucesso.'
        });

    } catch (error) {
    console.error('Erro ao cadastrar setor', error);

    if (error.code === '23502') {
        return res.status(400).json({
            message: 'Os campos estado e cidade são obrigatórios.'
        });
    }

    if (error.code === '22P02') {
        return res.status(400).json({
            message: 'Um ou mais campos foram enviados em formato inválido.'
        });
    }

    return res.status(500).json({
        message: 'Não foi possível cadastrar o setor.',
        detalhe: error.message
    });
}
});

// Atualizar setor completamente (PUT)
router.put('/setores/:id_setor', autenticarToken, async (req, res) => {
    const { id_setor } = req.params;
    const { estado, cidade } = req.body;

    try {
        const verificarSetor = await BD.query(
            `SELECT * FROM setores WHERE id_setor = $1`,
            [id_setor]
        );

        if (verificarSetor.rows.length === 0) {
            return res.status(404).json({
                message: `Nenhum setor foi encontrado com o ID ${id_setor}.`
            });
        }

        const comando = `
            UPDATE setores
            SET estado = $1,
                cidade = $2
            WHERE id_setor = $3
        `;

        const valores = [estado, cidade, id_setor];

        await BD.query(comando, valores);

        return res.status(200).json({
            message: 'Setor atualizado com sucesso!'
        });

    } catch (error) {
    console.error('Erro ao atualizar setor', error);

    if (error.code === '23502') {
        return res.status(400).json({
            message: 'Os campos estado e cidade são obrigatórios para atualização completa.'
        });
    }

    if (error.code === '22P02') {
        return res.status(400).json({
            message: 'O ID do setor informado é inválido.'
        });
    }

    return res.status(500).json({
        message: 'Não foi possível atualizar o setor.',
        detalhe: error.message
    });
}
});

// Atualizar setor parcialmente (PATCH)
router.patch('/setores/:id_setor', autenticarToken, async (req, res) => {
    const { id_setor } = req.params;
    const { estado, cidade } = req.body;

    try {
        const verificarSetor = await BD.query(
            `SELECT * FROM setores WHERE id_setor = $1`,
            [id_setor]
        );

        if (verificarSetor.rows.length === 0) {
            return res.status(404).json({
                message: `Nenhum setor foi encontrado com o ID ${id_setor}.`
            });
        }

        const campos = [];
        const valores = [];
        let contador = 1;

        if (estado !== undefined) {
            campos.push(`estado = $${contador}`);
            valores.push(estado);
            contador++;
        }

        if (cidade !== undefined) {
            campos.push(`cidade = $${contador}`);
            valores.push(cidade);
            contador++;
        }

        if (campos.length === 0) {
            return res.status(400).json({
            message: 'Informe pelo menos um dos campos: estado ou cidade.'
            });
        }

        valores.push(id_setor);

        const comando = `
            UPDATE setores
            SET ${campos.join(', ')}
            WHERE id_setor = $${contador}
        `;

        await BD.query(comando, valores);

        return res.status(200).json({
            message: 'Setor atualizado com sucesso!'
        });

    }catch (error) {
    console.error('Erro ao atualizar setor', error);

    if (error.code === '22P02') {
        return res.status(400).json({
            message: 'O ID do setor informado é inválido.'
        });
    }

    return res.status(500).json({
        message: 'Não foi possível atualizar os dados do setor.',
        detalhe: error.message
    });
}
});

// Excluir setor
router.delete('/setores/:id_setor', autenticarToken, async (req, res) => {
    const { id_setor } = req.params;

    try {
        const verificarSetor = await BD.query(
            `SELECT * FROM setores WHERE id_setor = $1`,
            [id_setor]
        );

        if (verificarSetor.rows.length === 0) {
            return res.status(404).json({
                message: `Nenhum setor foi encontrado com o ID ${id_setor}.`
            });
        }

        await BD.query(
            `DELETE FROM setores WHERE id_setor = $1`,
            [id_setor]
        );

        return res.status(200).json({
            message: 'Setor removido com sucesso'
        });

    } catch (error) {
    console.error('Erro ao remover setor', error);

    if (error.code === '23503') {
        return res.status(409).json({
            message: 'Este setor não pode ser removido porque possui avaliações ou registros vinculados.'
        });
    }

    if (error.code === '22P02') {
        return res.status(400).json({
            message: 'O ID do setor informado é inválido.'
        });
    }

    return res.status(500).json({
        message: 'Não foi possível remover o setor.',
        detalhe: error.message
    });
}
});

export default router;