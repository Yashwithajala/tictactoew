const board = document.getElementById('board');
const message = document.getElementById('message');
let currentPlayer = 'X'; // Start with player 'X' (Pink)
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

const xImage = 'X.png'; // Pink player's image
const oImage = '0.png'; // Blue player's image

// Create cells dynamically
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
}

const cells = document.querySelectorAll('.cell'); // Get cells AFTER they are created

function handleCellClick(event) {
    if (gameOver) return;

    const cell = event.target;
    const index = cell.dataset.index;

    if (gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        const img = document.createElement('img');
        img.src = currentPlayer === 'X' ? xImage : oImage;
        cell.appendChild(img);
        checkWin();
        switchPlayer();
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch between X (Pink) and O (Blue)
}
function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameOver = true;
            // Update the message to "Blue Wins" or "Pink Wins"
            message.textContent = gameBoard[a] === 'X' ? "HOORAYY PINK WON!" : "HOORAYY BLUE WON!";
            
            // Change message color based on the winner
            message.style.color = gameBoard[a] === 'X' ? '#DA498D' : '#219B9D';

            highlightWinningCells(pattern);
            return;
        }
    }

    // Check for a tie if the board is full
    if (!gameBoard.includes('')) {
        gameOver = true;
        message.textContent = "It's a Tie!";
        message.style.color = '#4e4e4c';  // Default tie color
    }
}


function highlightWinningCells(pattern) {
    pattern.forEach(index => {
        cells[index].classList.add('highlight'); // Use class for highlighting winning cells
    });
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X'; // Reset to Pink (X)
    gameOver = false;
    message.textContent = '';
    cells.forEach(cell => {
        cell.innerHTML = ''; // Clear cell content (images)
        cell.classList.remove('highlight'); // Remove highlight class
    });
}
