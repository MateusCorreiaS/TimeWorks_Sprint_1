const tasks = [
    { id: 1, text: "Fazer compras", completed: false },
    { id: 2, text: "Trocar cordas violão", completed: false },
    { id: 3, text: "Enviar e-mail", completed: false },
    { id: 4, text: "Tomar água", completed: false },
    { id: 5, text: "Limpar computador", completed: true }
];

const app = document.getElementById('todolist');


function createTodoList() {
    const container = document.createElement('div');
    container.className = 'todo-container';

    const h2 = document.createElement('h2');
    h2.innerText = 'To do List';
    container.appendChild(h2);

    const todoList = document.createElement('ul');
    todoList.id = 'todo-list';

    const completedList = document.createElement('ul');
    completedList.id = 'completed-list';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                        <span>${task.text}</span>
                        <button class="options">⋮</button>`;

        const checkbox = li.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            if (task.completed) {
                li.classList.add('completed');
                completedList.appendChild(li);
            } else {
                li.classList.remove('completed');
                todoList.appendChild(li);
            }
        });

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


function render() {
    createTodoList();
}


render();
