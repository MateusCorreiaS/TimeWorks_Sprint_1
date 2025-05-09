/* Função que usei para carregar o calendário sempre que o HTML for carregado. */

let modoVisualizacao = "dia";
document.addEventListener("DOMContentLoaded", () => {
    atualizarCalendario();
});

atualizarBotaoCalendario(modoVisualizacao);
let dataAtualCalendario = new Date();

let dataHoje = new Date();
let diaHoje = dataHoje.getDate();
let mesHoje = dataHoje.getMonth();
let anoHoje = dataHoje.getFullYear();

function loadCalendarioMensal() {
    let blocosCalendario = document.getElementById("canvaCalendario");

    let ano = dataAtualCalendario.getFullYear();
    let mes = dataAtualCalendario.getMonth();

    let quantidadeDiasMesAtual = new Date(ano, mes + 1, 0).getDate(); // Aqui descobri a quant de dia nos mês atual. Quando passamos no parametro de 'dia' da função Date o numero '0' ele tras o ultimo dia do mes anterior

    let primerioDiaMes = new Date(ano, mes, 1).getDay();

    let diasMesAnterior = new Date(ano, mes, 0).getDate();

    let difDiasProxMes = 42 - quantidadeDiasMesAtual - primerioDiaMes;

    blocosCalendario.style.gridTemplateColumns = "repeat(7, 1fr)";
    blocosCalendario.style.gridTemplateRows = "repeat(6, 1fr)";

    blocosCalendario.innerHTML = ``;

    for (let i = primerioDiaMes - 1; i >= 0; i--) {
        let diaAnterior = document.createElement('div');
        diaAnterior.classList.add('cardDiaCalendario');
        diaAnterior.innerHTML = `<div style="color: gray; width: 15px; height: 15px; display: flex; align-items: center; justify-content: center; margin: auto; border-radius: 50%; font-size: 12px;">${diasMesAnterior - i}</div>`;
        blocosCalendario.appendChild(diaAnterior);
    }

    for (let i = 1; i <= quantidadeDiasMesAtual; i++) {
        let diasCalendario = document.createElement('div');
        diasCalendario.classList.add('cardDiaCalendario');

        let indiceIgualHoje = i === diaHoje && mes === mesHoje && ano === anoHoje;

        diasCalendario.innerHTML = `
            <div style=" width: 15px; height: 15px; display: flex; align-items: center; justify-content: center; margin: auto; border-radius: 50%; font-size: 12px; ${indiceIgualHoje ? 'background-color: #150A35; color: white' : ''}
            ">${i}</div>`;

        blocosCalendario.appendChild(diasCalendario);
    }

    for (let i = 0; i < difDiasProxMes; i++) {
        let proximoMes = document.createElement('div');
        proximoMes.classList.add('cardDiaCalendario');
        proximoMes.innerHTML = `<div style="color: gray; width: 15px; height: 15px; display: flex; align-items: center; justify-content: center; margin: auto; border-radius: 50%; font-size: 12px;">${i + 1}</div>`
        blocosCalendario.appendChild(proximoMes);
    }
    cabecalhoNomesDiaSemana()
}

function loadCalendarioSemanal() {
    let blocosCalendario = document.getElementById("canvaCalendario");
    blocosCalendario.innerHTML = "";

    let diaSemana = dataAtualCalendario.getDay(); // aqui eu descubro a posiação (0,1,2,3..) do DIA DA SEMANA da data atual (ex: 05/05/2025 é o '1') 
    let inicioSemana = new Date(dataAtualCalendario); // copio o controle da data atual para não alterar no geral e afetar outras configurações
    inicioSemana.setDate(inicioSemana.getDate() - diaSemana); // e aqui eu defino o valor da data de 'inicioSemana' a fim de encontrar o domingo (dia de indice '0') da semana atual

    for (let i = 0; i < 7; i++) {
        let diaInicioSemana = new Date(inicioSemana.getTime()); // não faço ideia de por que assim funcionou
        diaInicioSemana.setDate(inicioSemana.getDate() + i);

        let dia = diaInicioSemana.getDate();
        let mes = diaInicioSemana.getMonth();
        let ano = diaInicioSemana.getFullYear();

        let indiceIgualHoje = dia === diaHoje && mes === mesHoje && ano === anoHoje;

        let div = document.createElement("div");
        div.classList.add("cardDiaCalendario");

        blocosCalendario.style.gridTemplateColumns = "repeat(7, 1fr)";
        blocosCalendario.style.gridTemplateRows = "1fr";

        div.innerHTML = `
            <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; margin: auto; border-radius: 50%; ${indiceIgualHoje ? 'background-color: #150A35; color: white' : ''} ">${dia}</div>`;
        blocosCalendario.appendChild(div);
    }
    cabecalhoNomesDiaSemana()
}

/* MANTER OU NAO MANTER A VISUALIZAÇÃO POR DIA??? */

function loadCalendarioDiario() {
    const canva = document.getElementById("canvaCalendario");

    canva.innerHTML = "";
    canva.style.gridTemplateColumns = "1fr";
    canva.style.gridTemplateRows = "auto";

    const div = document.createElement("div");
    div.classList.add("cardDiaCalendario");

    const header = document.createElement("div");
    header.style.cssText = `
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        border-radius: 50%;
        background-color: #150A35;
        color: white;
        font-size: 12px;
    `;
    header.textContent = dataAtualCalendario.getDate();
    div.appendChild(header);


    const horasContainer = document.createElement("div");
    horasContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 4px;
    `;

    for (let i = 0; i < 24; i++) {
        const hora = document.createElement("div");
        hora.style.cssText = `
            padding: 6px 10px;
            border-top: 1px dotted #150A35;
            font-size: 14px;
            text-align: start;
            font-size: 10px;
            color: gray;
        `;
        hora.textContent = `${i.toString().padStart(2, '0')}:00`;
        horasContainer.appendChild(hora);
    }

    // Adiciona o container de horas dentro da mesma div do dia
    div.appendChild(horasContainer);

    // Insere tudo no calendário
    canva.appendChild(div);

    cabecalhoNomesDiaSemana();
}

/* Controle dos botões usadas para alterar entre os meses */

const nomeMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

let elementoMes = document.getElementById("mesAtual");

function atualizarCalendario() {
    let ano = dataAtualCalendario.getFullYear();
    let mes = nomeMeses[dataAtualCalendario.getMonth()];
    elementoMes.innerHTML = `${mes}<br>${ano}`;

    if (modoVisualizacao === "mes") {
        loadCalendarioMensal();
    } else if (modoVisualizacao === "semana") {
        loadCalendarioSemanal();
    } else if (modoVisualizacao === "dia") {
        loadCalendarioDiario();
    }
}

document.getElementById("hoje").addEventListener("click", () => {
    dataAtualCalendario = new Date();
    atualizarCalendario();
})

document.getElementById("avancar").addEventListener("click", () => {
    if (modoVisualizacao === "semana") {
        dataAtualCalendario.setDate(dataAtualCalendario.getDate() + 7);
    } else if (modoVisualizacao === "dia") {
        dataAtualCalendario.setDate(dataAtualCalendario.getDate() + 1);
    } else {
        dataAtualCalendario.setMonth(dataAtualCalendario.getMonth() + 1);
    }
    atualizarCalendario();
});

document.getElementById("voltar").addEventListener("click", () => {
    if (modoVisualizacao === "semana") {
        dataAtualCalendario.setDate(dataAtualCalendario.getDate() - 7);
    } else if (modoVisualizacao === "dia") {
        dataAtualCalendario.setDate(dataAtualCalendario.getDate() - 1);
    } else {
        dataAtualCalendario.setMonth(dataAtualCalendario.getMonth() - 1);
    }
    atualizarCalendario();
});

/* Alterar de calendário mensal para diario para semanal */

document.getElementById("botaoCalendarioSemanal").addEventListener("click", () => {
    modoVisualizacao = "semana";
    atualizarBotaoCalendario(modoVisualizacao);
    atualizarCalendario();
});

document.getElementById("botaoCalendarioDia").addEventListener("click", () => {
    modoVisualizacao = "dia";
    atualizarBotaoCalendario(modoVisualizacao);
    atualizarCalendario();
});

document.getElementById("botaoCalendarioMes").addEventListener("click", () => {
    modoVisualizacao = "mes";
    atualizarCalendario();
    atualizarBotaoCalendario(modoVisualizacao);
})

/* Sumir botões daa visualização semanal mensal e diario*/

function atualizarBotaoCalendario(visualizacaoAtual) {
    let botaoMes = document.getElementById("botaoCalendarioMes");
    let botaoSemanal = document.getElementById("botaoCalendarioSemanal");
    let botaoDia = document.getElementById("botaoCalendarioDia");

    botaoMes.classList.remove("esconderBotao");
    botaoSemanal.classList.remove("esconderBotao");
    botaoDia.classList.remove("esconderBotao");

    if (modoVisualizacao === "mes") {
        botaoMes.classList.add("esconderBotao");
    } else if (modoVisualizacao === "semana") {
        botaoSemanal.classList.add("esconderBotao");
    } else if (modoVisualizacao === "dia") {
        botaoDia.classList.add("esconderBotao");
    }
}

const nomesDiasSemana = ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."];

function cabecalhoNomesDiaSemana() {
    let cabecalhoCalendario = document.getElementById("cabecalhoCalendario");
    cabecalhoCalendario.innerHTML = "";

    if (modoVisualizacao === "dia") {
        const i = dataAtualCalendario.getDay();
        const diaDiv = document.createElement("div");

        cabecalhoCalendario.style.gridTemplateColumns = "1fr";

        diaDiv.classList.add("cardCabecalhoCalendario");
        diaDiv.textContent = nomesDiasSemana[i];
        cabecalhoCalendario.appendChild(diaDiv);
    } else {

        for (let i = 0; i < nomesDiasSemana.length; i++) {
            const diaDiv = document.createElement("div");

            cabecalhoCalendario.style.gridTemplateColumns = "repeat(7, 1fr)";

            diaDiv.classList.add("cardCabecalhoCalendario");
            diaDiv.textContent = nomesDiasSemana[i];
            cabecalhoCalendario.appendChild(diaDiv);
        }
    }
}