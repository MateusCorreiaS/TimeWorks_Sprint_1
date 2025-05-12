//Os cards de conquistas são inseridos por este javascript que puxa dos dados do conquistas.json
document.addEventListener('DOMContentLoaded', () => {
    fetch('assets/js/conquistas.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('conquistas-container');

            data.conquistas.forEach(conquista => {
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
        })
        .catch(error => console.error('Erro ao carregar conquistas:', error));
});