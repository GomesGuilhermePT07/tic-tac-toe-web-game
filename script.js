const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let cells = [];
let currentPlayer = "X";
let gameActive = true;

// Combinações vencedoras
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Inicializar o tabuleiro
function initBoard() {
  board.innerHTML = "";
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleMove);
    board.appendChild(cell);
    cells.push(cell);
  }
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Vez do jogador: X";
}

// Jogada do jogador
function handleMove(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (cell.textContent !== "" || !gameActive) return;

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase()); // Adiciona classe de estilo (x ou o)

    checkWinner();
    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Vez do jogador: ${currentPlayer}`;
    }
}  

// Verificar vencedor ou empate
function checkWinner() {
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent
      ) {
        gameActive = false;
        statusText.textContent = `Jogador ${cells[a].textContent} venceu!`;
  
        cells[a].classList.add("winner");
        cells[b].classList.add("winner");
        cells[c].classList.add("winner");
  
        disableBoard();
        return;
      }
    }
  
    if (cells.every(cell => cell.textContent !== "")) {
      gameActive = false;
      statusText.textContent = "Empate!";
      disableBoard();
    }
}
    

// Reiniciar jogo
restartBtn.addEventListener("click", initBoard);

// Inicializar ao carregar
initBoard();
