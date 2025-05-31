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

// Função para renderizar tarefas no calendário
function renderizarTarefas() {
    // Limpar quaisquer tarefas previamente renderizadas
    const tarefasExistentes = document.querySelectorAll('.tarefa-evento');
    tarefasExistentes.forEach(tarefa => tarefa.remove());

    // Percorrer todas as tarefas
    tarefas.forEach(tarefa => {
        // Converter a data e hora da tarefa para um objeto Date
        const dataTarefa = new Date(tarefa.data + 'T' + tarefa.hora.replace('Z', ''));
        const diaTarefa = dataTarefa.getDate();
        const mesTarefa = dataTarefa.getMonth();
        const anoTarefa = dataTarefa.getFullYear();
        const horaTarefa = dataTarefa.getHours();

        // Formatar a data para corresponder ao formato usado nos atributos data-data
        const dataFormatada = `${anoTarefa}-${(mesTarefa + 1).toString().padStart(2, '0')}-${diaTarefa.toString().padStart(2, '0')}`;
        const horaFormatada = horaTarefa.toString().padStart(2, '0') + ":00";

        // Determinar a cor com base na prioridade
        let corPrioridade;
        switch (tarefa.prioridade) {
            case "Muito alta":
                corPrioridade = "#B71C1C"; // Vermelho escuro
                break;
            case "Alta":
                corPrioridade = "#F44336"; // Vermelho
                break;
            case "Média":
                corPrioridade = "#d5c000"; // Amarelo
                break;
            case "Baixa":
                corPrioridade = "#4CAF50"; // Verde
                break;
            case "Muito baixa":
                corPrioridade = "#8BC34A"; // Verde claro
                break;
            default:
                corPrioridade = "#4CAF50"; // Verde para caso padrão
        }

        // Determinar o estilo com base no status de realização
        const estiloRealizada = tarefa.realizada ? "text-decoration: line-through; opacity: 0.7;" : "";

        // Buscar a célula correspondente à data e hora da tarefa
        if (modoVisualizacao === "dia") {
            const celula = document.querySelector(`.celula-hora-diaria[data-data="${dataFormatada}"][data-hora="${horaFormatada}"]`);
            if (celula) {
                adicionarTarefaNaCelula(celula, tarefa, corPrioridade, estiloRealizada);
            }
        } else if (modoVisualizacao === "semana") {
            const celula = document.querySelector(`.celula-hora-diaria[data-data="${dataFormatada}"][data-hora="${horaFormatada}"]`);
            if (celula) {
                adicionarTarefaNaCelula(celula, tarefa, corPrioridade, estiloRealizada);
            }
        } else if (modoVisualizacao === "mes") {
            // Para visão mensal, adicionar um indicador nas células dos dias
            const dia = diaTarefa;
            const ano = dataAtualCalendario.getFullYear();
            const mes = dataAtualCalendario.getMonth();

            // Verificar se a tarefa é do mês atual
            if (mesTarefa === mes && anoTarefa === ano) {
                // Encontrar a célula correspondente ao dia
                const celulas = document.querySelectorAll('.cardDiaCalendario');
                const primeiroDiaMes = new Date(ano, mes, 1).getDay();
                const indexCelula = primeiroDiaMes + dia - 1;

                if (celulas[indexCelula]) {
                    // Criar um elemento de texto para a tarefa
                    const tarefaElemento = document.createElement('div');
                    tarefaElemento.classList.add('tarefa-evento', 'tarefa-item-mes');
                    tarefaElemento.setAttribute('data-id-tarefa', tarefa.id);

                    // Formatação da hora para exibição
                    const horaExibicao = horaTarefa.toString().padStart(2, '0') + ":00";

                    // Estilo da tarefa baseado na prioridade e status
                    tarefaElemento.style.backgroundColor = corPrioridade;

                    // Conteúdo da tarefa
                    tarefaElemento.innerHTML = `
                        <span style="${estiloRealizada}">${horaExibicao} ${tarefa.titulo}</span>
                        ${tarefa.recorrencia !== "Não repete" ? '<i class="icone-recorrente">🔄</i>' : ''}
                    `;

                    // Procurar ou criar um container para tarefas no dia
                    if (!celulas[indexCelula].querySelector('.tarefas-container-mes')) {
                        const container = document.createElement('div');
                        container.classList.add('tarefas-container-mes');
                        celulas[indexCelula].appendChild(container);
                    }

                    // Adicionar a tarefa ao container
                    celulas[indexCelula].querySelector('.tarefas-container-mes').appendChild(tarefaElemento);

                    // Adicionar evento de clique
                    tarefaElemento.addEventListener('click', () => {
                        mostrarDetalhesTarefa(tarefa);
                    });
                }
            }
        }
    });
}

function adicionarTarefaNaCelula(celula, tarefa, corPrioridade, estiloRealizada) {
    const dataTarefa = new Date(tarefa.data + 'T' + tarefa.hora.replace('Z', ''));
    const horaTarefa = dataTarefa.getHours();
    const horaExibicao = horaTarefa.toString().padStart(2, '0') + ":00";

    // Verificar se já existe um container para tarefas na célula
    let tarefasContainer = celula.querySelector('.tarefas-container-celula');
    if (!tarefasContainer) {
        tarefasContainer = document.createElement('div');
        tarefasContainer.classList.add('tarefas-container-celula');
        celula.appendChild(tarefasContainer);
    }

    const tarefaElemento = document.createElement('div');
    tarefaElemento.classList.add('tarefa-evento');

    // Adicionar classes específicas para visualização diária ou semanal
    if (modoVisualizacao === "dia") {
        tarefaElemento.classList.add('tarefa-evento-diaria');
    } else if (modoVisualizacao === "semana") {
        tarefaElemento.classList.add('tarefa-evento-semanal');
    }

    tarefaElemento.setAttribute('data-id-tarefa', tarefa.id);
    tarefaElemento.style.backgroundColor = corPrioridade;
    tarefaElemento.innerHTML = `
        <span style="${estiloRealizada}">${tarefa.titulo}</span>
        ${tarefa.recorrencia !== "Não repete" ? '<i class="icone-recorrente">🔄</i>' : ''}
    `;

    // Adicionar a tarefa ao container
    tarefasContainer.appendChild(tarefaElemento);

}

const atualizarCalendarioOriginal = atualizarCalendario;
atualizarCalendario = function () {
    atualizarCalendarioOriginal();
    renderizarTarefas();
};

const estilosTarefas = document.createElement('style');
estilosTarefas.textContent = `
    .tarefa-evento {
        padding: 2px 5px;
        margin: 2px 0;
        border-radius: 3px;
        color: white;
        font-size: 12px;
        cursor: pointer; 
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: calc(100% - 10px); /* Ajusta para caber dentro da célula, considerando padding */
        box-sizing: border-box;
    }
    
    .tarefa-item-mes {
        width: 100%;
        text-align: left;
        padding: 1px 3px;
        margin: 1px 0;
        font-size: 10px;
    }
    
    .tarefas-container-mes {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-height: calc(100% - 20px);
        overflow-y: auto;
        margin-top: 2px;
    }
    
    .icone-recorrente {
        font-size: 10px;
        margin-left: 3px;
    }
    
    /* Ajustes para visualização semanal e diária */
    .visualizacao-semanal .celula-hora-diaria,
    .visualizacao-diaria .celula-hora-diaria {
        height: auto;
        min-height: 30px;
        position: relative;
        padding-right: 5px;
    }
    
    /* Ajustes específicos para visualização diária */
    .visualizacao-diaria .celula-hora-diaria {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    
    .visualizacao-diaria .celula-hora-diaria .indicador-hora-diaria {
        align-self: flex-start;
        margin-bottom: 3px; 
    }
    
    .visualizacao-diaria .tarefa-evento {
        width: 100%;
        max-width: calc(100% - 5px);
    }
    
    /* Container para tarefas dentro das células */
    .tarefas-container-celula {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin-top: 2px;
    }
    
    /* Estilos específicos para cores de texto */
    .tarefa-evento[style*="background-color: #B71C1C"],
    .tarefa-evento[style*="background-color: #F44336"] {
        color: white;
    }
    
    .tarefa-evento[style*="background-color: #FFEB3B"] {
        color: #212121; /* Texto escuro para fundo amarelo */
    }
    
    .tarefa-evento[style*="background-color: #4CAF50"],
    .tarefa-evento[style*="background-color: #8BC34A"] {
        color: white;
    }
`;
document.head.appendChild(estilosTarefas);

renderizarTarefas();

