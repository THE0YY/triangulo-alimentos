import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";
const SECRET_KEY = 'sua_chave_secreta'
import jwt from "jsonwebtoken";

const router = Router();


// ==============================
// RESUMO GERAL
// ==============================
router.get("/dashboard/resumo", autenticarToken, async (req, res) => {
    try {
        const produtos = await BD.query(`SELECT COUNT(*) FROM produtos`);
        const categorias = await BD.query(`SELECT COUNT(*) FROM categorias`);
        const setores = await BD.query(`SELECT COUNT(*) FROM setores`);
        const avaliacoesProdutos = await BD.query(`SELECT COUNT(*) FROM avaliacoes_produtos`);
        const avaliacoesSetores = await BD.query(`SELECT COUNT(*) FROM avaliacoes_setores`);

        return res.status(200).json({
            total_produtos: Number(produtos.rows[0].count),
            total_categorias: Number(categorias.rows[0].count),
            total_setores: Number(setores.rows[0].count),
            total_avaliacoes_produtos: Number(avaliacoesProdutos.rows[0].count),
            total_avaliacoes_setores: Number(avaliacoesSetores.rows[0].count)
        });

    }catch (error) {
    console.error("Erro ao carregar resumo geral do dashboard:", error);

    return res.status(500).json({
        message: "Não foi possível carregar os indicadores gerais do dashboard.",
        detalhe: error.message
    });
}
});


// ==============================
// MÉDIA DE AVALIAÇÕES
// ==============================
router.get("/dashboard/avaliacoes", autenticarToken, async (req, res) => {
    try {
        const mediaProdutos = await BD.query(`
            SELECT COALESCE(AVG(nota),0) AS media
            FROM avaliacoes_produtos
        `);

        const mediaSetores = await BD.query(`
            SELECT COALESCE(AVG(nota),0) AS media
            FROM avaliacoes_setores
        `);

        return res.status(200).json({
            media_geral_produtos: Number(mediaProdutos.rows[0].media),
            media_geral_setores: Number(mediaSetores.rows[0].media)
        });

    } catch (error) {
    console.error("Erro ao calcular médias das avaliações:", error);

    return res.status(500).json({
        message: "Não foi possível calcular as médias das avaliações de produtos e setores.",
        detalhe: error.message
    });
}
});


// ==============================
// PRODUTOS MAIS E MENOS AVALIADOS
// ==============================
router.get("/dashboard/produtos", autenticarToken, async (req, res) => {
    try {
        const maisAvaliado = await BD.query(`
            SELECT p.id_produto, p.nome, AVG(a.nota) as media
            FROM produtos p
            JOIN avaliacoes_produtos a ON a.id_produto = p.id_produto
            GROUP BY p.id_produto
            ORDER BY media DESC
            LIMIT 1
        `);

        const menosAvaliado = await BD.query(`
            SELECT p.id_produto, p.nome, AVG(a.nota) as media
            FROM produtos p
            JOIN avaliacoes_produtos a ON a.id_produto = p.id_produto
            GROUP BY p.id_produto
            ORDER BY media ASC
            LIMIT 1
        `);

        return res.status(200).json({
            mais_avaliado: maisAvaliado.rows[0] || null,
            menos_avaliado: menosAvaliado.rows[0] || null
        });

    } catch (error) {
    console.error("Erro ao buscar ranking de produtos:", error);

    return res.status(500).json({
        message: "Não foi possível carregar os produtos mais e menos avaliados.",
        detalhe: error.message
    });
}
});


// ==============================
// SETORES MAIS E MENOS AVALIADOS
// ==============================
router.get("/dashboard/setores", autenticarToken, async (req, res) => {
    try {
        const melhor = await BD.query(`
            SELECT s.id_setor, s.cidade, AVG(a.nota) as media
            FROM setores s
            JOIN avaliacoes_setores a ON a.id_setor = s.id_setor
            GROUP BY s.id_setor
            ORDER BY media DESC
            LIMIT 1
        `);

        const pior = await BD.query(`
            SELECT s.id_setor, s.cidade, AVG(a.nota) as media
            FROM setores s
            JOIN avaliacoes_setores a ON a.id_setor = s.id_setor
            GROUP BY s.id_setor
            ORDER BY media ASC
            LIMIT 1
        `);

        return res.status(200).json({
            melhor_setor: melhor.rows[0] || null,
            pior_setor: pior.rows[0] || null
        });

    } catch (error) {
    console.error("Erro ao buscar ranking de setores:", error);

    return res.status(500).json({
        message: "Não foi possível carregar os setores mais e menos avaliados.",
        detalhe: error.message
    });
}
});


// ==============================
// ÚLTIMAS AVALIAÇÕES
// ==============================
router.get("/dashboard/ultimas-avaliacoes", autenticarToken, async (req, res) => {
    try {
        const produtos = await BD.query(`
            SELECT 'produto' AS tipo, id_produto AS id, nota, comentario, email
            FROM avaliacoes_produtos
            ORDER BY id_avaliacao DESC
            LIMIT 5
        `);

        const setores = await BD.query(`
            SELECT 'setor' AS tipo, id_setor AS id, nota, comentario, email
            FROM avaliacoes_setores
            ORDER BY id_avaliacao DESC
            LIMIT 5
        `);

        return res.status(200).json({
            ultimas_avaliacoes_produtos: produtos.rows,
            ultimas_avaliacoes_setores: setores.rows
        });

    }catch (error) {
    console.error("Erro ao buscar últimas avaliações:", error);

    return res.status(500).json({
        message: "Não foi possível carregar as avaliações mais recentes do sistema.",
        detalhe: error.message
    });
}
});

export default router;