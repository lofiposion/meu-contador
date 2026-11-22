
let contador = Number(localStorage.getItem("contador")) || 0;

const valor = document.querySelector("#valor");
const botaoSomar = document.querySelector("#botao-somar");
const botaoDiminuir = document.querySelector("#botao-diminuir");
const botaoZerar = document.querySelector("#botao-zerar");
const botaoLimparHistorico = document.querySelector("#botao-limpar-historico");
const historico = document.querySelector("#historico");

const totalAdicoes = document.querySelector("#total-adicoes");
const totalSubtracoes = document.querySelector("#total-subtracoes");
const totalZeradas = document.querySelector("#total-zeradas");
const totalOperacoes = document.querySelector("#total-operacoes");

let operacoes = JSON.parse(localStorage.getItem("operacoes")) || [];

function mostrarHistorico() {
    historico.innerHTML = "";

    operacoes.forEach(function(operacao) {
        const item = document.createElement("li");

        item.textContent = operacao.acao + " | Resultado: " + operacao.resultado + " | " + (operacao.data || "Data não registrada");

        historico.appendChild(item);
    });
}

function atualizarEstatisticas() {
    let adicoes = 0;
    let subtracoes = 0;
    let zeradas = 0;

    operacoes.forEach(function(operacao) {
        if (operacao.acao === "Adicionou +1") {
            adicoes++;
        }

        if (operacao.acao === "Diminuiu -1") {
            subtracoes++;
        }

        if (operacao.acao === "Zerou o contador") {
            zeradas++;
        }
    });

    totalAdicoes.textContent = adicoes;
    totalSubtracoes.textContent = subtracoes;
    totalZeradas.textContent = zeradas;
    totalOperacoes.textContent = operacoes.length;
}

function registrarOperacao(acao) {
    operacoes.push({
        acao: acao,
        resultado: contador,
        data: new Date().toLocaleString("pt-BR")
    });

    localStorage.setItem("operacoes", JSON.stringify(operacoes));

    mostrarHistorico();
    atualizarEstatisticas();
}

function limparHistorico() {
    operacoes = [];

    localStorage.removeItem("operacoes");

    mostrarHistorico();
    atualizarEstatisticas();
}

function atualizarTela() {
    valor.textContent = contador;
    localStorage.setItem("contador", contador);
}

atualizarTela();
mostrarHistorico();
atualizarEstatisticas();

botaoSomar.addEventListener("click", function() {
    contador = contador + 1;
    registrarOperacao("Adicionou +1");
    atualizarTela();
});

botaoDiminuir.addEventListener("click", function() {
    contador = contador - 1;
    registrarOperacao("Diminuiu -1");
    atualizarTela();
});

botaoZerar.addEventListener("click", function() {
    contador = 0;
    registrarOperacao("Zerou o contador");
    atualizarTela();
});

botaoLimparHistorico.addEventListener("click", function() {
    limparHistorico();
});
