// backend/routes/api.js

const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

/**
 * @route   POST /api/feedback
 * @desc    Salva um novo feedback no banco de dados
 */
router.post('/feedback', async (req, res) => {
    try {
        const { score, comment } = req.body;
        const newFeedback = new Feedback({ score, comment });
        await newFeedback.save();
        res.status(201).json({ message: 'Feedback recebido com sucesso!', data: newFeedback });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor ao salvar feedback.' });
    }
});

/**
 * @route   GET /api/metrics
 * @desc    Calcula e retorna as métricas de NPS
 */
router.get('/metrics', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        const totalResponses = feedbacks.length;

        if (totalResponses === 0) {
            return res.json({ nps: 0, promoters: 0, passives: 0, detractors: 0, total: 0 });
        }

        const promoters = feedbacks.filter(f => f.score >= 9).length;
        const passives = feedbacks.filter(f => f.score >= 7 && f.score <= 8).length;
        const detractors = feedbacks.filter(f => f.score <= 6).length;

        const npsScore = Math.round(((promoters - detractors) / totalResponses) * 100);

        res.json({ nps: npsScore, promoters, passives, detractors, total: totalResponses });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor ao calcular métricas.' });
    }
});

module.exports = router;