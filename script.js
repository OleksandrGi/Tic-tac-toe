const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';

function startGame() {
    cells.forEach(cell => {
        cell.textContent = '';
       cell.removeEventListener('click', handleCellClick);
        cell.addEventListener('click', handleCellClick, { once: true });
    });
    currentPlayer = '×';
}


function handleCellClick(event) {
    const cell = event.target;
    cell.textContent = currentPlayer;
    if (checkWinner(currentPlayer)) {
        alert(`${currentPlayer} победил!`);
        startGame();
    } else if (checkDraw()) {
        alert('Ничья!');
        startGame();
    } else {
        currentPlayer = currentPlayer === '×' ? '○' : '×';
    }
}

function checkWinner(player) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winConditions.some(condition => {
        return condition.every(index => cells[index].textContent === player);
    });
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent);
}

restartButton.addEventListener('click', startGame);

startGame();