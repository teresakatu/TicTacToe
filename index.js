// 3x3 matrix (2d array) every element is initialized to null
let arr = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

// Current player that determines the current player (Cat starts first)
let currPlayer = "cat";

// Score tracking
let scores = {
    "cat": 0,
    "dog": 0
};

// Game state
let gameActive = true;

// Image URLs for cute pixel-style cats and dogs
const images = {
    cat: "https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&cs=tinysrgb&w=140&h=140&fit=crop",
    dog: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=140&h=140&fit=crop"
};

function buttonClick(number) {
    if (!gameActive) return;
    
    const row = Math.floor(number / 3);
    const col = number % 3;
    
    if (arr[row][col] === null) {
        // Update the game state
        arr[row][col] = currPlayer;
        
        // Update the button display with image
        const button = document.getElementById(number);
        const img = document.createElement('img');
        img.src = images[currPlayer];
        img.alt = currPlayer;
        img.className = 'cell-image';
        button.appendChild(img);
        button.classList.add(currPlayer);
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
            currPlayer = currPlayer === "cat" ? "dog" : "cat";
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
    
    currPlayer = "cat";
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
    const display = document.getElementById("current-player-image");
    if (display) {
        display.src = images[currPlayer];
        display.alt = currPlayer;
    }
}

function updateScoreDisplay() {
    const catScore = document.getElementById("cat-score");
    const dogScore = document.getElementById("dog-score");
    
    if (catScore) catScore.textContent = scores["cat"];
    if (dogScore) dogScore.textContent = scores["dog"];
}

function showWinnerModal(winner) {
    const modal = document.getElementById("winner-modal");
    const winnerImage = document.getElementById("winner-image");
    const winnerText = document.getElementById("winner-text");
    const winnerMessage = document.getElementById("winner-message");
    
    winnerImage.src = images[winner];
    winnerImage.alt = winner;
    
    if (winner === "cat") {
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
    const winnerImage = document.getElementById("winner-image");
    const winnerText = document.getElementById("winner-text");
    const winnerMessage = document.getElementById("winner-message");
    
    // For draw, we can show both animals or a friendship image
    winnerImage.src = "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=240&h=240&fit=crop";
    winnerImage.alt = "friendship";
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