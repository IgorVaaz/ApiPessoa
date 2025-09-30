/*
 Rota para criar uma nova pessoa no banco de dados.
 Recebe os dados via corpo da requisição (POST) e insere na tabela Pessoa.
 Retorna o ID da nova pessoa criada ou um erro em caso de falha.
*/

module.exports = (app, pool) => {
    app.post('/api/pessoas', async (req, res) => {
        // Extrair os dados do corpo da requisição usando desestruturação
        // Extrai os dados enviados no corpo da requisição (JSON ou formulário)
        // Exemplo de req.body: { "nome": "João", "sobrenome": "Silva", "idade": 20, ... }
        const {nome, sobrenome, idade, sexo, cidade, estado, pais} = req.body;

        // Verificar se os campos obrigatórios estão presentes
        if(!nome || !sobrenome){
            return res.status(400).json({
                error: "Nome e sobrenome são obrigatórios."
            });
        }

        try{
            // Executa o comando SQL para inserir uma nova pessoa com um array de valores
            const [result] = await pool.execute(
                'INSERT INTO pessoa (nome, sobrenome, idade, sexo, cidade, estado, pais) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [ nome, sobrenome, idade, sexo, cidade, estado, pais]
            );

            // Retornar uma resposta de sucesso com o ID da nova pessoa
            res.status(201).json({ id: result.insertId, message: "Pessoa criada com sucesso!"});

        } catch (err) {
            // Retorna um erro em caso de falha na operação
            console.error("Erro ao criar a pessoa: ", err);
            res.status(500).json({ error: "Erro interno no servidor ao criar a pessoa."});
        }
    });
}

// 📌 Observações importantes:

// app.post → cria uma rota que responde a requisições POST (inserção de dados).

// req.body → contém os dados enviados pelo cliente (vem no corpo da requisição).

// res.status().json() → define o código da resposta (ex: 400, 500, 201) e devolve uma mensagem em JSON.

// try/catch → usado para tratar erros, evitando que o servidor quebre.

// pool.execute → executa um comando SQL de forma segura (evita SQL Injection porque usa ?).