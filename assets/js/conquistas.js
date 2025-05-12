document.addEventListener('DOMContentLoaded', () => {
    const conquistasData = {
        "conquistas": [
            {
                "id": 1,
                "conquista": "2 SEMANAS",
                "descrição": "concluindo com sucesso uma tarefa recorrente de prioridade MUITO ALTA"
            },
            {
                "id": 2,
                "conquista": "2 SEMANAS",
                "descrição": "concluindo com sucesso uma tarefa de prioridade ALTA"
            },
            {
                "id": 3,
                "conquista": "1 MÊS",
                "descrição": "concluindo com sucesso uma tarefa de prioridade MUITO ALTA"
            }
        ]
    };

    const container = document.getElementById('conquistas-container');

    conquistasData.conquistas.forEach(conquista => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <img src="img/conquista.png" alt="Ícone Conquista" class="card-image">
            <div class="card-content">
                <p class="card-heading">${conquista.conquista}</p>
                <p class="card-body">${conquista.descrição}</p>
            </div>
        `;

        container.appendChild(card);
    });
});