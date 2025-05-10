/* Função que usei para carregar o calendário sempre que o HTML for carregado. */

let tarefas = {}; //tive que mudar a ordem das declarações pq tava dando erro
let modoVisualizacao = "mes";
let dataAtualCalendario = new Date();
let dataHoje = new Date();
let diaHoje = dataHoje.getDate();
let mesHoje = dataHoje.getMonth();
let anoHoje = dataHoje.getFullYear();

document.addEventListener("DOMContentLoaded", loadCalendarioMensal);
atualizarBotaoCalendario(modoVisualizacao);


function loadCalendarioMensal() {
    let blocosCalendario = document.getElementById("canvaCalendario");
    blocosCalendario.innerHTML = ``;

    let ano = dataAtualCalendario.getFullYear();
    let mes = dataAtualCalendario.getMonth();

    let quantidadeDiasMesAtual = new Date(ano, mes + 1, 0).getDate();
    let primerioDiaMes = new Date(ano, mes, 1).getDay();
    let diasMesAnterior = new Date(ano, mes, 0).getDate();
    let difDiasProxMes = 42 - quantidadeDiasMesAtual - primerioDiaMes;

    // Dias do mês anterior
    for (let i = primerioDiaMes - 1; i >= 0; i--) {
        let diaAnterior = document.createElement('div');
        diaAnterior.classList.add('cardDiaCalendario');
        diaAnterior.innerHTML = `<div style="color: gray">${diasMesAnterior - i}</div>`;
        blocosCalendario.appendChild(diaAnterior);
    }

    // Dias do mês atual
    for (let i = 1; i <= quantidadeDiasMesAtual; i++) {
        let diasCalendario = document.createElement('div');
        diasCalendario.classList.add('cardDiaCalendario', 'dia');

        let indiceIgualHoje = i === diaHoje && mes === mesHoje && ano === anoHoje;
        let dataFormatada = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

        diasCalendario.setAttribute("data-dia", dataFormatada);

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

    // Dias do próximo mês
    for (let i = 0; i < difDiasProxMes; i++) {
        let proximoMes = document.createElement('div');
        proximoMes.classList.add('cardDiaCalendario');
        proximoMes.innerHTML = `<div style="color: gray">${i + 1}</div>`;
        blocosCalendario.appendChild(proximoMes);
    }

    adicionarEventosDiasCalendario();
    renderizarTarefas();
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

/* Sumir botões das visualização semanal mensal e diario*/

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

// Adiciona evento de clique nos dias após o calendário ser carregado
function adicionarEventosDiasCalendario() {
    document.querySelectorAll(".cardDiaCalendario[data-dia]").forEach(diaElemento => {
        diaElemento.addEventListener("click", () => {
            const dataFormatada = diaElemento.getAttribute("data-dia");
            document.getElementById("dataSelecionada").value = dataFormatada;

            const modal = new bootstrap.Modal(document.getElementById('modalTarefa'));
            modal.show();
        });
    });
}


// Recria os dias com as tarefas após atualização
function renderizarTarefas() {
    document.querySelectorAll(".tarefa-no-calendario").forEach(el => el.remove());

    for (const data in tarefas) {
        const tarefasDoDia = tarefas[data];
        const diaElement = document.querySelector(`.cardDiaCalendario[data-dia='${data}']`);

        if (diaElement) {
            tarefasDoDia.forEach((tarefa, index) => {
                const div = document.createElement("div");
                div.classList.add("tarefa-no-calendario");

                // Cor por prioridade
                switch (tarefa.prioridade) {
                    case "alta":
                    case "muito alta":
                        div.style.backgroundColor = "#f44336"; break;
                    case "media":
                        div.style.backgroundColor = "#ffeb3b";
                        div.style.color = "#000"; break;
                    default:
                        div.style.backgroundColor = "#4caf50"; break;
                }

                div.style.marginTop = "4px";
                div.style.padding = "2px 4px";
                div.style.borderRadius = "4px";
                div.style.fontSize = "12px";
                div.textContent = tarefa.titulo;

                // Tornar tarefa clicável para edição
                div.addEventListener("click", (e) => {
                    e.stopPropagation(); // Impedir propagação para o dia

                    document.getElementById("dataSelecionada").value = data;
                    document.getElementById("tituloTarefa").value = tarefa.titulo;
                    document.getElementById("descricaoTarefa").value = tarefa.descricao;
                    document.getElementById("prioridadeTarefa").value = tarefa.prioridade;

                    // Guardar o índice atual
                    document.getElementById("formTarefa").dataset.editIndex = index;

                    // Mostrar os botões de edição e exclusão
                    document.getElementById("botaoSalvar").style.display = "none";
                    document.getElementById("botaoEditar").style.display = "inline-block";
                    document.getElementById("botaoExcluir").style.display = "inline-block";

                    // Exibir o modal
                    const modal = new bootstrap.Modal(document.getElementById('modalTarefa'));
                    modal.show();
                });

                diaElement.appendChild(div);
            });
        }
    }
}

// Submissão do formulário para inserir nova tarefa
document.addEventListener("DOMContentLoaded", function () {
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

    atualizarCalendario();
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalTarefa'));
    modal.hide();
    e.target.reset();
  });
});

//editar
document.getElementById("botaoEditar").addEventListener("click", () => {
    const data = document.getElementById("dataSelecionada").value;
    const titulo = document.getElementById("tituloTarefa").value;
    const descricao = document.getElementById("descricaoTarefa").value;
    const prioridade = document.getElementById("prioridadeTarefa").value;
    const index = document.getElementById("formTarefa").dataset.editIndex;

    if (tarefas[data] && tarefas[data][index] !== undefined) {
        tarefas[data][index] = { titulo, descricao, prioridade };

        // Re-renderizar o calendário
        renderizarTarefas();

        // Fechar o modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalTarefa'));
        modal.hide();
    }
});

//excluir
document.getElementById("botaoExcluir").addEventListener("click", () => {
    const data = document.getElementById("dataSelecionada").value;
    const index = document.getElementById("formTarefa").dataset.editIndex;

    if (tarefas[data] && tarefas[data][index] !== undefined) {
        tarefas[data].splice(index, 1);  // Remove a tarefa

        // Re-renderizar o calendário
        renderizarTarefas();

        // Fechar o modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalTarefa'));
        modal.hide();
    }
});



// Função para limpar o estado do formulário
function limparEstadoFormulario() {
  document.getElementById("formTarefa").reset();
  delete document.getElementById("formTarefa").dataset.editIndex;

  // Esconder os botões de edição e exclusão, mostrar o de salvar
  document.getElementById("botaoSalvar").style.display = "inline-block";
  document.getElementById("botaoEditar").style.display = "none";
  document.getElementById("botaoExcluir").style.display = "none";
}

// Função para atualizar o calendário
function atualizarCalendario() {
  renderizarTarefas();
  // Se necessário, pode adicionar lógica extra aqui para atualizar o mês ou a visualização
}

console.log("Tarefas salvas:", tarefas);
