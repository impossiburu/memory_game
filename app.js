const tiles = document.querySelectorAll('.tile_item');
const turn = document.querySelector('.turn');
const popup = document.querySelector('.popup');
const container = document.querySelector('.container');
const scoreEl = document.querySelector('.score_b');
const start = document.querySelector('.btn_start');

let needToGuess = [];
let guessedTiles = [];
let score = 0;
let nextRound = false;
let playerTurn = false;
let gameOver = false;

tiles.forEach(el => {
    el.addEventListener('click', (e) => {
        if (gameOver == true) {
            return false;
        }
        let targetTileID = Number(e.target.dataset.id);
        guessedTiles.push(targetTileID);

        let correctTurn = checkTurn(needToGuess, guessedTiles);
        if (correctTurn == false) {
            gameover();
        }

        if(needToGuess.length == guessedTiles.length && correctTurn !== false)  {
            score = guessedTiles.length;
            guessedTiles = [];
            nextRound = true;
            startGame();
        }
    })
});

function checkTurn(compArr, userArr) {
    for(let i = 0; i < userArr.length; i++) {
        console.log(userArr[i], compArr[i]);
        if (userArr[i] == compArr[i]) {
            continue;
        } else {
            return false;
        }
    }
}

function computerTurn() {
    for (let i = 0; i < needToGuess.length; i++) {
        setTimeout(() => {
            const currentTile = document.querySelector('.tile_item[data-id="'+needToGuess[i]+'"]');
                currentTile.classList.add('anim');
                setTimeout(() => {
                    currentTile.classList.remove('anim');
                }, 500)
        }, i*1000 );
    }
    setTimeout(() => {
        turn.innerText = 'Твой ход';
    }, needToGuess.length*1000);
}

function startGame() {
    start.remove();
    turn.innerText = 'Ход компьютера';
    const randomTile = Math.floor(Math.random() * tiles.length + 1);
    needToGuess.push(randomTile);

    setTimeout(() => {
        computerTurn();
    }, 1500);
}

function gameover() {
    turn.innerText = 'Опа! Проиграл(а)';
    gameOver = true;
    container.style.filter = 'brightness(0.4)';
    popup.style.display = 'block';
    scoreEl.innerText = score;
}

