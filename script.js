let boxes = document.querySelectorAll(".box");
let turn = "X"; // Jogador humano começa com X
let isGameOver = false;
let currentRound = 1; // Controla o turno inicial a cada rodada

// Contadores de vitórias
let playerWins = 0;
let machineWins = 0;

// Reiniciar o jogo e adicionar eventos de clique
boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "" && turn === "X") {
            e.innerHTML = turn;
            cheakWin();
            cheakDraw();
            if (!isGameOver) {
                changeTurn();
                setTimeout(machinePlay, 500); // Máquina joga após 500ms
            }
        }
    });
});

// Função para mudar o turno
function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
        document.querySelector(".turn-container h3").textContent = "Vez da Máquina"; // Alterando o texto para vez da máquina
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";
        document.querySelector(".turn-container h3").textContent = "Sua vez!"; // Alterando o texto para vez do jogador
    }
}

// Função para verificar a vitória
function cheakWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if (v0 !== "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            if (v0 === "X") {
                document.querySelector("#results").innerHTML = "Você ganhou!";
                playerWins++; // Incrementa vitórias do jogador
                document.querySelector("#player-wins").textContent = playerWins;
            } else {
                document.querySelector("#results").innerHTML = "Você perdeu!";
                machineWins++; // Incrementa vitórias da máquina
                document.querySelector("#machine-wins").textContent = machineWins;
            }
            document.querySelector("#play-again").style.display = "inline";

            for (let j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#8D6E63"; // Marrom rosado para vitória
                boxes[winConditions[i][j]].style.color = "#3E2723"; // Texto em marrom escuro
            }
            return;
        }
    }
}

// Função para verificar empate
function cheakDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        });

        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Empate!";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

// Função para a jogada da máquina (simples, escolhe uma posição aleatória vazia)
function machinePlay() {
    let availableBoxes = [];
    boxes.forEach((box, index) => {
        if (box.innerHTML === "") availableBoxes.push(index);
    });

    if (availableBoxes.length > 0 && !isGameOver) {
        let randomIndex = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
        boxes[randomIndex].innerHTML = "O"; // Máquina joga com "O"
        boxes[randomIndex].style.color = "#A1887F"; // Jogador O em marrom claro
        cheakWin();
        cheakDraw();
        if (!isGameOver) changeTurn();
    }
}

// Função para iniciar uma nova rodada, alternando o turno inicial
function newRound() {
    isGameOver = false;
    turn = (currentRound % 2 === 0) ? "O" : "X"; // Alterna o turno inicial a cada rodada
    document.querySelector(".bg").style.left = (turn === "X") ? "0" : "85px";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";
    currentRound++;

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#D7CCC8"; // Cor inicial para o texto
    });

    // Se a máquina começar, faz a jogada dela automaticamente
    if (turn === "O") {
        document.querySelector(".turn-container h3").textContent = "Vez da Máquina"; // Atualiza o texto quando for a vez da máquina
        setTimeout(machinePlay, 500);
    } else {
        document.querySelector(".turn-container h3").textContent = "Sua vez!"; // Atualiza o texto para a vez do jogador
    }
}

// Botão para reiniciar o jogo e iniciar uma nova rodada
document.querySelector("#play-again").addEventListener("click", newRound);
