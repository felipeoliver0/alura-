// Variável global para armazenar os nomes dos amigos
let amigos = [];

// Função para adicionar o nome à lista
function adicionarAmigo() {
    const inputNome = document.getElementById("amigo");
    const nome = inputNome.value.trim();

    if (nome === "") {
        alert("Por favor, digite um nome.");
        return;
    }

    // Adiciona o nome à lista de amigos
    amigos.push(nome);
    atualizarListaAmigos();

    // Limpa o campo de entrada
    inputNome.value = "";
}

// Função para atualizar a lista visível de amigos
function atualizarListaAmigos() {
    const listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = ""; // Limpa a lista antes de atualizar

    amigos.forEach(amigo => {
        const item = document.createElement("li");
        item.textContent = amigo;
        listaAmigos.appendChild(item);
    });
}

// Função para sortear os amigos secretos
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("É necessário pelo menos 2 amigos para sortear!");
        return;
    }

    // Embaralha a lista de amigos de forma aleatória
    const amigosSorteados = [...amigos];
    const resultado = [];

    // Embaralha a lista de amigos para garantir que o sorteio seja aleatório
    for (let i = amigosSorteados.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [amigosSorteados[i], amigosSorteados[j]] = [amigosSorteados[j], amigosSorteados[i]]; // Troca os elementos
    }

    // Garantir que ninguém se sorteie a si mesmo
    for (let i = 0; i < amigos.length; i++) {
        if (amigosSorteados[i] === amigos[i]) {
            // Se a pessoa se sorteou a si mesma, troque com outro amigo
            const temp = amigosSorteados[i];
            amigosSorteados[i] = amigosSorteados[(i + 1) % amigos.length];
            amigosSorteados[(i + 1) % amigos.length] = temp;
        }
    }

    // Agora, cada pessoa irá "sorteiar" a próxima pessoa da lista embaralhada
    for (let i = 0; i < amigos.length; i++) {
        // Cada amigo sorteia a próxima pessoa da lista embaralhada
        const sorteador = amigos[i];
        const sorteado = amigosSorteados[i];
        
        resultado.push(`${sorteador} sorteou ${sorteado}`);
    }

    // Exibe os resultados do sorteio
    const resultadoUl = document.getElementById("resultado");
    resultadoUl.innerHTML = ""; // Limpa os resultados antes de exibir os novos

    // Adiciona os itens sorteados na lista de resultados
    resultado.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        resultadoUl.appendChild(listItem);
    });
}
