// Empty global board array to populate and track game state
var board = []

// Turn array where 1 = X's turn and 2 = O's turn
var turn = [1]

// All possible win conditions represented as an array of arrays
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// Onload create variables for elements commonly used, call the build grid function and
// populate the board array with 0s and make elements clickable
window.onload = function () {
    info = document.getElementById("info");
    result = document.getElementById("result");
    whosTurn = document.getElementById("turn");
    restart = document.getElementById("restart");
    restart.style.display = 'none';
    buildGrid();
    for (i = 0; i <= 8; i++) {
        board.push(0);
        let id = i;
        document.querySelector(".btn" + i).addEventListener('click', () => runAll(id));
    }
}

// function that runs the logic of the game
function runAll(id) {
    checkSpace(id);
    checkWin();
    checkDraw();
    checkTurn();
}

// Check what to do each time a space is clicked and provide user input accordingly
// O's are given a space value of 10 and X's 1 so that math can be used to check the 
// win conditions
function checkSpace(id) {
    button = document.getElementById(id);
    info.innerHTML = ""
    if (board[id] === 0) {
        if (turn[0] === 1) {
            button.innerHTML = "X";
            turn[0] = 2;
            board[id] = 1;
        } else {
            button.innerHTML = "O";
            turn[0] = 1;
            board[id] = 10;
        }
    } else if (board[id] === 3) {
        info.innerHTML = "the game really is over";
    } else {
        info.innerHTML = "space is Full!";
    }
}

// Check each time a space is clicked if any win conditions have been met
// if yes then end the game and tell the user
function checkWin() {
    for (i = 0; i <= 7; i++) {
        if (board[winConditions[i][0]] + board[winConditions[i][1]] + board[winConditions[i][2]] === 3) {
            result.innerHTML = "X's Win!"
            endGame();
        } else if (board[winConditions[i][0]] + board[winConditions[i][1]] + board[winConditions[i][2]] === 30) {
            result.innerHTML = "O's Win!"
            endGame();
        }
    }
}

// Check that a draw condition has been met by checking the total of the board
function checkDraw() {
    var total = 0
    for (i = 0; i <= 8; i++) {
        total = total + board[i]
    }
    if (total === 45) {
        result.innerHTML = "It's a Draw"
        endGame();
    }
}

function checkTurn() {
    if (turn[0] === 1) {
        whosTurn.innerHTML = "It's the X's Turn";
    } else if (turn[0] === 2) {
        whosTurn.innerHTML = "It's the O's Turn";
    } else {
        whosTurn.innerHTML = "";
    }
}


function endGame() {
    for (i = 0; i <= 8; i++) {
        board[i] = 3;
    }
    info.innerHTML = "Game Over!";
    turn[0] = 3;
    restart.style.display = "block";
}


// Build the Tic Tac Toe Board using an loop and appending as child to board div
function buildGrid() {
    const board = document.getElementById("board");
    for (i = 0; i <= 8; i++) {
        let cell = document.createElement("button");
        cell.className = "button" + " " + "btn" + i;
        cell.id = i;
        board.appendChild(cell);
    }
}

// Set the board state back to all defaults
function restartGame() {
    for (i=0; i <= 8; i++) {
        board[i] = 0;
        document.getElementById(i).innerHTML = "";
    }
    turn[0] = 1;
    whosTurn.innerHTML = "The X's start the Game";
    result.innerHTML = "";
    info.innerHTML = "";
    restart.style.display = "none";
}
