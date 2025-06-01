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
                "descrição": "concluindo com sucesso uma tarefa de prioridade MUITO ALTA",
            },
            {
                "id": 4,
                "conquista": "Nível 10",
                "descrição": "Você atingiu o nível 10, parabéns!",
            },
            {
                "id": 5,
                "conquista": "Nível 30",
                "descrição": "Você atingiu o nível 30, parabéns!"
            },
            {
                "id": 6,
                "conquista": "Nível 50",
                "descrição": "Você atingiu o nível 50, parabéns!"
            },
            {
                "id": 7,
                "conquista": "Nível 80",
                "descrição": "Você atingiu o nível 80, parabéns!"
            },
            {
                "id": 8,
                "conquista": "Nível 100",
                "descrição": "Você atingiu o nível 100, parabéns!"
            },
            {
                "id": 9,
                "conquista": "O início",
                "descrição": "Crie e complete sua primeira tarefa!",
            },
            {
                "id": 10,
                "conquista": "Sequência",
                "descrição": "Consiga sua primeira sequência em uma tarefa recorrent!",
            }
        ]
    };
    const btnconquistarandom = document.getElementById('conquistarandom');
    const container = document.getElementById('conquistas-container');

    /* Código comentado que poderia ser usado para exibir todas as conquistas de uma vez.

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

    */
    let idrandom = 0;
    // Procura no array de conquistas o objeto que possui id igual ao idrandom gerado aleatoriamente
    btnconquistarandom.addEventListener('click', () => {
        idrandom = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
        console.log("O Id aleatorio formado foi:" + idrandom);
        addconquista(idrandom);
    });

    function addconquista(idrandom) {
        let conquista = conquistasData.conquistas.find(c => c.id === idrandom);
        // Se encontrou a conquista com id aleatório, cria um card para ela
        if (conquista) {
            // Cria um novo elemento div para representar o card da conquista
            const card = document.createElement('div');
            // Adiciona a classe 'card' ao elemento criado para aplicar estilos CSS
            card.className = 'card';
            card.innerHTML = `
        <img src="img/conquista.png" alt="Ícone Conquista" class="card-image">
        <div class="card-content">
            <p class="card-heading">${conquista.conquista}</p>
            <p class="card-body">${conquista.descrição}</p>
        </div>
    `;
            container.appendChild(card);
        }
    }
});
