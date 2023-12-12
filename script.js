document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startGame');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const gameBoard = document.getElementById('gameBoard');
    const instructionsButton = document.getElementById('showInstructions');
    const addendumButton = document.getElementById('showAddendum');
    const instructionsModal = document.getElementById('instructionsModal');
    const addendumModal = document.getElementById('addendumModal');
    const closeInstructions = document.getElementById('closeInstructions');
    const closeAddendum = document.getElementById('closeAddendum');
    const boardSize = 5;

    startButton.addEventListener('click', () => {
        welcomeScreen.style.display = 'none';
        gameBoard.style.display = 'grid';
        initGame();
    });

    instructionsButton.addEventListener('click', () => {
        instructionsModal.style.display = 'block';
    });

    addendumButton.addEventListener('click', () => {
        addendumModal.style.display = 'block';
    });

    closeInstructions.addEventListener('click', () => {
        instructionsModal.style.display = 'none';
    });

    closeAddendum.addEventListener('click', () => {
        addendumModal.style.display = 'none';
    });

    function initGame() {
        gameBoard.innerHTML = '';

        for (let i = 0; i < boardSize * boardSize; i++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => toggleCells(i));
            gameBoard.appendChild(cell);
        }

        randomizeBoard();
    }

    function toggleCells(index) {
        let row = Math.floor(index / boardSize);
        let col = index % boardSize;
        toggleCell(row, col);
        toggleCell(row - 1, col);
        toggleCell(row + 1, col);
        toggleCell(row, col - 1);
        toggleCell(row, col + 1);
        checkWin();
    }

    function toggleCell(row, col) {
        if (row >= 0 && row < boardSize && col >= 0 && col < boardSize) {
            let cell = gameBoard.children[row * boardSize + col];
            cell.classList.toggle('is-off');
        }
    }

    function randomizeBoard() {
        for (let i = 0; i < boardSize * boardSize; i++) {
            if (Math.random() < 0.5) {
                toggleCells(i);
            }
        }
    }

    function checkWin() {
        const isWin = [...gameBoard.children].every(cell => cell.classList.contains('is-off'));
        if (isWin) {
            window.alert('You win!');
            welcomeScreen.style.display = 'block';
            gameBoard.style.display = 'none';
        }
    }
});
