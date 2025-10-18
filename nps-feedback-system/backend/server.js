// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado ao MongoDB com sucesso!'))
.catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));


app.use('/api', require('./routes/api'));

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta: http://localhost:${PORT}`));