// 3x3 matrix (2d array) every element is initialized to null
let arr = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

// Current player that determines the current player (Cat starts first)
let currPlayer = "🐱";

// Score tracking
let scores = {
    "🐱": 0,
    "🐶": 0
};

// Game state
let gameActive = true;

function buttonClick(number) {
    if (!gameActive) return;
    
    const row = Math.floor(number / 3);
    const col = number % 3;
    
    if (arr[row][col] === null) {
        // Update the game state
        arr[row][col] = currPlayer;
        
        // Update the button display
        const button = document.getElementById(number);
        button.innerHTML = currPlayer;
        button.classList.add(currPlayer === "🐱" ? "cat" : "dog");
        button.style.pointerEvents = "none"; // Disable further clicks
        
        // Check for win
        let winner = checkForWin();
        
        if (winner) {
            gameActive = false;
            scores[winner]++;
            updateScoreDisplay();
            showWinnerModal(winner);
        } else if (isFilledUp()) {
            gameActive = false;
            showDrawModal();
        } else {
            // Switch players
            currPlayer = currPlayer === "🐱" ? "🐶" : "🐱";
            updateCurrentPlayerDisplay();
        }
    }
}

function checkForWin() {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (arr[i][0] !== null && arr[i][0] === arr[i][1] && arr[i][1] === arr[i][2]) {
            return arr[i][0];
        }
    }
    
    // Check columns
    for (let j = 0; j < 3; j++) {
        if (arr[0][j] !== null && arr[0][j] === arr[1][j] && arr[1][j] === arr[2][j]) {
            return arr[0][j];
        }
    }
    
    // Check diagonals
    if (arr[0][0] !== null && arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2]) {
        return arr[0][0];
    }
    
    if (arr[0][2] !== null && arr[0][2] === arr[1][1] && arr[1][1] === arr[2][0]) {
        return arr[0][2];
    }
    
    return false;
}

function isFilledUp() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (arr[i][j] === null) {
                return false;
            }
        }
    }
    return true;
}

function resetGame() {
    // Reset game state
    arr = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    
    currPlayer = "🐱";
    gameActive = true;
    
    // Reset all buttons
    for (let i = 0; i < 9; i++) {
        const button = document.getElementById(i);
        button.innerHTML = "";
        button.classList.remove("cat", "dog");
        button.style.pointerEvents = "auto";
    }
    
    updateCurrentPlayerDisplay();
    closeModal();
}

function updateCurrentPlayerDisplay() {
    const display = document.getElementById("current-player-display");
    if (display) {
        display.textContent = currPlayer;
    }
}

function updateScoreDisplay() {
    const catScore = document.getElementById("cat-score");
    const dogScore = document.getElementById("dog-score");
    
    if (catScore) catScore.textContent = scores["🐱"];
    if (dogScore) dogScore.textContent = scores["🐶"];
}

function showWinnerModal(winner) {
    const modal = document.getElementById("winner-modal");
    const winnerEmoji = document.getElementById("winner-emoji");
    const winnerText = document.getElementById("winner-text");
    const winnerMessage = document.getElementById("winner-message");
    
    winnerEmoji.textContent = winner;
    
    if (winner === "🐱") {
        winnerText.textContent = "Cats Win!";
        winnerMessage.textContent = "Meow! The cats have conquered the board! 🎉";
    } else {
        winnerText.textContent = "Dogs Win!";
        winnerMessage.textContent = "Woof! The dogs have claimed victory! 🎉";
    }
    
    modal.style.display = "block";
}

function showDrawModal() {
    const modal = document.getElementById("winner-modal");
    const winnerEmoji = document.getElementById("winner-emoji");
    const winnerText = document.getElementById("winner-text");
    const winnerMessage = document.getElementById("winner-message");
    
    winnerEmoji.textContent = "🤝";
    winnerText.textContent = "It's a Draw!";
    winnerMessage.textContent = "Cats and dogs can be friends after all! 💕";
    
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("winner-modal");
    modal.style.display = "none";
}

// Initialize the game when the page loads
window.addEventListener('load', function() {
    updateCurrentPlayerDisplay();
    updateScoreDisplay();
});

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById("winner-modal");
    if (event.target === modal) {
        closeModal();
    }
});