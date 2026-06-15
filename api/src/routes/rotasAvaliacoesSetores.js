import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";
const SECRET_KEY = 'sua_chave_secreta'
import jwt from "jsonwebtoken";

const router = Router();

// LISTAR
router.get("/avaliacoes-setores", autenticarToken, async (req, res) => {
    try {
        const result = await BD.query(`
            SELECT 
                a.id_avaliacao,
                a.id_setor,
                s.estado,
                s.cidade,
                a.nota,
                a.comentario,
                a.email
            FROM avaliacoes_setores a
            INNER JOIN setores s ON s.id_setor = a.id_setor
        `);

        return res.status(200).json(result.rows);
    }catch (error) {
    console.error("Erro ao listar avaliações de setores:", error);

    return res.status(500).json({
        message: "Não foi possível carregar a lista de avaliações dos setores.",
        detalhe: error.message
    });
}
});

// CADASTRAR
router.post("/avaliacoes-setores", async (req, res) => {
    const { id_setor, nota, comentario, email } = req.body;

    try {
        await BD.query(
            `INSERT INTO avaliacoes_setores (id_setor, nota, comentario, email)
            VALUES ($1, $2, $3, $4)`,
            [id_setor, nota, comentario, email]
        );

        return res.status(201).json({ message: "Avaliação de setor cadastrada" });
    } catch (error) {
    console.error("Erro ao cadastrar avaliação de setor:", error);

    if (error.code === '23503') {
        return res.status(400).json({
            message: "O setor informado não existe."
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
        message: "Não foi possível cadastrar a avaliação do setor.",
        detalhe: error.message
    });
}
});

// DELETE
router.delete("/avaliacoes-setores/:id", autenticarToken, async (req, res) => {
    try {
        await BD.query(`DELETE FROM avaliacoes_setores WHERE id_avaliacao = $1`, [
            req.params.id
        ]);

        return res.status(200).json({ message: "Removido com sucesso" });
    } catch (error) {
    console.error("Erro ao cadastrar avaliação de setor:", error);

    if (error.code === '23503') {
        return res.status(400).json({
            message: "O setor informado não existe."
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
        message: "Não foi possível cadastrar a avaliação do setor.",
        detalhe: error.message
    });
}
});

export default router;