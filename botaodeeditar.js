document.addEventListener('DOMContentLoaded', function() {
    // Carrega dados salvos localmente
    let userData = localStorage.getItem('userData') 
        ? JSON.parse(localStorage.getItem('userData'))
        : {
            name: "Usuário-teste",
            id: "#000000",
            level: "Lv100",
            profilePic: "img/man.png"
        };

    // Elementos do DOM
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const editModal = document.getElementById('edit-modal');
    const closeEditModal = document.querySelector('.close-edit-modal');
    const saveChangesBtn = document.getElementById('save-changes-btn');
    const usernameInput = document.getElementById('username-input');
    
    // Elementos de exibição
    const usernameDisplay = document.querySelector('.username');
    const useridDisplay = document.querySelector('.userid');
    const userlevelDisplay = document.querySelector('.userlevel');
    const profileImg = document.querySelector('.imgperfil');
    const openModalImg = document.querySelector('.openmodalimg');

    // Função para atualizar a exibição
    function updateProfileDisplay() {
        usernameDisplay.textContent = userData.name;
        useridDisplay.textContent = userData.id;
        userlevelDisplay.textContent = userData.level;
        profileImg.src = userData.profilePic;
        openModalImg.src = userData.profilePic;
    }

    // Inicializa a exibição
    updateProfileDisplay();

    // Configuração das opções de foto de perfil
    const profileOptions = document.querySelectorAll('.profile-option');
    let selectedProfilePic = userData.profilePic;

    // Seleciona a foto atual quando o modal abre
    editProfileBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        usernameInput.value = userData.name;
        editModal.style.display = 'flex';
        
        // Marca a foto atual como selecionada
        profileOptions.forEach(option => {
            option.classList.remove('selected');
            if (option.getAttribute('data-value') === userData.profilePic) {
                option.classList.add('selected');
            }
        });
    });

    // Seleção de novas fotos
    profileOptions.forEach(option => {
        option.addEventListener('click', function() {
            profileOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedProfilePic = this.getAttribute('data-value');
        });
    });

    // Salva as alterações feitas pelo usuário
    saveChangesBtn.addEventListener('click', function() {
        userData.name = usernameInput.value || userData.name;
        userData.profilePic = selectedProfilePic || userData.profilePic;
        localStorage.setItem('userData', JSON.stringify(userData));
        updateProfileDisplay();
        editModal.style.display = 'none';
    });

    // Fecha o popup de edição
    closeEditModal.addEventListener('click', function() {
        editModal.style.display = 'none';
    });
});