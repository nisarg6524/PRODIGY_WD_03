let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;


const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');
const excitedSpinGif = document.getElementById('excitedSpinGif'); 


cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});


function handleCellClick(event) {
    const cellIndex = event.target.dataset.index;
    
    if (gameBoard[cellIndex] || gameOver) return; 
    
    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = `${currentPlayer} wins!`;
        gameOver = true;
        excitedSpinGif.style.display = 'block'; 
    } else if (gameBoard.every(cell => cell !== '')) {
        statusText.textContent = "It's a draw!";
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
    }
}


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


resetButton.addEventListener('click', () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    currentPlayer = 'X';
    statusText.textContent = '';
    excitedSpinGif.style.display = 'none'; 
    cells.forEach(cell => cell.textContent = '');
});
