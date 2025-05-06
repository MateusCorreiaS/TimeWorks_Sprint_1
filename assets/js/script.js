/* Função que usei para carregar o calendário sempre que o HTML for carregado. */

let modoVisualizacao = "mes";
document.addEventListener("DOMContentLoaded", loadCalendarioMensal)
atualizarBotaoCalendario(modoVisualizacao);
let dataAtualCalendario = new Date();

let dataHoje = new Date();
let diaHoje = dataHoje.getDate();
let mesHoje = dataHoje.getMonth();
let anoHoje = dataHoje.getFullYear();

function loadCalendarioMensal() {
    let blocosCalendario = document.getElementById("canvaCalendario");

    blocosCalendario.innerHTML = ``;

    let ano = dataAtualCalendario.getFullYear();
    let mes = dataAtualCalendario.getMonth();

    let quantidadeDiasMesAtual = new Date(ano, mes + 1, 0).getDate(); // Aqui descobri a quant de dia nos mês atual. Quando passamos no parametro de 'dia' da função Date o numero '0' ele tras o ultimo dia do mes anterior

    let primerioDiaMes = new Date(ano, mes, 1).getDay();

    let diasMesAnterior = new Date(ano, mes, 0).getDate();

    let difDiasProxMes = 42 - quantidadeDiasMesAtual - primerioDiaMes;

    for (let i = primerioDiaMes - 1; i >= 0; i--) {
        let diaAnterior = document.createElement('div');
        diaAnterior.classList.add('cardDiaCalendario');
        diaAnterior.innerHTML = `<div style="color: gray">${diasMesAnterior - i}</div>`;
        blocosCalendario.appendChild(diaAnterior);
    }

    for (let i = 1; i <= quantidadeDiasMesAtual; i++) {
        let diasCalendario = document.createElement('div');
        diasCalendario.classList.add('cardDiaCalendario');

        let indiceIgualHoje = i === diaHoje && mes === mesHoje && ano === anoHoje;

        diasCalendario.innerHTML = `
            <div style="
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: auto;
                border-radius: 50%;
                ${indiceIgualHoje ? 'border: 2px solid #150A35; background-color: #150A35; color: white' : ''}
            ">
                ${i}
            </div>
        `;
        blocosCalendario.appendChild(diasCalendario);
    }

    for (let i = 0; i < difDiasProxMes; i++) {
        let proximoMes = document.createElement('div');
        proximoMes.classList.add('cardDiaCalendario');
        proximoMes.innerHTML = `<div style="color: gray">${i + 1}</div>`
        blocosCalendario.appendChild(proximoMes);
    }
    adicionarEventosDiasCalendario()
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

        div.innerHTML = `
            <div style="
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: auto;
                border-radius: 50%;
                ${indiceIgualHoje ? 'border: 2px solid #150A35; background-color: #150A35; color: white' : ''}
            ">
                ${dia}
            </div>
        `;
        blocosCalendario.appendChild(div);
    }
    adicionarEventosDiasCalendario()
}

/* MANTER OU NAO MANTER A VISUALIZAÇÃO POR DIA??? */

function loadCalendarioDiario() {
    const canva = document.getElementById("canvaCalendario");
    canva.innerHTML = "";

    const div = document.createElement("div");
    div.classList.add("cardDiaCalendario");
    div.style.fontSize = "32px";
    div.innerText = dataAtualCalendario.getDate();
    canva.appendChild(div);
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

atualizarCalendario();

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

let tarefas = {}; // Armazenamento simples no JS por enquanto

// Adiciona evento de clique nos dias após o calendário ser carregado
function adicionarEventosDiasCalendario() {
    document.querySelectorAll(".cardDiaCalendario").forEach((diaElemento, index) => {

        diaElemento.addEventListener("click", () => {
            
            const dia = diaElemento.innerText.trim();
            const mes = dataAtualCalendario.getMonth() + 1;
            const ano = dataAtualCalendario.getFullYear();

            const dataFormatada = `${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
            document.getElementById("dataSelecionada").value = dataFormatada;

            const modal = new bootstrap.Modal(document.getElementById('modalTarefa'));
            modal.show();
        });
    });
}

// Recria os dias com as tarefas após atualização
function renderizarTarefas() {
    const blocos = document.querySelectorAll(".cardDiaCalendario");
    blocos.forEach((diaElemento) => {
        const numeroDia = diaElemento.innerText.trim();
        const mes = dataAtualCalendario.getMonth() + 1;
        const ano = dataAtualCalendario.getFullYear();

        const dataChave = `${ano}-${String(mes).padStart(2, '0')}-${String(numeroDia).padStart(2, '0')}`;

        if (tarefas[dataChave]) {
            tarefas[dataChave].forEach(tarefa => {
                const divTarefa = document.createElement('div');
                divTarefa.classList.add(`tarefa-${tarefa.prioridade}`);
                divTarefa.textContent = tarefa.titulo;
                diaElemento.appendChild(divTarefa);
            });
        }
    });
}

// Submissão do formulário
document.getElementById("formTarefa").addEventListener("submit", function (e) {
    e.preventDefault();
    const data = document.getElementById("dataSelecionada").value;
    const titulo = document.getElementById("tituloTarefa").value;
    const descricao = document.getElementById("descricaoTarefa").value;
    const prioridade = document.getElementById("prioridadeTarefa").value;

    const novaTarefa = { titulo, descricao, prioridade };

    if (!tarefas[data]) {
        tarefas[data] = [];
    }
    tarefas[data].push(novaTarefa);

    // Atualiza calendário
    atualizarCalendario();

    // Fecha modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalTarefa'));
    modal.hide();

    // Limpa o formulário
    e.target.reset();
});

// Intercepta o carregamento do calendário e injeta os eventos
const originalLoadMensal = loadCalendarioMensal;
loadCalendarioMensal = function () {
    originalLoadMensal();
    renderizarTarefas();
    adicionarEventosDiasCalendario();
};
