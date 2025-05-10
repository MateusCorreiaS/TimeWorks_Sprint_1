/* Função que usei para carregar o calendário sempre que o HTML for carregado. */

let modoVisualizacao = "mes";
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

    // Configurar o grid para a estrutura semanal
    blocosCalendario.style.gridTemplateColumns = "repeat(7, 1fr)";
    blocosCalendario.style.gridTemplateRows = "auto repeat(24, 1fr)";
    
    // Remover qualquer overflow ou classe específica anterior
    blocosCalendario.style.overflow = "hidden";
    blocosCalendario.classList.remove("visualizacao-diaria");
    
    // Adicionar classe para visualização semanal
    blocosCalendario.classList.add("visualizacao-semanal");

    let diaSemana = dataAtualCalendario.getDay();
    let inicioSemana = new Date(dataAtualCalendario);
    inicioSemana.setDate(inicioSemana.getDate() - diaSemana);

    // Criar cabeçalho com dias da semana
    for (let i = 0; i < 7; i++) {
        let diaInicioSemana = new Date(inicioSemana);
        diaInicioSemana.setDate(inicioSemana.getDate() + i);

        let dia = diaInicioSemana.getDate();
        let mes = diaInicioSemana.getMonth();
        let ano = diaInicioSemana.getFullYear();

        let indiceIgualHoje = dia === diaHoje && mes === mesHoje && ano === anoHoje;

        let cabecalhoDia = document.createElement("div");
        cabecalhoDia.classList.add("cabecalho-dia-diario");

        cabecalhoDia.innerHTML = `
            <div class="numero-dia-diario" style="${indiceIgualHoje ? 'background-color: #150A35; color: white;' : ''}">${dia}</div>
        `;

        blocosCalendario.appendChild(cabecalhoDia);
    }

    // Adicionar células para cada hora do dia para cada dia da semana
    for (let hora = 0; hora < 24; hora++) {
        for (let dia = 0; dia < 7; dia++) {
            let diaAtual = new Date(inicioSemana);
            diaAtual.setDate(inicioSemana.getDate() + dia);
            diaAtual.setHours(hora, 0, 0, 0);

            let celulaHora = document.createElement("div");
            celulaHora.classList.add("celula-hora-diaria");

            // Formatação da hora e adição como atributo de dados
            let horaFormatada = hora.toString().padStart(2, '0') + ":00";
            celulaHora.dataset.hora = horaFormatada;
            celulaHora.dataset.data = `${diaAtual.getFullYear()}-${(diaAtual.getMonth() + 1).toString().padStart(2, '0')}-${diaAtual.getDate().toString().padStart(2, '0')}`;

            // Mostrar hora apenas na primeira coluna
            if (dia === 0) {
                celulaHora.innerHTML = `<span class="indicador-hora-diaria">${horaFormatada}</span>`;
            }

            // Verificar se é o dia atual
            if (diaAtual.getDate() === diaHoje &&
                diaAtual.getMonth() === mesHoje &&
                diaAtual.getFullYear() === anoHoje) {
            }

            blocosCalendario.appendChild(celulaHora);
        }
    }
    cabecalhoNomesDiaSemana();
}

function loadCalendarioDiario() {
    let dia = dataAtualCalendario.getDate();
    let mes = dataAtualCalendario.getMonth();
    let ano = dataAtualCalendario.getFullYear();

    let indiceIgualHoje = dia === diaHoje && mes === mesHoje && ano === anoHoje;

    const canva = document.getElementById("canvaCalendario");

    canva.innerHTML = "";
    canva.style.gridTemplateColumns = "1fr";

    // Definir o grid para comportar cabeçalho + 24 horas em frações iguais
    canva.style.gridTemplateRows = "auto repeat(24, 1fr)";

    // Remover qualquer overflow ou classe de visualização específica
    canva.style.overflow = "hidden";
    canva.classList.remove("visualizacao-semanal");

    // Adicionar classe para visualização diária
    canva.classList.add("visualizacao-diaria");

    // Criar o cabeçalho do dia
    const headerDiv = document.createElement("div");
    headerDiv.classList.add("cabecalho-dia-diario");

    headerDiv.innerHTML = `
                <div class="numero-dia-diario" style="${indiceIgualHoje ? 'background-color: #150A35; color: white;' : ''}">${dia}</div>
    `;

    canva.appendChild(headerDiv);

    // Criar as células de hora
    for (let i = 0; i < 24; i++) {
        const horaDiv = document.createElement("div");
        horaDiv.classList.add("celula-hora-diaria");

        // Adicionar atributos de dados para consistência com a visualização semana
        const horaFormatada = i.toString().padStart(2, '0') + ":00";
        horaDiv.dataset.hora = horaFormatada;
        horaDiv.dataset.data = `${ano}-${(mes + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

        horaDiv.innerHTML = `<span class="indicador-hora-diaria">${horaFormatada}</span>`;

        canva.appendChild(horaDiv);
    }

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