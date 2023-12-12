document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('startGame').addEventListener('click', showLevelSelection);
    document.querySelectorAll('.level-btn').forEach(button => {
        button.addEventListener('click', function() {
            const level = this.getAttribute('data-level');
            startGame(level);
        });
    });

    document.getElementById('backToWelcome').addEventListener('click', backToWelcome);
    document.getElementById('showInstructionsBtn').addEventListener('click', () => toggleSection('instructions'));
    document.getElementById('showAddendumBtn').addEventListener('click', () => toggleSection('addendum'));

    // Initialize the game with the default level on page load
    initializeGame(getGridSize('medium'));
});

let timer;
let time = 0;

function showLevelSelection() {
    document.getElementById('levelSelection').style.display = 'block';
    document.getElementById('instructions').style.display = 'none'; // Hide instructions
    document.getElementById('addendum').style.display = 'none'; // Hide addendum
}

function startGame(level) {
    initializeGame(getGridSize(level));
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    startTimer();
}

function backToWelcome() {
    document.getElementById('welcomeScreen').style.display = 'block';
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('levelSelection').style.display = 'none';
    stopTimer();
    hideSections();
}

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.style.display = section.style.display === 'none' ? 'block' : 'none';
}

function hideSections() {
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('addendum').style.display = 'none';
}

function getGridSize(level) {
    switch(level) {
        case 'beginner': return 3;
        case 'medium': return 5;
        case 'hard': return 7;
        default: return 5;
    }
}

function initializeGame(size) {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${size}, 60px)`;
    gameBoard.style.gridTemplateRows = `repeat(${size}, 60px)`;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.addEventListener('click', () => toggleSquare(i, size));
        gameBoard.appendChild(square);
    }
    randomizeBoard(size);
}

function randomizeBoard(size) {
    for (let i = 0; i < size * size; i++) {
        if (Math.random() < 0.5) {
            toggleSquare(i, size);
        }
    }
}

function toggleSquare(index, size) {
    const row = Math.floor(index / size);
    const col = index % size;
    toggle(row, col, size);
    toggle(row - 1, col, size);
    toggle(row + 1, col, size);
    toggle(row, col - 1, size);
    toggle(row, col + 1, size);
    checkWin(size);
}

function toggle(row, col, size) {
    if (row >= 0 && row < size && col >= 0 && col < size) {
        const index = row * size + col;
        const square = document.getElementById('gameBoard').children[index];
        square.classList.toggle('is-off');
    }
}

function checkWin(size) {
    const squares = document.querySelectorAll('.square');
    const isWin = Array.from(squares).every(square => square.classList.contains('is-off'));
    if (isWin) {
        alert('Congratulations, you won!');
        endGame();
    }
}

function startTimer() {
    time = 0;
    timer = setInterval(() => {
        time++;
        document.getElementById('time').textContent = time;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function endGame() {
    backToWelcome();
}

// Initialize the game with the default level on page load
initializeGame(getGridSize('medium'));
