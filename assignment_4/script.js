// Tries variable to track number of tries
var tries = 0;

// Used letters List
var used_letters = [];

// Set a variable to track overall wins
var wins = 0;

// Set a variable to track overall losses
var losses = 0;

// Onload create variables for elements commonly used, calls the function to build
// the game board and sets the event listeners for buttons.
window.onload = function () {
    info = document.getElementById("info");
    guess_input = document.getElementById("guess_input");
    win_status = document.getElementById("win_status");
    restart = document.getElementById("restart");
    letters_info = document.getElementById("used_letters");
    results_list = document.getElementById("results");
    restart.style.display = 'none';
    restart.addEventListener('click', () => restartGame());
    document.getElementById("debug-mode").addEventListener('click', () => debugMode());
    document.getElementById("guess").addEventListener('click', () => submitGuess(randomWord, guess_input.value));
    buildGrid();
}

// API call to generate random words random words
// Reference: https://developer.wordnik.com/
async function getRandomWord() {
    let response = await fetch('http://api.wordnik.com/v4/words.json/randomWord?api_key=xya6zr0xy0u8hs4rdcdvs0jrwp0ajmm0ywag6yvwolquidtbq&minLength=5&maxLength=5&hasDictionaryDef=true&minDictionaryCount=5')
    let data = await response.json()
    return data;
}
getRandomWord().then(data => randomWord = data);

// Create constructor for Guesses
// Contains methods for checking for the win condition, the correct position on the grid
// and tracking letters used so far
class NewGuess {
    constructor(word, guess) {
        this.word_name = `${word}`;
        this.word_parsed = word.split("");
        this.guess_name = `${guess}`;
        this.guess_parsed = guess.split("");
    }
    check_win() {
        if (this.word_name === this.guess_name) {
            win_status.innerHTML = "Congrats you solved the Wordle!"
            restart.style.display = 'block';
            document.getElementById("guess").style.display = 'none';
            results(true);
        } else if (tries === 5) {
            win_status.innerHTML = "Oh no you didn't solve it"
            restart.style.display = 'block';
            results(false);
        }
    }
    check_correct_position_and_letter() {
        var info = document.getElementById('info');
        for (var i = 0; i < 5; i++) {
            var current_cell = document.getElementById(`${i},${tries}`);
            var node = document.createElement('li');
            if (this.word_parsed[i] === this.guess_name[i]) {
                current_cell.innerHTML = `${this.guess_name[i]}`
                node.appendChild(document.createTextNode(`${this.guess_name[i]} is in the correct possition`))
                info.appendChild(node)
                current_cell.style.backgroundColor = "#11F71D";
            } else if (this.word_parsed.includes(this.guess_parsed[i])) {
                current_cell.innerHTML = `${this.guess_name[i]}` 
                node.appendChild(document.createTextNode(`${this.guess_name[i]} is in the word`))
                info.appendChild(node)
                current_cell.style.backgroundColor = "#F7E111";
            } else {
                current_cell.innerHTML = `${this.guess_name[i]}` 
                node.appendChild(document.createTextNode(`${this.guess_name[i]} is not in the word`))
                info.appendChild(node)
                current_cell.style.backgroundColor = "#D96909";
            }
        }
    }
    add_to_used_letter_list() {
        for (var k = 0; k < 5; k++) {
            if (!used_letters.includes(this.guess_parsed[k]))
                used_letters.push(this.guess_parsed[k])
        }
        letters_info.innerHTML = used_letters;
    }
}

function submitGuess(word, guess) {
    if (guess.length != 5){
        info.innerHTML = "Your Guess Needs to be 5 letters!";
        return false
    }
    info.innerHTML = "";
    new_guess = new NewGuess(word.word, guess);
    new_guess.check_win();
    new_guess.check_correct_position_and_letter();
    new_guess.add_to_used_letter_list();
    tries = tries + 1;
}

function debugMode() {
    var secret_word = document.getElementById("secret_word")
    if (document.getElementById("debug-mode").checked) {
        secret_word.innerHTML = `*Debug Mode Active* The Secret word is: ${randomWord.word}`;
    } else {
        secret_word.innerHTML = "";
    }
}

// Build wordle board as a 5 x 6 grid with coordinates
function buildGrid() {
    const board = document.getElementById("board");
    for (i = 0; i < 6; i++) {
        for (j = 0; j < 5; j++) {
            let cell = document.createElement("letter_tile")
            cell.className = "letter_tile" + " " + "tile" + i;
            cell.id = `${j},${i}`;
            board.appendChild(cell);
        }
    }
}

// Helper function to clear children of an element for restarting the game
// Credit: https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Clears all user information and the board. Then redraws the board and makes
// a new call to the api for a new word.
function restartGame() {
    removeAllChildNodes(board);
    removeAllChildNodes(info);
    win_status.innerHTML = "";
    buildGrid();
    tries = 0;
    getRandomWord().then(data => randomWord = data);
    used_letters = [];
    letters_info.innerHTML = "";
    guess_input.value = "";
    document.getElementById("guess").style.display = 'block';
}

// Track wins and losses
function results(outcome) {
    var node = document.createElement('li');
    if (outcome) {
        node.appendChild(document.createTextNode(`You Won in ${tries} turns`));
        results_list.appendChild(node);
        wins = wins + 1;
        document.getElementById("wins").innerHTML = wins;
    } else {
        node.appendChild(document.createTextNode("Lost this round"));
        results_list.appendChild(node);
        losses = losses + 1;
        document.getElementById("losses").innerHTML = losses;
    }
}