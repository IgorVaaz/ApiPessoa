/*
    Rotas para leitura de pessoas no banco de dados
    Permite listar todas as pessoas OU buscar uma pessoa especifica por ID
*/

// Exporta uma função que recebe como parâmetros o `app` (Express) e o `pool` (conexão MySQL)
module.exports = (app, pool) => {
    // Rota para listar todas as pessoas
    app.get('/api/pessoas', async (req, res) => {
        try {
            // Executa a query SQL que retorna todas as linhas da tabela `pessoa`
            const [rows] = await pool.execute('SELECT * FROM pessoa');
            res.status(200).json(rows);
        } catch (err) {
             // Se ocorrer algum erro na query, mostra no console
            console.error("Erro ao buscar pessoas: ", err);
            res.status(500).json({ error: "Erro interno do servidor ao buscar pessoas."});
        }
    });

    // Rota para buscar uma pessoa por ID
    app.get('/api/pessoas/:id', async (req, res) => {
        const { id } = req.params; // Pega o parametro id por Desestruturação

        try{
            // Executa a query SQL buscando uma pessoa com o ID informado
            // O `?` é um placeholder para evitar SQL Injection
            const [rows] = await pool.execute('SELECT * FROM pessoa WHERE id=?', [id]);
            // Se nenhuma pessoa for encontrada, retorna 404 (Not Found)
            if(rows.length === 0){
                return res.status(404).json({ message: "Pessoa não encontrada."});
            }
            // Caso contrário, retorna o primeiro registro (rows[0])
            // já que o ID deve ser único
            res.status(200).json(rows[0]);
        } catch (err) {
            // Se tiver erro na execução, mostra no console
            console.error("Erro ao buscar pessoa por ID: ", err);
            // E retorna um erro genérico para o cliente
            res.status(500).json({ error: "Erro interno do servidor ao buscar pessoa."});
        }
    });
}

/*
    🔎 Observações Importantes:

    1. Rotas devem sempre começar com "/" e não com "./".
       → Correto: "/api/pessoas" e "/api/pessoas/:id"
       → Errado: "./api/pessoas"

    2. Atenção ao uso de "rows.length" (com "h") para verificar se a consulta retornou registros.
       → "rows.lenght" (com "ht" invertido) gera erro ou sempre será undefined.

    3. Uso de "?" nas queries SQL:
       → Muito importante para evitar SQL Injection.
       → Exemplo: "SELECT * FROM pessoa WHERE id=?" substitui o ? pelo valor de forma segura.

    4. Boas práticas de retorno HTTP:
       - 200 (OK): requisição bem-sucedida.
       - 404 (Not Found): quando a pessoa não é encontrada pelo ID.
       - 500 (Internal Server Error): quando ocorre algum erro inesperado no servidor.

    5. Estrutura do código:
       - "module.exports" permite reaproveitar as rotas em outros arquivos.
       - "async/await" garante que o servidor só responda depois que a consulta ao banco terminar.

    6. Log de erros no console:
       → Útil para depuração no servidor, mas cuidado para não expor informações sensíveis em produção.

    7. Nome da tabela no banco:
       → No SQL, use sempre o mesmo nome (ex.: "pessoa").
       → Se no banco está "Pessoa" (com P maiúsculo), pode dar problema em sistemas que diferenciam maiúsculas e minúsculas.

*/
