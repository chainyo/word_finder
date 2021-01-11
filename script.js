// Words
const words = ['POMMES', 'ANANAS', 'FRUITS'];
var word;
var player;
var cnt = 0;
var victory;

// Html link
const newGameBtn = document.getElementById('NewGameBtn');
const enterBtn = document.getElementById('EnterAnswerBtn');

// Events listener
enterBtn.addEventListener('click', function() {
    let answer = document.getElementById('UserInput').value.toUpperCase();
    if (answer.length = 1 && player.score > 0 && victory == false) {
        runTurn(answer);
    }
    else {
        updateConsole('restart');
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
    victory = false;
    updateScore();
    updateConsole('newG');
};

function runTurn(letter) {
    if (letter.length == 1) {
        addUsedLetter(letter);
        if (word.includes(letter)) {
            let indexs = [];
            for (let i = 0; i < word.length; i++) {
                if (word[i] == letter) {
                    indexs.push(i);
                }
            }
            countLetter(indexs, letter);
            updateConsole('good', letter, indexs.length);
            cnt += 1 * indexs.length;
        }
        else {
            player.score -= 1;
            updateScore();
            updateConsole('bad', letter);
        }
    }
    else {
        updateConsole('errLen')
    }
    cleanInput();
    checkVictory();
};

function countLetter (tab, letter) {
    tab.forEach(element => writeHtml(element, letter));
};

function writeHtml(element, letter) {
    document.getElementById('Letter' + element).innerHTML = letter;
};

function addUsedLetter(letter) {
    txt = document.getElementById('usedLetters').innerHTML
    if (txt == '') {
        document.getElementById('usedLetters').innerHTML += letter;
    }
    else {
        document.getElementById('usedLetters').innerHTML += ', ' + letter;
    }
};

function updateScore() {
    document.getElementById('try').innerHTML = player.score.toString();
};

function updateConsole(kword, letter, len=0) {
    let ul = document.getElementById('console');
    let li = document.createElement('li');
    if (kword == 'good') {
        let good = document.createTextNode(`The letter ${letter} was found ${len} times.`);
        li.appendChild(good);
        li.classList.add("consoleG");
        ul.prepend(li);
    }
    else if (kword == 'bad') {
        let bad = document.createTextNode(`The letter ${letter} is not in the word.`);
        li.appendChild(bad);
        li.classList.add("consoleB");
        ul.prepend(li);
    }
    else if (kword == 'newG') {
        let newG = document.createTextNode('You started a new game.');
        li.appendChild(newG);aq
    }
    else if (kword == 'errLen') {
        let errLen = document.createTextNode('Error: you must enter only one letter.')
        li.appendChild(errLen);
        li.classList.add('consoleErr');
        ul.prepend(li);
    }
    else if (kword == 'victory') {
        let vict = document.createTextNode('Victory!');
        li.appendChild(vict);
        li.classList.add('consoleVict');
        ul.prepend(li)
    }
    else if (kword == 'restart') {
        let restart = document.createTextNode('You should restart the game.');
        li.appendChild(restart);
        li.classList.add('consoleRes');
        ul.prepend(li);
    }
}
function restartGame() {
    initGame();
}

function cleanHtml() {
    for (let i = 0; i < 6; i++) {
        document.getElementById('Letter' + i).innerHTML = '';
    }
};

function cleanInput() {
    document.getElementById('UserInput').value = '';
}

function checkVictory() {
    if (cnt == 6) {
        updateConsole('victory');
        victory = true;
    }
}

// Init
initGame();