/* Função que usei para carregar o calendário sempre que o HTML for carregado. */

function loadCalendario() {
    let blocosCalendario = document.getElementById("canvaCalendario");

    /*        blocosCalendario.innerHTML = `
          <div class="diaSemanaCalendario">Domingo</div>
          <div class="diaSemanaCalendario">Segunda-feira</div>
          <div class="diaSemanaCalendario">Terça-feira</div>
          <div class="diaSemanaCalendario">Quarta-feira</div>
          <div class="diaSemanaCalendario">Quinta-feira</div>
          <div class="diaSemanaCalendario">Sexta-feira</div>
          <div class="diaSemanaCalendario">Sábado</div>
      `; 
   */

    for (let i = 0; i <= 34; i++) {
        let diasCalendario = document.createElement('div');
        diasCalendario.classList.add('cardDiaCalendario');

        diasCalendario.innerHTML = `<div>${i + 1}</div>`;
        blocosCalendario.appendChild(diasCalendario);
    }
}

document.addEventListener("DOMContentLoaded", loadCalendario)

/* Controle dos botões usadas para alterar entre os meses */

const nomesMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

let dataAtual = new Date();

let elementoMes = document.getElementById("mesAtual");

function atualizarMes() {
    let mes = nomesMeses[dataAtual.getMonth()];
    let ano = dataAtual.getFullYear();
    elementoMes.textContent = `${mes} ${ano}`;
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



