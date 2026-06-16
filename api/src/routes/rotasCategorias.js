import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";
const SECRET_KEY = 'sua_chave_secreta'
import jwt from "jsonwebtoken";

const router = Router();

// Listar todas as categorias
router.get('/categorias', autenticarToken, async (req, res) => {
    try {
        const comando = `SELECT * FROM categorias`;
        const categorias = await BD.query(comando);

        return res.status(200).json(categorias.rows);
    } catch (error) {
        console.error('Erro ao listar categorias', error.message);
        return res.status(500).json({
            error: 'Erro ao listar categorias'
        });
    }
});

// Cadastrar nova categoria
router.post('/categorias', autenticarToken, async (req, res) => {
    const { nome, descricao } = req.body;

    try {
        const comando = `
            INSERT INTO categorias (nome, descricao)
            VALUES ($1, $2)
        `;

        const valores = [nome, descricao];

        await BD.query(comando, valores);

        return res.status(201).json({
            message: 'Categoria cadastrada com sucesso.'
        });

    } catch (error) {
        console.error('Erro ao cadastrar categoria', error.message);
        return res.status(500).json({
            error: 'Erro ao cadastrar categoria'
        });
    }
});

// Atualizar categoria completamente (PUT)
router.put('/categorias/:id_categoria', autenticarToken, async (req, res) => {
    const { id_categoria } = req.params;
    const { nome, descricao } = req.body;

    try {
        const verificarCategoria = await BD.query(
            `SELECT * FROM categorias WHERE id_categoria = $1`,
            [id_categoria]
        );

        if (verificarCategoria.rows.length === 0) {
            return res.status(404).json({
                message: 'Categoria não encontrada com esse ID'
            });
        }

        const comando = `
            UPDATE categorias
            SET nome = $1,
                descricao = $2
            WHERE id_categoria = $3
        `;

        const valores = [nome, descricao, id_categoria];

        await BD.query(comando, valores);

        return res.status(200).json({
            message: 'Categoria atualizada com sucesso!'
        });

    } catch (error) {
        console.error('Erro ao atualizar categoria', error.message);
        return res.status(500).json({
            error: 'Erro ao atualizar categoria'
        });
    }
});

// Excluir categoria
router.delete('/categorias/:id_categoria', autenticarToken, async (req, res) => {
    const { id_categoria } = req.params;

    try {
        const verificarCategoria = await BD.query(
            `SELECT * FROM categorias WHERE id_categoria = $1`,
            [id_categoria]
        );

        if (verificarCategoria.rows.length === 0) {
            return res.status(404).json({
                message: 'Categoria não encontrada'
            });
        }

        await BD.query(
            `DELETE FROM categorias WHERE id_categoria = $1`,
            [id_categoria]
        );

        return res.status(200).json({
            message: 'Categoria removida com sucesso'
        });

    } catch (error) {
    console.error("Erro ao remover avaliação de setor:", error);

    if (error.code === '22P02') {
        return res.status(400).json({
            message: "O ID da avaliação informado é inválido."
        });
    }

    return res.status(500).json({
        message: "Não foi possível remover a avaliação do setor.",
        detalhe: error.message
    });
}
});

export default router;