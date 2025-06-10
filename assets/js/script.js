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

// Função para renderizar tarefas no calendário (tive que mudar, do outro jeito não deu certo)
function renderizarTarefas() {
    // Limpar quaisquer tarefas previamente renderizadas
    const tarefasExistentes = document.querySelectorAll('.tarefa-evento');
    tarefasExistentes.forEach(tarefa => tarefa.remove());

    // Percorrer todas as tarefas
    tarefas.forEach(tarefa => {
        // Verificar se tarefa.hora existe antes de usar replace()
        const horaFormatada = tarefa.hora ? tarefa.hora.replace('Z', '') : '00:00';
        
        // Converter a data e hora da tarefa para um objeto Date
        const dataTarefa = new Date(tarefa.data + 'T' + horaFormatada);
        const diaTarefa = dataTarefa.getDate();
        const mesTarefa = dataTarefa.getMonth();
        const anoTarefa = dataTarefa.getFullYear();
        const horaTarefa = dataTarefa.getHours();

        // Formatar a data para corresponder ao formato usado nos atributos data-data
        const dataFormatada = `${anoTarefa}-${(mesTarefa + 1).toString().padStart(2, '0')}-${diaTarefa.toString().padStart(2, '0')}`;
        const horaFormatadaDisplay = horaTarefa.toString().padStart(2, '0') + ":00";

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

        // Determinar o estiloocom base no status de realização
        const estiloRealizada = tarefa.realizada ? "text-decoration: line-through; opacity: 0.7;" : "";

        // Buscar a célula correspondente à data e hora da tarefa
        if (modoVisualizacao === "dia") {
            const celula = document.querySelector(`.celula-hora-diaria[data-data="${dataFormatada}"][data-hora="${horaFormatadaDisplay}"]`);
            if (celula) {
                adicionarTarefaNaCelula(celula, tarefa, corPrioridade, estiloRealizada);
            }
        } else if (modoVisualizacao === "semana") {
            const celula = document.querySelector(`.celula-hora-diaria[data-data="${dataFormatada}"][data-hora="${horaFormatadaDisplay}"]`);
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

// Função auxiliar para adicionar uma tarefa a uma célula (para visualizações diária e semanal)
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


// Atualizar as funções do calendário para chamar renderizarTarefas após renderizar o calendário
const atualizarCalendarioOriginal = atualizarCalendario;
atualizarCalendario = function () {
    atualizarCalendarioOriginal();
    renderizarTarefas();
};

// Adicionar estilos CSS para as tarefas
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

// Array para armazenar todas as tarefas
let tarefas = [];
let tarefaEditandoId = null;

// IDs para as tarefas (controle interno)
let proximoIdTarefa = 1;

// Ao carregar a página, carregar tarefas do localStorage se existirem
document.addEventListener("DOMContentLoaded", () => {
    carregarTarefasDoLocalStorage();
    criarModalTarefa();
});

// Função para carregar tarefas do localStorage
function carregarTarefasDoLocalStorage() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
        // Encontrar o maior ID para continuar a sequência
        if (tarefas.length > 0) {
            const maiorId = Math.max(...tarefas.map(tarefa => tarefa.id));
            proximoIdTarefa = maiorId + 1;
        }
    }
}

// Função para salvar tarefas no localStorage
function salvarTarefasNoLocalStorage() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Função para criar o modal de tarefa
function criarModalTarefa() {
    // Verificar se o modal já existe
    let modalExistente = document.getElementById("modalTarefa");
    if (modalExistente) {
        // Se o modal já existe, remover para recriar limpo
        modalExistente.remove();
    }

    // Criar elemento do modal
    const modalDiv = document.createElement('div');
    modalDiv.className = 'modal fade';
    modalDiv.id = 'modalTarefa';
    modalDiv.tabIndex = '-1';
    modalDiv.setAttribute('aria-labelledby', 'modalTarefaLabel');
    modalDiv.setAttribute('aria-hidden', 'true');

    modalDiv.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTarefaLabel">Nova Tarefa</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>
                <div class="modal-body">
                    <form id="formTarefa">
                        <div class="mb-3">
                            <label for="tituloTarefa" class="form-label">Título</label>
                            <input type="text" class="form-control" id="tituloTarefa" required>
                        </div>
                        <div class="row mb-3">
                            <div class="col">
                                <label for="dataTarefa" class="form-label">Data</label>
                                <input type="date" class="form-control" id="dataTarefa" required>
                            </div>
                            <div class="col">
                                <label for="horaTarefa" class="form-label">Horário</label>
                                <input type="time" class="form-control" id="horaTarefa" required>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="prioridadeTarefa" class="form-label">Prioridade</label>
                            <select class="form-select" id="prioridadeTarefa" required>
                                <option value="Muito baixa">Muito baixa</option>
                                <option value="Baixa">Baixa</option>
                                <option value="Média" selected>Média</option>
                                <option value="Alta">Alta</option>
                                <option value="Muito alta">Muito alta</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="descricaoTarefa" class="form-label">Descrição</label>
                            <textarea class="form-control" id="descricaoTarefa" rows="3"></textarea>
                        </div>
                    </form>
                    <div id="areaBotaoConcluido" class="d-none">
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="tarefaRealizada">
                            <label class="form-check-label" for="tarefaRealizada">Tarefa realizada</label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-danger" id="btnExcluirTarefa">Excluir</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" id="btnSalvarTarefa">Salvar</button>
                </div>
            </div>
        </div>
    `;

    // Adicionar o modal ao corpo do documento
    document.body.appendChild(modalDiv);

    // Inicializar o modal do Bootstrap
    const modal = new bootstrap.Modal(document.getElementById('modalTarefa'));

    // Configurar eventos
    const btnSalvar = document.getElementById('btnSalvarTarefa');
    const btnExcluir = document.getElementById('btnExcluirTarefa');
    const formTarefa = document.getElementById('formTarefa');

    btnSalvar.addEventListener('click', () => {
        console.log("Botão salvar clicado");
        if (formTarefa.checkValidity()) {
            salvarTarefa();
            modal.hide();
        } else {
            formTarefa.reportValidity();
        }
    });

    btnExcluir.addEventListener('click', () => {
        if (tarefaEditandoId !== null) {
            excluirTarefa(tarefaEditandoId);
            modal.hide();
        }
    });

    // Ajustar estado do botão excluir quando o modal é aberto
    document.getElementById('modalTarefa').addEventListener('show.bs.modal', function (event) {
        const botaoExcluir = document.getElementById('btnExcluirTarefa');
        const areaBotaoConcluido = document.getElementById('areaBotaoConcluido');
        
        if (tarefaEditandoId !== null) {
            document.getElementById('modalTarefaLabel').textContent = 'Editar Tarefa';
            botaoExcluir.classList.remove('d-none');
            areaBotaoConcluido.classList.remove('d-none');
        } else {
            document.getElementById('modalTarefaLabel').textContent = 'Nova Tarefa';
            botaoExcluir.classList.add('d-none');
            areaBotaoConcluido.classList.add('d-none');
        }
    });
}

// Função para abrir o modal para adicionar uma nova tarefa em uma data específica
function abrirModalNovaTarefa(data, hora = '08:00') {
    tarefaEditandoId = null; // Indicar que estamos criando uma nova tarefa
    
    // Garantir que o modal seja criado ou recriado para ter os listeners corretos
    criarModalTarefa();
    
    // Formatar a data para o input date
    const dataFormatada = formatarDataParaInput(data);
    
    // Limpar e configurar o formulário para uma nova tarefa
    document.getElementById('tituloTarefa').value = '';
    document.getElementById('dataTarefa').value = dataFormatada;
    document.getElementById('horaTarefa').value = hora + ':00';
    document.getElementById('prioridadeTarefa').value = 'Média';
    document.getElementById('descricaoTarefa').value = '';
    
    // Esconder botão de excluir para novas tarefas
    document.getElementById('btnExcluirTarefa').classList.add('d-none');
    
    // Abrir o modal
    const modalTarefa = new bootstrap.Modal(document.getElementById('modalTarefa'));
    modalTarefa.show();
}

// Função para abrir o modal de edição de tarefa
function abrirModalEditarTarefa(idTarefa) {
    const tarefa = tarefas.find(t => t.id === idTarefa);
    if (!tarefa) return;
    
    // Garantir que o modal seja criado ou recriado para ter os listeners corretos
    criarModalTarefa();
    
    tarefaEditandoId = idTarefa; // Armazenar o ID da tarefa que está sendo editada
    
    // Preencher o formulário com os dados da tarefa
    document.getElementById('tituloTarefa').value = tarefa.titulo;
    document.getElementById('dataTarefa').value = tarefa.data;
    document.getElementById('horaTarefa').value = tarefa.hora;
    document.getElementById('prioridadeTarefa').value = tarefa.prioridade;
    document.getElementById('descricaoTarefa').value = tarefa.descricao || '';
    document.getElementById('tarefaRealizada').checked = tarefa.realizada || false;
    
    // Mostrar botão de excluir para edição de tarefas
    document.getElementById('btnExcluirTarefa').classList.remove('d-none');
    document.getElementById('areaBotaoConcluido').classList.remove('d-none');
    
    // Abrir o modal
    const modalTarefa = new bootstrap.Modal(document.getElementById('modalTarefa'));
    modalTarefa.show();
}

// Função para salvar uma tarefa (nova ou editada)
function salvarTarefa() {
    const titulo = document.getElementById('tituloTarefa').value;
    const data = document.getElementById('dataTarefa').value;
    const hora = document.getElementById('horaTarefa').value;
    const prioridade = document.getElementById('prioridadeTarefa').value;
    const descricao = document.getElementById('descricaoTarefa').value;
    const realizada = document.getElementById('tarefaRealizada')?.checked || false;
    
    if (tarefaEditandoId !== null) {
        // Editar tarefa existente
        const index = tarefas.findIndex(t => t.id === tarefaEditandoId);
        if (index !== -1) {
            tarefas[index] = {
                ...tarefas[index],
                titulo,
                data,
                hora,
                prioridade,
                descricao,
                realizada
            };
        }
    } else {
        // Criar nova tarefa
        const novaTarefa = {
            id: proximoIdTarefa++,
            titulo,
            data,
            hora,
            prioridade,
            descricao,
            realizada: false
        };
        tarefas.push(novaTarefa);
    }
    
    // Salvar no localStorage
    salvarTarefasNoLocalStorage();
    
    // Atualizar visualização do calendário
    renderizarTarefas();
    
    // Limpar variável de controle
    tarefaEditandoId = null;
}

// Função para excluir uma tarefa
function excluirTarefa(idTarefa) {
    const index = tarefas.findIndex(t => t.id === idTarefa);
    if (index !== -1) {
        tarefas.splice(index, 1);
        
        // Salvar no localStorage
        salvarTarefasNoLocalStorage();
        
        // Atualizar visualização do calendário
        renderizarTarefas();
    }
}

// Função auxiliar para formatar a data para o input date (YYYY-MM-DD)
function formatarDataParaInput(data) {
    const d = new Date(data);
    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

// Função para exibir detalhes da tarefa quando clicada
function mostrarDetalhesTarefa(tarefa) {
    abrirModalEditarTarefa(tarefa.id);
}

// Adicionar evento de clique nas células do calendário
function configurarEventosCalendario() {
    // Configurar eventos para calendário mensal
    document.querySelectorAll('.cardDiaCalendario').forEach(celula => {
        // Remover qualquer evento de clique existente para evitar duplicação
        celula.removeEventListener('dblclick', celula.eventoCliqueCalendario);
        
        // Adicionar novo evento de duplo clique
        celula.eventoCliqueCalendario = function(e) {
            // Ignorar se o clique foi em uma tarefa existente
            if (e.target.closest('.tarefa-evento')) return;
            
            // Obter o número do dia clicado
            const diaTexto = this.querySelector('div')?.textContent;
            if (!diaTexto || isNaN(parseInt(diaTexto))) return;
            
            const dia = parseInt(diaTexto);
            const ano = dataAtualCalendario.getFullYear();
            const mes = dataAtualCalendario.getMonth();
            
            // Verificar se o dia pertence ao mês atual
            // Se o dia tem cor cinza (dias do mês anterior ou próximo), não adicionar tarefa
            if (this.querySelector('div[style*="color: gray"]')) return;
            
            const data = new Date(ano, mes, dia);
            abrirModalNovaTarefa(data);
        };
        
        celula.addEventListener('dblclick', celula.eventoCliqueCalendario);
    });
    
    // Configurar eventos para calendário diário e semanal
    document.querySelectorAll('.celula-hora-diaria').forEach(celula => {
        // Remover qualquer evento de clique existente para evitar duplicação
        celula.removeEventListener('dblclick', celula.eventoCliqueCalendario);
        
        // Adicionar novo evento de duplo clique
        celula.eventoCliqueCalendario = function(e) {
            // Ignorar se o clique foi em uma tarefa existente
            if (e.target.closest('.tarefa-evento')) return;
            
            // Obter a data e hora da célula
            const dataStr = this.dataset.data;
            const horaStr = this.dataset.hora;
            
            if (!dataStr) return;
            
            const data = new Date(dataStr);
            abrirModalNovaTarefa(data, horaStr?.split(':')[0] || '08');
        };
        
        celula.addEventListener('dblclick', celula.eventoCliqueCalendario);
    });
    
    // Configurar cliques em tarefas existentes
    document.querySelectorAll('.tarefa-evento').forEach(tarefaEl => {
        tarefaEl.addEventListener('click', function(e) {
            e.stopPropagation(); // Impedir propagação do evento
            
            const idTarefa = parseInt(this.getAttribute('data-id-tarefa'));
            if (!isNaN(idTarefa)) {
                const tarefa = tarefas.find(t => t.id === idTarefa);
                if (tarefa) {
                    mostrarDetalhesTarefa(tarefa);
                }
            }
        });
    });
}

// Atualizar a função original de renderização de calendário para adicionar os eventos de clique
const atualizarCalendarioOriginal2 = atualizarCalendario;
atualizarCalendario = function() {
    atualizarCalendarioOriginal2();
    // Adicionar um pequeno atraso para garantir que o DOM foi atualizado
    setTimeout(() => {
        configurarEventosCalendario();
    }, 100);
};

// Chamar renderizarTarefas para exibir as tarefas já existentes
renderizarTarefas();

// Função para atualizar a exibição de tarefas com prioridade alta
function atualizarTarefasPrioridadeAlta() {
    const container = document.getElementById('tarefasPrioridadeAlta');
    if (!container) return;
    
    // Filtrar tarefas com prioridade "Alta" e "Muito alta"
    const tarefasAlta = tarefas.filter(tarefa => 
        tarefa.prioridade === "Alta" || tarefa.prioridade === "Muito alta"
    );
    
    // Limpar conteúdo anterior
    container.innerHTML = '';
    
    if (tarefasAlta.length === 0) {
        container.innerHTML = '<p class="text-muted small">Nenhuma tarefa com prioridade alta</p>';
        return;
    }
    
    // Ordenar por data e hora
    tarefasAlta.sort((a, b) => {
        const dataA = new Date(a.data + 'T' + a.hora);
        const dataB = new Date(b.data + 'T' + b.hora);
        return dataA - dataB;
    });
    
    // Criar elementos para cada tarefa
    tarefasAlta.forEach(tarefa => {
        const tarefaElement = document.createElement('div');
        tarefaElement.className = 'tarefa-prioridade-item';
        tarefaElement.setAttribute('data-id-tarefa', tarefa.id);
        
        // Formatar data e hora
        const dataTarefa = new Date(tarefa.data + 'T' + tarefa.hora);
        const dataFormatada = dataTarefa.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit'
        });
        const horaFormatada = dataTarefa.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Determinar cor baseada na prioridade
        const corPrioridade = tarefa.prioridade === "Muito alta" ? "#B71C1C" : "#F44336";
        
        // Estilo para tarefas realizadas
        const estiloRealizada = tarefa.realizada ? "text-decoration: line-through; opacity: 0.7;" : "";
        
        tarefaElement.innerHTML = `
            <div class="tarefa-prioridade-header" style="background-color: ${corPrioridade};">
                <span class="tarefa-prioridade-badge">${tarefa.prioridade}</span>
                <span class="tarefa-prioridade-data">${dataFormatada} ${horaFormatada}</span>
            </div>
            <div class="tarefa-prioridade-content">
                <div class="tarefa-prioridade-titulo" style="${estiloRealizada}">${tarefa.titulo}</div>
                ${tarefa.descricao ? `<div class="tarefa-prioridade-descricao">${tarefa.descricao}</div>` : ''}
            </div>
        `;
        
        // Adicionar evento de clique
        tarefaElement.addEventListener('click', () => {
            mostrarDetalhesTarefa(tarefa);
        });
        
        container.appendChild(tarefaElement);
    });
}

// Atualizar a função de renderização para incluir as tarefas de prioridade alta
const atualizarCalendarioOriginal3 = atualizarCalendario;
atualizarCalendario = function() {
    atualizarCalendarioOriginal3();
    setTimeout(() => {
        atualizarTarefasPrioridadeAlta();
    }, 100);
};

// Atualizar as tarefas de prioridade alta quando uma tarefa for salva ou excluída
const salvarTarefaOriginal = salvarTarefa;
salvarTarefa = function() {
    salvarTarefaOriginal();
    atualizarTarefasPrioridadeAlta();
};

const excluirTarefaOriginal = excluirTarefa;
excluirTarefa = function(idTarefa) {
    excluirTarefaOriginal(idTarefa);
    atualizarTarefasPrioridadeAlta();
};

// Chamar a função ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        atualizarTarefasPrioridadeAlta();
    }, 200);
});

const estilosTarefasPrioridade = document.createElement('style');
estilosTarefasPrioridade.textContent = `
    .tarefa-prioridade-item {
        background: white;
        border-radius: 8px;
        margin-bottom: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .tarefa-prioridade-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
    
    .tarefa-prioridade-header {
        padding: 6px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        font-size: 11px;
        font-weight: bold;
    }
    
    .tarefa-prioridade-badge {
        background: rgba(255,255,255,0.2);
        padding: 2px 6px;
        border-radius: 12px;
        font-size: 10px;
    }
    
    .tarefa-prioridade-data {
        font-size: 10px;
        opacity: 0.9;
    }
    
    .tarefa-prioridade-content {
        padding: 8px 10px;
    }
    
    .tarefa-prioridade-titulo {
        font-weight: bold;
        font-size: 13px;
        color: #333;
        margin-bottom: 4px;
    }
    
    .tarefa-prioridade-descricao {
        font-size: 11px;
        color: #666;
        line-height: 1.3;
    }
    
    #tarefasPrioridadeAlta {
        max-height: 200px;
        overflow-y: auto;
        padding-right: 5px;
    }
    
    #tarefasPrioridadeAlta::-webkit-scrollbar {
        width: 6px;
    }
    
    #tarefasPrioridadeAlta::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
    }
    
    #tarefasPrioridadeAlta::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 3px;
    }
    
    #tarefasPrioridadeAlta::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;
document.head.appendChild(estilosTarefasPrioridade);