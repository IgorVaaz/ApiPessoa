/**
* Rota para atualizar os dados de uma pessoa no banco de dados.
* Recebe o ID pela URL e os novos dados pelo corpo da requisição (PUT).
*/

module.exports = (app, pool) => {
    app.put('/api/pessoas/:id', async (req, res) => {
        const { id } = req.params;
        const { nome, sobrenome, idade, sexo, cidade, estado, pais } = req.body;

        // Verificar se o ID é um NUMERO valido para evitar erros de SQL
        // Abreviação de Is Not a Number
        if(isNaN(id)){
            return res.status(400).json({ error: "ID invalido. O ID deve ser um numero"});
        }

        try{
            const [result] = await pool.execute('UPDATE Pessoa SET nome=?, sobrenome=?, idade=?, sexo=?, cidade=?, estado=?, pais=? WHERE id=?', [nome, sobrenome, idade, sexo, cidade, estado, pais, id]);

            //Se nenhum registro foi afetado, a pessoa não foi encontrada, pois id é inexistente
            if(result.affectedRows === 0 ){
                return res.status(404).json({ message: "Pessoa não encontrada."});
            }
            
            res.status(200).json({ message: "Pessoa atualizada com sucesso!"});
        } catch (err) {
            console.error("Erro ao atualizar pessoa: ", err );
            res.status(500).json({ error: "Erro interno no servidor ao atualizar a pessoa."});
        }
    });
}

/*
Resumo da rota PUT (/api/pessoas/:id)

1. Recebe o ID da pessoa pela URL e os novos dados pelo corpo da requisição.
2. Valida se o ID é um número válido (para evitar erros no banco).
3. Executa a query UPDATE na tabela Pessoa, substituindo os valores antigos pelos novos.
4. Se nenhum registro for alterado, significa que o ID não existe (retorna 404).
5. Se der tudo certo, retorna mensagem de sucesso (200).
6. Em caso de erro no servidor ou no banco, retorna status 500.
*/