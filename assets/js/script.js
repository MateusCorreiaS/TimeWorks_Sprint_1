/* Função que usei para carregar o calendário sempre que o HTML for carregado. */

function loadCalendario() {
    let blocosCalendario = document.getElementById("canvaCalendario");

    blocosCalendario.innerHTML = ``;

    let ano = dataAtual.getFullYear();
    let mes = dataAtual.getMonth();

    let quantidadeDias = new Date(ano, mes + 1, 0).getDate();

    let primerioDiaMes = new Date(ano, mes, 1).getDay();
    
    let diasProximoMes = new Date(ano, mes + 1, 1).getDate();

    let difDiasProxMes = 42 - quantidadeDias -primerioDiaMes;

    console.log(difDiasProxMes)

    for (let i = 0; i < primerioDiaMes; i++) {
        let mesAterior = document.createElement('div');
        mesAterior.classList.add('cardDiaCalendario');
        mesAterior.innerHTML = `<div>${i+1}</div>`
        blocosCalendario.appendChild(mesAterior);
    }

    for (let i = 1; i <= quantidadeDias; i++) {
        let diasCalendario = document.createElement('div');
        diasCalendario.classList.add('cardDiaCalendario');

        diasCalendario.innerHTML = `<div>${i}</div>`;
        blocosCalendario.appendChild(diasCalendario);
    }

    for (let i = 0; i < difDiasProxMes; i++) {
        let proximoMes = document.createElement('div');
        proximoMes.classList.add('cardDiaCalendario');
        proximoMes.innerHTML = `<div>${i+1}</div>`
        blocosCalendario.appendChild(proximoMes);
    }
}

document.addEventListener("DOMContentLoaded", loadCalendario)

/* Controle dos botões usadas para alterar entre os meses */

const nomeMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

let dataAtual = new Date();

let elementoMes = document.getElementById("mesAtual");

function atualizarMes() {
    let mes = nomeMeses[dataAtual.getMonth()];
    let ano = dataAtual.getFullYear();
    elementoMes.innerHTML = `${mes}<br>${ano}`;
    loadCalendario();
}

atualizarMes();

document.getElementById("hoje").addEventListener("click", () => {
    dataAtual = new Date();
    atualizarMes();
})

document.getElementById("avancar").addEventListener("click", () => {
    dataAtual.setMonth(dataAtual.getMonth() + 1);
    atualizarMes();
});

document.getElementById("voltar").addEventListener("click", () => {
    dataAtual.setMonth(dataAtual.getMonth() - 1);
    atualizarMes();
});



