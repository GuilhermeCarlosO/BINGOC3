var jogadores = [];
var cartela = [];
var numerosUtilizados = [];

// Gera números únicos para a cartela
for (var i = 0; i < 5; i++) {
    var linha = gerarNumerosUnicos(5, numerosUtilizados);
    cartela.push(linha);
}

function gerarNumerosUnicos(quantidade, numerosExcluidos) {
    var numeros = [];

    while (numeros.length < quantidade) {
        var aleatorio = Math.floor(Math.random() * 75) + 1;

        if (!numeros.includes(aleatorio) && !numerosExcluidos.includes(aleatorio)) {
            numeros.push(aleatorio);
            numerosExcluidos.push(aleatorio);
        }
    }

    return numeros;
}

function gerarNumerosAleatorios(quantidade, min, max) {
    if (quantidade > max - min) {
        console.log("Intervalo insuficiente ...");
        return;
    }

    var numeros = [];

    while (numeros.length < quantidade) {
        var aleatorio = Math.floor(Math.random() * (max - min) + min);

        if (!numeros.includes(aleatorio)) {
            numeros.push(aleatorio);
        }
    }

    return numeros;
}

function gerarCartela() {
    var nomeJogador = prompt('Digite o nome do jogador');

    cartela = [
        gerarNumerosAleatorios(5, 1, 15),
        gerarNumerosAleatorios(5, 16, 30),
        gerarNumerosAleatorios(5, 31, 45),
        gerarNumerosAleatorios(5, 46, 60),
        gerarNumerosAleatorios(5, 61, 75)
    ];

    jogadores.push({
        nomeJogador: nomeJogador,
        cartela: cartela
    });

    desenharCartela(nomeJogador, cartela);
    console.log(jogadores);
}

function reiniciarJogo() {
    jogadores = [];
    document.getElementById('espaco_cartelas').innerHTML = '';

    // Limpa apenas o conteúdo da seção de números, mantendo o título e botão visíveis
    var numerosSection = document.getElementById('numeros');
    numerosSection.innerHTML = '<h2>Números</h2><button onclick="gerarNumeroAleatorio()">Gerar Número Aleatório</button>';
}

function desenharCartela(nome, cartela) {
    var div = document.getElementById('espaco_cartelas');

    var tabela = document.createElement('table');
    tabela.style.borderCollapse = "collapse"; // Remove o espaçamento entre as células da tabela

    var thead = document.createElement('thead');

    var thJogador = document.createElement('th');
    thJogador.innerText = nome; // Mostra o nome do jogador ao invés de "B I N G O"
    thJogador.colSpan = 5; // Define o número de colunas ocupadas pelo nome

    thead.appendChild(thJogador);

    for (var i = 0; i < 5; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 5; j++) {
            var td = document.createElement('td');
            if (i == 2 && j == 2) {
                td.innerText = "X";
                tr.appendChild(td);
            } else {
                td.innerText = cartela[j][i];
                tr.appendChild(td);
            }
        }
        tabela.appendChild(tr);
    }

    tabela.appendChild(thead);
    div.appendChild(tabela);
}




function gerarNumeroAleatorio() {
    var numero = Math.floor(Math.random() * 75) + 1;

    var numerosSection = document.getElementById('numeros');
    var numeroElement = document.createElement('p');
    numeroElement.innerText = "Número Aleatório: " + numero;
    numerosSection.appendChild(numeroElement);
    numerosSection.scrollTop = numerosSection.scrollHeight; // Rola automaticamente para o último número gerado
}


