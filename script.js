let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

// Select all the cells
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');
const excitedSpinGif = document.getElementById('excitedSpinGif'); // The excited spin GIF

// Add event listeners to the cells
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Handle cell click
function handleCellClick(event) {
    const cellIndex = event.target.dataset.index;
    
    if (gameBoard[cellIndex] || gameOver) return; // If the cell is already clicked or game is over
    
    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = `${currentPlayer} wins!`;
        gameOver = true;
        excitedSpinGif.style.display = 'block'; // Show the excited spin GIF when there's a winner
    } else if (gameBoard.every(cell => cell !== '')) {
        statusText.textContent = "It's a draw!";
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    }
}

// Check if there's a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Restart the game
resetButton.addEventListener('click', () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    currentPlayer = 'X';
    statusText.textContent = '';
    excitedSpinGif.style.display = 'none'; // Hide the excited spin GIF when the game restarts
    cells.forEach(cell => cell.textContent = '');
});
