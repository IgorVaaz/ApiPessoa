const express = require('express');
const path = require('path');
const db = require('./config/db');

const app = express();
const port = process.env.PORT || 3000; // Usa a porta 3000 ou uma variável de ambiente.

// Middleware para processar requisições
app.use(express.json()); // Habilita o uso de JSON no corpo das requisições
app.use(express.urlencoded({ extended: true})); // Habilita o uso de dados de formulário
app.use(express.static(path.join(__dirname, '../public'))); // Serve arquivos estáticos da pasta 'public'

// Cenário sem pool de conexões:
// Em um jogo, para cada ação, como cortar uma árvore, você precisaria criar um novo lenhador. Após a tarefa, ele desapareceria. 
// Isso seria uma tremenda perda de tempo e recursos.
// Cenário com pool de conexões:
// Com o pool, você treina um grupo de lenhadores (as conexões) no início do jogo. Quando precisa cortar uma árvore, você designa um desses lenhadores. Quando ele termina,
//  ele volta para a base, pronto para a próxima missão. Essa eficiência permite que o jogo flua sem atrasos, mesmo com muitas tarefas acontecendo ao mesmo tempo.

// Obter o pool de conexões do banco de dados
const pool = db();

// Importa e conecta as rotas do CRUD
require('./pessoa/create')(app, pool);
require('./pessoa/read')(app, pool);
require('./pessoa/update')(app, pool);
require('./pessoa/delete')(app, pool);

// Iniciar o servidor e escutar a porta definida.
app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});