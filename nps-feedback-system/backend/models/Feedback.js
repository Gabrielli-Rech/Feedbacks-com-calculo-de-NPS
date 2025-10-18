// backend/models/Feedback.js

const mongoose = require('mongoose');

// Define a estrutura (schema) para os dados de feedback no MongoDB
const FeedbackSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: [true, 'A nota é obrigatória.'],
        min: 0,
        max: 10,
    },
    comment: {
        type: String,
        trim: true,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Exporta o modelo para que possa ser usado em outras partes da aplicação
module.exports = mongoose.model('Feedback', FeedbackSchema);