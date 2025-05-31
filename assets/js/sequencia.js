function htmlSequenciaTarefas() {

    // Aqui estou fazendo o fundo onde as tarefas em sequência ficarão 

    let bgSequenciaTarefas = document.getElementById('sequenciaTarefas');
    bgSequenciaTarefas.innerHTML = `<div class="p-2 my-2 rounded text-white">Tarefas realizadas em sequência:</div>`

    // Filtrando o JSON para trazer apenas as tarefas recorrentes

    let  tarefasFiltradas = tarefas.filter(tarefas => tarefas.recorrencia != "Não repete");
    console.log(tarefasFiltradas);

    // iterar o vetor de tarefasfiltradas para colocar as taerfas

    for(let i = 0; i < tarefasFiltradas.length; i++){
       let tarefa = tarefasFiltradas[i];

        let htmlTarefasFiltradas = document.createElement('div');        
        htmlTarefasFiltradas.className = `px-2` 
        htmlTarefasFiltradas.innerHTML = `<div class="p-2 my-2 rounded text-white bg-primary">${tarefa.titulo}</div> ${tarefa.sequencia}</div>`

        bgSequenciaTarefas.appendChild(htmlTarefasFiltradas);
    }

}




document.addEventListener("DOMContentLoaded", htmlSequenciaTarefas);




