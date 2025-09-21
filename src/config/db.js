const mysql = require('mysql2/promise')
/**
* Configurações de conexão com o banco de dados MySQL.
* Altere os valores 'user' e 'password' conforme necessário para o seu
ambiente.
*/
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_db'
}

// Variável para armazenar o pool de conexões
let pool;

/**
* Inicializa o pool de conexões com o banco de dados.
* O pool permite que a aplicação reutilize conexões, melhorando a
performance.
*/

async function connectToDataBase(){
    try{
        pool = mysql.createPool(dbConfig);
        console.log("✅ Conexão com MySQL estabelecida com sucesso!");
    } catch (err) {
        console.log("❌ Erro ao conectar ao banco: ", err);
        // Em um projeto real, você poderia tentar reconectar ou fechar a aplicação aqui

    }
}

// Conecta ao banco de dados assim que o módulo é carregado
connectToDataBase();

/**
* Exporta uma função que retorna o pool de conexões.
* Isso permite que outros arquivos da aplicação obtenham a conexão.
*/

module.exports = () => pool;