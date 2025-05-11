let tasks = JSON.parse(localStorage.getItem("tasks")) || [
    { id: 1, text: "Fazer compras", completed: false },
    { id: 2, text: "Trocar cordas violão", completed: false },
    { id: 3, text: "Enviar e-mail", completed: false },
    { id: 4, text: "Tomar água", completed: false },
    { id: 5, text: "Limpar computador", completed: true }
];

function toggleSwitch(elem) {
    elem.classList.toggle('active');

    let todoContainer = document.querySelector('.todo-container');
    let overlay = document.getElementById('overlay');

    if (!todoContainer) {
        createTodoList();
        todoContainer = document.querySelector('.todo-container');
    }

    const isActive = elem.classList.contains('active');
    todoContainer.style.display = isActive ? 'block' : 'none';
    overlay.style.display = isActive ? 'block' : 'none';
}

function createTodoList() {
    const app = document.getElementById('todolist');
    if (!app) {
        console.error("Elemento #todolist não encontrado!");
        return;
    }

    app.innerHTML = "";

    const container = document.createElement('div');
    container.className = 'todo-container';

    const h2 = document.createElement('h2');
    h2.innerText = 'To do List';
    h2.className = 'titulotodolist';
    container.appendChild(h2);

    const botaoadicionar = document.createElement("button");
    botaoadicionar.innerText = "Adicionar";
    botaoadicionar.className = 'btn-add';
    botaoadicionar.addEventListener("click", adicionartarefa);
    container.appendChild(botaoadicionar);

    const formContainer = document.createElement('div');
    formContainer.id = "form-container";
    container.appendChild(formContainer);

    const todoList = document.createElement('ul');
    todoList.id = 'todo-list';

    const completedList = document.createElement('ul');
    completedList.id = 'completed-list';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${task.text}</span>
            <button class="options">⋮</button>
        `;

        const checkbox = li.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            createTodoList();
        });

        const optionsButton = li.querySelector('.options');
        optionsButton.addEventListener('click', () => editartarefa(li, task));

        if (task.completed) {
            li.classList.add('completed');
            completedList.appendChild(li);
        } else {
            todoList.appendChild(li);
        }
    });

    container.appendChild(todoList);

    const hr = document.createElement('hr');
    hr.className = 'divider-todolist';
    container.appendChild(hr);

    const h3 = document.createElement('h3');
    h3.innerText = 'Concluídas';
    container.appendChild(h3);

    container.appendChild(completedList);

    app.appendChild(container);
}

function adicionartarefa() {
    const formContainer = document.getElementById("form-container");
    formContainer.innerHTML = "";

    const form = document.createElement('div');
    form.className = 'task-form';

    form.innerHTML = `
        <input type="text" id="task-name" placeholder="Nomeie essa nova tarefa!">
        <button id="confirm-task">✔</button>
        <button id="cancel-task">✖</button>
    `;

    formContainer.appendChild(form);

    document.getElementById('confirm-task').addEventListener('click', addTask);
    document.getElementById('cancel-task').addEventListener('click', () => form.remove());
}

function addTask() {
    const taskName = document.getElementById('task-name').value.trim();
    if (taskName === "") return;

    const newTask = { id: tasks.length + 1, text: taskName, completed: false };
    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    createTodoList();
}

function editartarefa(li, task) {
    const optionsexistentes = li.querySelector('.edit-options');

    if (optionsexistentes) {
        optionsexistentes.remove();
        return;
    }

    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'edit-options';

    optionsContainer.innerHTML = `
        <button class="edit-task">✏️</button>
        <button class="delete-task">🗑</button>
    `;

    li.insertBefore(optionsContainer, li.querySelector('.options'));

    optionsContainer.querySelector('.edit-task').addEventListener('click', () => editarTask(li, task));
    optionsContainer.querySelector('.delete-task').addEventListener('click', () => excluirTask(task));
}

function editarTask(li, task) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = task.text;
    input.className = 'edit-input';

    const saveButton = document.createElement('button');
    saveButton.innerText = "Salvar";
    saveButton.className = 'save-btn';

    const cancelButton = document.createElement('button');
    cancelButton.innerText = "Cancelar";
    cancelButton.className = 'cancel-btn';

    li.innerHTML = "";
    li.appendChild(input);
    li.appendChild(saveButton);
    li.appendChild(cancelButton);

    saveButton.addEventListener('click', () => {
        task.text = input.value.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        createTodoList();
    });

    cancelButton.addEventListener('click', () => {
        createTodoList();
    });
}

function excluirTask(task) {
    tasks = tasks.filter(t => t.id !== task.id);


    tasks.forEach((t, index) => t.id = index + 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    createTodoList();
}