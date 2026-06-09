import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

// LISTAR
router.get("/avaliacoes-produtos", async (req, res) => {
    try {
        const result = await BD.query(`
            SELECT 
                a.id_avaliacao,
                a.id_produto,
                p.nome AS produto,
                a.nota,
                a.comentario,
                a.email
            FROM avaliacoes_produtos a
            INNER JOIN produtos p ON p.id_produto = a.id_produto
        `);

        return res.status(200).json(result.rows);
    }catch (error) {
    console.error("Erro ao listar avaliações de produtos:", error);
    return res.status(500).json({
        message: "Não foi possível carregar a lista de avaliações dos produtos.",
        detalhe: error.message
    });
}
});

// CADASTRAR
router.post("/avaliacoes-produtos", async (req, res) => {
    const { id_produto, nota, comentario, email } = req.body;

    try {
        await BD.query(
            `INSERT INTO avaliacoes_produtos (id_produto, nota, comentario, email)
            VALUES ($1, $2, $3, $4)`,
            [id_produto, nota, comentario, email]
        );

        return res.status(201).json({ message: "Avaliação de produto cadastrada" });
    } catch (error) {
    console.error("Erro ao cadastrar avaliação de produto:", error);

    if (error.code === '23503') {
        return res.status(400).json({
            message: "O produto informado não existe."
        });
    }

    if (error.code === '23502') {
        return res.status(400).json({
            message: "Existem campos obrigatórios não preenchidos."
        });
    }

    if (error.code === '22P02') {
        return res.status(400).json({
            message: "Um ou mais campos foram enviados em formato inválido."
        });
    }

    return res.status(500).json({
        message: "Não foi possível cadastrar a avaliação do produto.",
        detalhe: error.message
    });
}
});

// DELETE
router.delete("/avaliacoes-produtos/:id", async (req, res) => {
    try {
        await BD.query(`DELETE FROM avaliacoes_produtos WHERE id_avaliacao = $1`, [
            req.params.id
        ]);

        return res.status(200).json({ message: "Removido com sucesso" });
    }catch (error) {
    console.error("Erro ao remover avaliação de produto:", error);

    if (error.code === '22P02') {
        return res.status(400).json({
            message: "O ID da avaliação informado é inválido."
        });
    }

    return res.status(500).json({
        message: "Não foi possível remover a avaliação do produto.",
        detalhe: error.message
    });
}
});

export default router;