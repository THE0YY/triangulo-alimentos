import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";
const SECRET_KEY = 'sua_chave_secreta'
import jwt from "jsonwebtoken";

const router = Router();

// Listar todos os produtos
router.get('/produtos', autenticarToken, async (req, res) => {
    try {
        const comando = `
            SELECT
                p.*,
                c.nome AS categoria,
                a.nome AS administrador
            FROM produtos p
            INNER JOIN categorias c
                ON p.id_categoria = c.id_categoria
            INNER JOIN administradores a
                ON p.id_administrador = a.id_administrador
        `;

        const produtos = await BD.query(comando);

        return res.status(200).json(produtos.rows);
    }catch (error) {
    console.error('Erro ao listar produtos', error);

    return res.status(500).json({
        message: 'Não foi possível carregar a lista de produtos.',
        detalhe: error.message
    });
}
});

// Cadastrar novo produto
router.post('/produtos', autenticarToken, async (req, res) => {
    const {
        id_categoria,
        id_administrador,
        nome,
        descricao,
        imagem_produto
    } = req.body;

    try {
        const comando = `
            INSERT INTO produtos
            (
                id_categoria,
                id_administrador,
                nome,
                descricao,
                imagem_produto
            )
            VALUES ($1, $2, $3, $4, $5)
        `;

        const valores = [
            id_categoria,
            id_administrador,
            nome,
            descricao,
            imagem_produto
        ];

        await BD.query(comando, valores);

        return res.status(201).json({
            message: 'Produto cadastrado com sucesso.'
        });

    } catch (error) {
    console.error('Erro ao cadastrar produto', error);

    if (error.code === '23503') {
        return res.status(400).json({
            message: 'A categoria ou administrador informado não existe.'
        });
    }

    if (error.code === '23502') {
        return res.status(400).json({
            message: 'Existem campos obrigatórios não preenchidos.'
        });
    }

    if (error.code === '22P02') {
        return res.status(400).json({
            message: 'Um ou mais campos foram enviados em formato inválido.'
        });
    }

    return res.status(500).json({
        message: 'Não foi possível cadastrar o produto.',
        detalhe: error.message
    });
}
});

// Atualizar produto completamente (PUT)
router.put('/produtos/:id_produto', autenticarToken, async (req, res) => {
    const { id_produto } = req.params;

    const {
        id_categoria,
        id_administrador,
        nome,
        descricao,
        imagem_produto
    } = req.body;

    try {
        const verificarProduto = await BD.query(
            `SELECT * FROM produtos WHERE id_produto = $1`,
            [id_produto]
        );

        if (verificarProduto.rows.length === 0) {
            return res.status(404).json({
            message: `Nenhum produto foi encontrado com o ID ${id_produto}.`
            });
        }

        const comando = `
            UPDATE produtos
            SET
                id_categoria = $1,
                id_administrador = $2,
                nome = $3,
                descricao = $4,
                imagem_produto = $5
            WHERE id_produto = $6
        `;

        const valores = [
            id_categoria,
            id_administrador,
            nome,
            descricao,
            imagem_produto,
            id_produto
        ];

        await BD.query(comando, valores);

        return res.status(200).json({
            message: 'Produto atualizado com sucesso!'
        });

    } catch (error) {
    console.error('Erro ao atualizar produto', error);

    if (error.code === '23503') {
        return res.status(400).json({
            message: 'A categoria ou administrador informado não existe.'
        });
    }

    if (error.code === '23502') {
        return res.status(400).json({
            message: 'Existem campos obrigatórios não preenchidos.'
        });
    }

    if (error.code === '22P02') {
        return res.status(400).json({
            message: 'O ID do produto informado é inválido.'
        });
    }

    return res.status(500).json({
        message: 'Não foi possível atualizar o produto.',
        detalhe: error.message
    });
}
});

// Excluir produto
router.delete('/produtos/:id_produto', autenticarToken, async (req, res) => {
    const { id_produto } = req.params;

    try {
        const verificarProduto = await BD.query(
            `SELECT * FROM produtos WHERE id_produto = $1`,
            [id_produto]
        );

        if (verificarProduto.rows.length === 0) {
            return res.status(404).json({
            message: `Nenhum produto foi encontrado com o ID ${id_produto}.`
            });
        }

        await BD.query(
            `DELETE FROM produtos WHERE id_produto = $1`,
            [id_produto]
        );

        return res.status(200).json({
            message: 'Produto removido com sucesso'
        });

    } catch (error) {
        console.error('Erro ao remover produto', error.message);
        return res.status(500).json({
            message: 'Erro interno do servidor: ' + error.message
        });
    }
});

export default router;