const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const cors = require('cors');
const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/salvar-dados', (req, res) => {
    const dados = req.body;
    const filePath = path.join(__dirname, 'dados.json');

    let dadosExistente = [];
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        dadosExistente = JSON.parse(data);
    } catch (error) {
    
    }

    dadosExistente.push(dados);

    fs.writeFileSync(filePath, JSON.stringify(dadosExistente, null, 2));

    res.json({ mensagem: 'Dados salvos com sucesso!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
