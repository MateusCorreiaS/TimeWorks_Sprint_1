document.addEventListener('DOMContentLoaded', function () {
    //Inicializa ou retoma os dados do localStorage
    let userData = JSON.parse(localStorage.getItem("userData")) || {
        xp: 0,
        level: 1,
        barradexp: "img/xp0.png",
    };


    let xpToNextLevel = 100;
    let calcpercent = 0;


    const xpElement = document.querySelector(".userxp");
    const setxp = document.getElementById("setxp");
    const levelElement = document.getElementById("userlevel");
    const xpbarelement = document.querySelector(".xpbarimage");
    const xppercentElement = document.querySelector(".xpbartext");
    updateTXT();
    console.log("XP:" + userData.xp);

    //Função para calcular o XP necessário para o próximo nível (ainda existem ajustes de balanceamento a serem feitos)
    function calXpNextLv(level) {
        xpToNextLevel = Math.floor(100 * Math.pow(level, 1.3));

        console.log("Xp pra upar: " + xpToNextLevel);
    }

    //Função para atualizar o texto da quantidade de xp exibida na tela (Analisar se vai ser exibido assim ou será somente a barra de XP)
    function updateTXT() {
        xpElement.innerHTML = `XP: ${userData.xp}`;
        levelElement.innerHTML = `Nível: ${userData.level}`;
    }

    // Função para adicionar 10 de XP e chamar a função de atualizar o texto e a barra de xp
    function addXp(amount) {
        userData.xp += amount;
        localStorage.setItem("userData", JSON.stringify(userData));
        updateTXT();
    }


    //Faz que, ao clicar no botão concluir tarefa(botão fictiticio antes de realizar a integração no projeto unificado), sejam adicionados 10 de xp para o usuário e chama a função de checar se o usuário pode upar de nivel
    setxp.addEventListener('click', () => {
        addXp(10);
        checkLevelUp();
        xpbar();
        forapopup();
    });
    //Função que atualiza o texto de XP fora do popup (TEMPORÁRIO, UTILIZANDO SOMENTE PARA FACILITAR VISUALIZAÇÃO)
    function forapopup() {
        let xpforapopup = document.querySelector('.xpforapopup');
        xpforapopup.innerHTML = `XP: ${userData.xp}`;
        let nvforapopup = document.querySelector('.nvforapopup');
        nvforapopup.innerHTML = `Nível: ${userData.level}`;
    }

        function checkLevelUp() {
            if (userData.xp >= xpToNextLevel) {
                userData.xp -= xpToNextLevel;
                userData.level += 1;
                calXpNextLv(userData.level);
                console.log(`Parabéns! Você subiu para o nível ${userData.level}!`);
                updateTXT();
            }
        }

        //Função que verifica se a barra de xp pode ser atualizada (ainda não finalizado)
        function xpbar() {
    calcpercent = userData.xp * 100 / xpToNextLevel;
    
    // Exibe apenas o valor inteiro da porcentagem
    
            console.log(`A porcentagem de xp do usuário no momento é de: ${calcpercent}%`);

            if (calcpercent < 25) {
                xpbarelement.innerHTML = `<img src="img/xp0.png" alt="xpbar" class="xpbarclass"> <p class="xpbartext">${Math.floor(calcpercent)}%</p>`;
            }
            if (calcpercent > 25 && calcpercent < 50) {
                xpbarelement.innerHTML = `<img src="img/xp25.png" alt="xpbar" class="xpbarclass"> <p class="xpbartext">${Math.floor(calcpercent)}%</p>`;
            }
            if (calcpercent > 50 && calcpercent < 75) {
                xpbarelement.innerHTML = `<img src="img/xp50.png" alt="xpbar" class="xpbarclass"> <p class="xpbartext">${Math.floor(calcpercent)}%</p>`;
            }
            if (calcpercent > 75 && calcpercent < 100) {
                xpbarelement.innerHTML = `<img src="img/xp75.png" alt="xpbar" class="xpbarclass"> <p class="xpbartext">${Math.floor(calcpercent)}%</p>`;
            }
            if (calcpercent === 100) {
                xpbarelement.innerHTML = `<img src="img/xp100.png" alt="xpbar" class="xpbarclass"> <p class="xpbartext">${Math.floor(calcpercent)}%</p>`;
            }

        }



        //Recuperando os dados salvos
        const savedData = JSON.parse(localStorage.getItem("userData"));
        console.log("Dados salvos:", savedData);

    });