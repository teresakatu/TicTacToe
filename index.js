// 3x3 martix (2d array) every element is initialized to null;
let arr = [
   [
    null,
    null,
    null,
   ],
   [
    null,
    null,
    null,
   ],
   [
    null,
    null,
    null,
   ],
]
// New player that determines the current player
let currPlayer = "X"

// // buttonClick(5);
// arr[0][0]

// 7/3
// 2..

// 7 % 3 = 1
// Math.floor(7/3) = 1

function buttonClick(number) {
    // 5

    if (arr[Math.floor(number/3)][number%3] === null) {
        arr[Math.floor(number/3)][number%3] = currPlayer
        if (currPlayer === "O") {
            currPlayer = "X"
        } else {
            currPlayer = "O"
        }

        console.log(arr)
        document.getElementById(number).innerHTML = arr[Math.floor(number/3)][number%3]

        let someoneWon = checkForWin() 
        
        if (someoneWon) alert(someoneWon + " won")
        if (isFilledUp() && !someoneWon) alert ("Draw")
    }
}
function checkForWin() {
        if (arr[0][0] !== null && arr[0][0] === arr[0][1] && arr[0][1] === arr[0][2]) {
            return arr[0][0];
        }
        if (arr[1][0] !== null && arr[1][0] === arr[1][1] && arr[1][1] === arr[1][2]) {
            return arr[1][0];
        }
        if (arr[2][0] !== null && arr[2][0] === arr[2][1] && arr[2][1] === arr[2][2]) {
            return arr[2][0];
        }
        if (arr[0][0] !== null && arr[0][0] === arr[1][0] && arr[1][0] === arr[2][0]) {
            return arr[0][0];
        }
        if (arr[0][1] !== null && arr[0][1] === arr[1][1] && arr[1][1] === arr[2][1]) {
            return arr[0][1];
        }
        if (arr[0][2] !== null && arr[0][2] === arr[1][2] && arr[1][2] === arr[2][2]) {
            return arr[0][2];
        }
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
            if (arr[i][j] == null) {
                return false
            }
        }
    }
    return true;
}