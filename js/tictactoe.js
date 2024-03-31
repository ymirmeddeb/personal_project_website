const board = document.getElementById('ticTacToeBoard');
const cells = document.querySelectorAll('.cell');
const gameOverScreen = document.getElementById('gameOverScreen');
const winnerMessage = document.getElementById('winnerMessage');
const restartGameBtn = document.getElementById('restartGameBtn');
let currentPlayer = 'X';

function cellClicked(e) {
  const cell = e.target;
  if (cell.textContent.trim() === '' && gameOverScreen.style.display === 'none') {
    cell.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
      gameOver(currentPlayer);
    } else if (checkTie()) {
      gameOver('Tie');
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function gameOver(winner) {
  let message = winner === 'Tie' ? "It's a tie!" : `${winner} Wins!`;
  winnerMessage.textContent = message;
  gameOverScreen.style.display = 'flex'; // Show the game over screen
}

function checkTie() {
  return [...cells].every(cell => cell.textContent.trim() !== '');
}

function checkWin(currentPlayer) {
  const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

cells.forEach(cell => {
  cell.addEventListener('click', cellClicked);
});

restartGameBtn.addEventListener('click', () => {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  currentPlayer = 'X';
  gameOverScreen.style.display = 'none';
});

// Optional: Call this function when the page loads if you want the game to start with the board cleared and ready for play
window.onload = () => {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  currentPlayer = 'X';
  gameOverScreen.style.display = 'none';
};
