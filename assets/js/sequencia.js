function htmlSequenciaTarefas() {
    // Aqui estou fazendo o fundo onde as tarefas em sequência ficarão
    let bgSequenciaTarefas = document.getElementById('sequenciaTarefas');
    bgSequenciaTarefas.classList.add("scrollbar");

    // Definindo estilos para o container com rolagem
    bgSequenciaTarefas.style.overflowY = 'scroll';


    bgSequenciaTarefas.innerHTML = `<div id="teste" class="p-2 my-2 rounded text-white" style="position: sticky; top: 0; ">Tarefas realizadas em sequência:</div>`;

    // Filtrando o JSON para trazer apenas as tarefas recorrentes
    let tarefasFiltradas = tarefas.filter(tarefas => tarefas.recorrencia != "Não repete");
    console.log(tarefasFiltradas);

    let ordemPrioridade = ["Muito alta", "Alta", "Média", "Baixa", "Muito baixa"];

    const tarefasOrdenadas = tarefasFiltradas.sort((a, b) => {
        return ordemPrioridade.indexOf(a.prioridade) - ordemPrioridade.indexOf(b.prioridade);
    });

    // Iterar o vetor de tarefasfiltradas para colocar as tarefas
    for (let i = 0; i < tarefasFiltradas.length; i++) {
        let tarefa = tarefasFiltradas[i];

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

        let htmlTarefasFiltradas = document.createElement('div');
        htmlTarefasFiltradas.className = `px-2`;
        htmlTarefasFiltradas.innerHTML = `<div style="background-color: ${corPrioridade}" class="d-flex justify-content-between align-items-center text-white rounded p-2 my-2">
            <div style="background-color: transparent;" class="fw-bold">${tarefa.titulo}</div>
            <div style="background-color: transparent;" class="d-flex align-items-center">
                <span class="me-2 fw-bold">${tarefa.sequencia}x</span>
                <img style="width: 25px; height: 25px;" src="assets/img/firewhite.png">
            </div>
        </div>`;

        bgSequenciaTarefas.appendChild(htmlTarefasFiltradas);
    }
}

document.addEventListener("DOMContentLoaded", htmlSequenciaTarefas);
