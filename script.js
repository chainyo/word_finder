// Words
const words = ['POMMES', 'ANANAS', 'FRUITS'];
var word;
var player;

// Html link
const newGameBtn = document.getElementById('NewGameBtn');
const enterBtn = document.getElementById('EnterAnswerBtn');

// Events listener
enterBtn.addEventListener('click', function() {
    let answer = document.getElementById('UserInput').value.toUpperCase();
    if (answer.length = 1 && player.score > 0) {
        runTurn(answer);
    }
});
newGameBtn.addEventListener('click', function() {
    cleanHtml();
    restartGame();
});

// Player class
class Player {
    constructor(score){
        this.score = score;
    }
}

// Functions
function initGame() {
    player = new Player(7);
    word = words[Math.floor(Math.random() * words.length)];
    updateScore();
};

function runTurn(letter) {
    if (word.includes(letter)) {
        let indexs = [];
        for (let i = 0; i < word.length; i++) {
            if (word[i] == letter) {
                indexs.push(i);
            }
        }
        countLetter(indexs, letter);
    }
    else {
        player.score -= 1;
        updateScore();
    }
    document.getElementById('UserInput').value = ''
};

function countLetter (tab, letter) {
    tab.forEach(element => writeHtml(element, letter));
};

function writeHtml(element, letter) {
    document.getElementById('Letter' + element).innerHTML = letter;
};

function updateScore() {
    document.getElementById('try').innerHTML = player.score.toString();
};

function restartGame() {
    initGame();
}

function cleanHtml() {
    for (let i = 0; i < 6; i++) {
        document.getElementById('Letter' + i).innerHTML = '';
    }
};

// Init
initGame();