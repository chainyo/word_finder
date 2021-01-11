// Words
const words = ['POMMES', 'ANANAS', 'FRUITS', 'POIRES', 'CUSTOM', 'CREATE', 
                'DEBATE', 'DEMAND', 'DEVICE', 'DIFFER', 'ELEVEN', 'DOUBLE',
                'DRIVER', 'DINNER', 'EFFECT', 'EMPLOY', 'ENTIRE', 'FACTOR', 
                'FAMOUS', 'FEMALE', 'FLIGHT', 'EXPAND', 'FAMILY', 'EXPORT',
                'FISCAL', 'FINGER', 'FIGURE', 'FORMAL', 'GARDEN', 'GLOBAL',
                'GROUND', 'HEALTH', 'JUNIOR', 'KILLED', 'IMPORT', 'HOLDER',
                'GOLDEN', 'FORGET', 'LEAGUE', 'MANUAL', 'MAKING', 'LEGACY',
                'LESSON', 'MATURE', 'LISTEN', 'MATURE', 'MEMBER', 'MARGIN',
                'MEDIUM', 'MUSEUM', 'NARROW', 'NATION', 'NATIVE', 'NOBODY',
                'PATENT', 'PACKED', 'ORANGE', 'OBJECT', 'PARENT', 'PERIOD',
                'PEOPLE', 'OFFICE', 'NIGHTS', 'PLEASE', 'RARELY', 'MEMORY',
                'READER', 'REALLY', 'RANDOM', 'ONLINE', 'POCKET', 'PREFER',
                'PROPER', 'PROFIT', 'READER', 'REMOVE', 'RETURN', 'RIDING',
                'SALARY', 'ROBUST', 'SAFETY', 'SAMPLE', 'SAVING', 'SCREEN',
                'SEARCH', 'SCHOOL', 'SEXUAL', 'SIGNAL', 'SILENT', 'SIMPLE',
                'STEADY', 'SPEECH', 'STABLE', 'STATUS', 'SPRING', 'TENNIS',
                'VISION', 'THEORY', 'TARGET', 'TRAVEL', 'TREATY', 'TICKET',
                'VENDOR', 'UNABLE', 'TWELVE', 'UPDATE', 'TIMING', 'THANKS',
                'TALENT', 'VALLEY', 'TWENTY', 'WEALTH', 'WALKER', 'WEIGHT',
                'UNITED', 'VICTIM', 'WINDOW', 'WINNER', 'WINTER', 'WRITER',
                'YELLOW', 'WORKER', 'STUDIO', 'SUFFER', 'SUPPLY', 'SUMMER',
                'SILVER', 'REDUCE', 'REGION', 'RESULT', 'RECORD'];
var word;
var player;
var cnt = 0;
var victory;
var defeat;

// Html link
const newGameBtn = document.getElementById('NewGameBtn');
const enterBtn = document.getElementById('EnterAnswerBtn');

// Events listener
enterBtn.addEventListener('click', function() {
    let answer = document.getElementById('UserInput').value.toUpperCase();
    if (answer.length = 1 && player.score > 0 && victory == false && defeat == false) {
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
    defeat = false;
    cnt = 0;
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
    }
    else if (kword == 'newG') {
        let newG = document.createTextNode('You started a new game.');
        li.appendChild(newG);
        li.classList.add('consoleNG')
    }
    else if (kword == 'errLen') {
        let errLen = document.createTextNode('Error: you must enter only one letter.')
        li.appendChild(errLen);
        li.classList.add('consoleErr');
    }
    else if (kword == 'victory') {
        let vict = document.createTextNode('Victory!');
        li.appendChild(vict);
        li.classList.add('consoleVict');
    }
    else if (kword == 'restart') {
        let restart = document.createTextNode('You should restart the game.');
        li.appendChild(restart);
        li.classList.add('consoleRes');
    }
    else if (kword == 'defeat') {
        let defeat = document.createTextNode(`You lose. The right word was: ${word}`);
        li.appendChild(defeat);
        li.classList.add('consoleDef');
    }
    ul.prepend(li);
}
function restartGame() {
    initGame();
}

function cleanHtml() {
    for (let i = 0; i < 6; i++) {
        document.getElementById('Letter' + i).innerHTML = '';
    }
    document.getElementById('usedLetters').innerHTML = '';
};

function cleanInput() {
    document.getElementById('UserInput').value = '';
}

function checkVictory() {
    if (cnt == 6) {
        updateConsole('victory');
        victory = true;
    }
    else if (player.score == 0) {
        updateConsole('defeat')
        defeat = true;
    }
}

// Init
initGame();