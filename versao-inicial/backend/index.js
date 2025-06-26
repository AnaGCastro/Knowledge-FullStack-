const app = require('express')()
const consign = require('consign')
const db = require('./config/db')

app.db = db

consign()
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

// Rota de teste para acesso via navegador
app.get('/', (req, res) => {
    res.send('API Knowledge rodando com sucesso!');
})

app.listen(3000, () => {
    console.log('Backend executando...')
})
