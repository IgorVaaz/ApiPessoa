/**
 * Script responsável por buscar e exibir a lista de pessoas na tela.
 * A função 'fetchPeople' é chamada no início para carregar os dados.
 */

// Aguarda o carregamento completo do conteúdo da página (HTML)
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona o elemento UL que vai conter a lista de pessoas
    const personList = document.getElementById('person-list');

    /**
     * Busca todas as pessoas da API e exibe os resultados na tela.
     */
    async function fetchPeople(){
        // Limpa a lista atual para evitar duplicação
        personList.innerHTML = '';

        try{
            // fetch é usado para fazer requisições HTTP (enviar e receber dados de servidor)
            // Faz uma requisição HTTP GET para o endpoint /api/pessoas
            const response = await fetch('/api/pessoas');

            // Verifica se a resposta não foi bem sucedida (status diferente de 200)
            if(!response.ok){
                throw new Error('Erro ao carregar a lista de pessoas.');
            }

            // Converte o corpo da resposta (em JSON) para objeto JavaScript
            const people = await response.json();

            // Itera sobre a lista de pessoas e cria um item de lista cada uma.
            // Percorre o array de pessoas retornado pela API
            people.forEach(person => {
                // Cria um novo elemento de lista <li> para cada pessoa
                const li = document.createElement('li');

                //Define o conteúdo HTML do <li> com os dados da pessoa
                // Usa operador ternário (condição ? valor1 : valor2) para tratar campos ausentes
                li.innerHTML = `<span>${person.nome} ${person.sobrenome}, ${person.idade ? person.idade + ' anos' : 'Idade não informada'},
                Sexo: ${person.sexo || 'Não informado'} - ${person.cidade || 'Cidade não informada'}/${person.estado || ''}, ${person.pais
                || 'Pais não informado'}</span>
                <div>
                    <button class="edit-btn" data-id="${person.id}"> Editar </button>
                    <button class="delete-btn" data-id="${person.id}"> Deletar </button>
                </div>`;
                // Adiciona o <li> recém criado dentro da lista principal
                personList.appendChild(li);
            });
        } catch (error) {
            // Caso ocorra algum erro durante o fetch ou processamento de dados
            console.error("Falha ao buscar pessoas: ", error);
            // Exibe uma mensagem de erro visível para o usuário
            personList.innerHTML = `<p style="color: red;"> Não foi possível carregar a lista de pessoas. Tente novamente
            mais tarde. </p>`;
        }


    }

    // Torna a função global para que os outros scripts possam chamá-la
    window.fetchPeople = fetchPeople;

    // Executa a função automaticamente ao carregar a página
    fetchPeople();

});

/* 
--------------------------------------------------------------
📘 EXPLICAÇÃO DO CÓDIGO (RESUMO PARA ESTUDO)
--------------------------------------------------------------

1️⃣ O script só é executado depois que todo o HTML da página é carregado.
   → Isso é feito com: document.addEventListener('DOMContentLoaded', ...)

2️⃣ Em seguida, ele procura na página o elemento com id="person-list".
   → É dentro desse elemento que será exibida a lista de pessoas.

3️⃣ A função fetchPeople() é uma função assíncrona (usa 'async/await').
   → Ela serve para buscar os dados de pessoas do servidor (API) e mostrar na tela.

4️⃣ Dentro da função:
   - Primeiro, o conteúdo atual da lista é apagado (para evitar duplicação).
   - Depois, é feita uma requisição HTTP usando 'fetch("/api/pessoas")'.
     O 'fetch' pede ao servidor os dados das pessoas.
   - Quando a resposta chega, ela é convertida de JSON para um objeto JavaScript "people"
       const people = await response.json();

5️⃣ O código então percorre cada pessoa retornada com 'forEach'.
   → Para cada pessoa, ele cria um elemento <li> (item de lista)
     com as informações: nome, sobrenome, idade, sexo, cidade, etc.
   → Também cria dois botões:
       - "Editar" (para editar os dados futuramente)
       - "Deletar" (para excluir a pessoa futuramente)
   → Cada <li> é colocado dentro da lista principal (personList).

6️⃣ Caso ocorra algum erro durante a requisição (ex: servidor fora do ar),
   o código mostra uma mensagem de erro na tela e também registra o erro no console.

7️⃣ Por fim:
   - A função 'fetchPeople' é tornada global (window.fetchPeople),
     para poder ser usada em outros arquivos JS se necessário.
   - A função é chamada automaticamente ao carregar a página,
     assim os dados aparecem logo que o site é aberto.

--------------------------------------------------------------
💡 Em resumo:
Este script faz uma requisição à API '/api/pessoas',
pega os dados do banco e mostra tudo na tela de forma automática.
--------------------------------------------------------------
*/
