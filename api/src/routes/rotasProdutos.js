import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

// Listar todos os produtos
router.get('/produtos', async (req, res) => {
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
router.post('/produtos', async (req, res) => {
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
router.put('/produtos/:id_produto', async (req, res) => {
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

// Atualizar produto parcialmente (PATCH)
router.patch('/produtos/:id_produto', async (req, res) => {
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
                message: 'Produto não encontrado'
            });
        }

        const campos = [];
        const valores = [];
        let contador = 1;

        if (id_categoria !== undefined) {
            campos.push(`id_categoria = $${contador}`);
            valores.push(id_categoria);
            contador++;
        }

        if (id_administrador !== undefined) {
            campos.push(`id_administrador = $${contador}`);
            valores.push(id_administrador);
            contador++;
        }

        if (nome !== undefined) {
            campos.push(`nome = $${contador}`);
            valores.push(nome);
            contador++;
        }

        if (descricao !== undefined) {
            campos.push(`descricao = $${contador}`);
            valores.push(descricao);
            contador++;
        }

        if (imagem_produto !== undefined) {
            campos.push(`imagem_produto = $${contador}`);
            valores.push(imagem_produto);
            contador++;
        }

        if (campos.length === 0) {
            return res.status(400).json({
                message: 'Informe pelo menos um campo para atualização.'
            });
        }

        valores.push(id_produto);

        const comando = `
            UPDATE produtos
            SET ${campos.join(', ')}
            WHERE id_produto = $${contador}
        `;

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

    if (error.code === '22P02') {
        return res.status(400).json({
            message: 'O ID do produto informado é inválido.'
        });
    }

    return res.status(500).json({
        message: 'Não foi possível atualizar os dados do produto.',
        detalhe: error.message
    });
}
});

// Excluir produto
router.delete('/produtos/:id_produto', async (req, res) => {
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