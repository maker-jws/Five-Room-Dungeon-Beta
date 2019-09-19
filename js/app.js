let timer;
let timelimit;
let counter = 0;
let timeOut = false;
let monstersDefeated = false;
let monsterInterval = 200;
const gameEnemies = [];
const gameClock = {

    minute: timelimit,
    second: 00,
    ms: 100,

    changeClock: function () {
        this.ms--
        //    $(`#ms`).text(`${gameClock.ms} `)
        $(`#second`).text(`   ${gameClock.second} `);
        $(`#minute`).text(`   ${gameClock.minute}`);

        if (this.ms < 0) {
            this.ms = 100;
            this.second--;
            setTimeout(player.checkTunnel()); //updates interaction 1/sec
            setTimeout(checkEnemyDistance, monsterInterval);
        } else if (this.second <= 0) {
            this.second = 59;
            this.minute--;
            // createMonsters(1)
        } else if (this.minute < 0) {
            timeOut = true;
        } else { }
    }
}
function gameSetup() {
    $('#gameinfo-container').hide();
    $('#gameboard').hide();
}

function createMonsters() {
    monsters = {
        0: [0, 2],
        1: [2, 5],
        2: [6, 8],
    }
    let n = currentMap
    for (let m = monsters[n][0]; m < monsters[n][1]; m++) {
        const monster = new Enemy(statArray[m], m);
        gameEnemies.push(monster);
        console.log(`${statArray[m].name} created!`)
    }
}
function checkEnemyDistance() {
    for (let i = 0; i < gameEnemies.length; i++) {
        if (gameEnemies[i].heart > 0) {
            // console.log(gameEnemies[i].name)
            const distanceX = player.x - gameEnemies[i]['x']; // if return negative number player is left if positive, right
            const distanceY = player.y - gameEnemies[i]['y']; // if return negative number player is above if positive, below
            const vector = [distanceY, distanceX];
            gameEnemies[i]['distance'] = vector;
            if ((vector[0] > -2 && vector[0] < 2) && (vector[1] === 0)) { //triggering across the map 
                gameEnemies[i].attack(gameEnemies[i]['direction'])
            } else if (vector[0] === 0 && (vector[1] > -2 && vector[1] < 2)) {
                gameEnemies[i].attack(gameEnemies[i]['direction'])
            }
        }
    }
}
function enemyBehavior() {
    if (counter % monsterInterval === 0) {
        for (let i = 0; i < gameEnemies.length; i++) {
            setTimeout(function () {
                setTimeout(gameEnemies[i].choosePath(), monsterInterval)
            }, 10);
        }
    }
}
function battle(attacker, attacked, mod = "0") {
    console.log(`${attacker} moves to attack ${attacked}`)
    let attackerRolled = attackRoll(6, mod)
    let attackedRolled = attackRoll(6, mod)
    console.log(attackerRolled, "<<attacker", attackedRoller, "<<attacked");
    if (attackerRolled >= attackedRolled) {
        attacked.heart--;
    }
}
function attackRoll(dice) {
    let total = 0;
    for (let i = 0; i < 3; i++) {
        const roll = Math.floor(Math.random() * dice) + 1
        total = total + roll;
    }
    return total;
}
function randomItem() {
    console.log('randomItem is called ')
}
function addInventoryItem() {
    randomItem();
    console.log('addInventory Item is called  item addded')

}
function resetMap() {
    //increment current map

    currentMap++
    $('#gameboard').empty()
    parseMap(currentMap);
    //increment playerScore+=500pts 
    player.map++
    player.populate(player.name)
    player.render('player');
    gameEnemies.length = 0;
    monstersDefeated = false;
    createMonsters();
    //populate player at new star 

}
function pageLoad(e) {
    e.preventDefault();
    const playerName = $(e.target["0"]).val();
    const playerClass = $(e.target["1"]).val();
    const playerColor = $(e.target["2"]).val();
    // console.log('the create character was submitted')
    $('#character-creation-form').hide();

    startGame(5);
    player.populate(playerName, playerClass, playerColor);
    $('#gameboard').show();
    $('#gameinfo-container').show();
}

function startGame(timed) {
    timelimit = timed;
    // $(`#playerCol`).hide();
    parseMap();

    createMonsters();
    // setup();
    const timer = setInterval(function () {
        gameClock.changeClock();
        if (!monstersDefeated) {
            enemyBehavior();
        }
        endGame();
        counter++;
    }, 12);
}
function checkGameStatus() {
    const checkTreasure = $('div').hasClass('treasure')
    if (monstersDefeated === true && checkTreasure === false) {
        setTimeout(alert(`you have surpassed the challenges of this level of the dungeon`), 1000);
        console.log('next map render started')
        resetMap();
    } else {
        console.log('not ready')
        setTimeout(alert(`You have not faced all of this level's challenges`), 1000);
    }

}
function endGame() {
    const playerFell = $('div.void').hasClass('player')
    if (player.heart <= 0 || player.torch <= 0 || timeOut === true || playerFell === true) {
        // console.log('game over');
        if (timeOut === true) {
            clearInterval(timer);
            alert('time has run out');
            !timeOut;
        } else if (playerFell) {
            alert(`${player.name} has fallen to their death`);
        } else if (player.hp <= 0) {
            alert('Your player has succumb to their injuries');
        } else if (player.torch <= 0)
            alert("When the lights go out the monsters surround you");
        promptPlayAgain();
    }
};

function promptPlayAgain() {
    var replay = prompt("Would you like to play again (Y/N)", "N");

    if (replay === 'Y') {
        location.reload();
    } else if (replay === 'N') {
        window.close();
    } else if (replay !== null) {
        alert('please enter Y/N')
    } else { location.reload() }
}
gameSetup();
// $('body').click(function () {
//     console.log(event.target)
// });