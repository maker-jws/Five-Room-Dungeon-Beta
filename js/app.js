let timer;
let timelimit;
let counter = 0;
let timeOut = false;
let gameStart = false;
let monstersDefeated = false;
let monsterInterval = 200;
const gameEnemies = [];
let cHeight = null;
let cWidth = null;
let cY = null;
let cX = null;


const gameClock = {
  minute: timelimit,
  second: 00,
  ms: 100,

  changeClock: function () {
    this.ms--;
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
    } else {
    }
  }
};
function gameSetup() {
  $("#game-header").addClass("hidden");
  $("#gameinfo-container").hide();
  $("#gameboard").hide();
  $("#game-logo").hide();
  $("#gameinfo-inventory-container").hide();
  $("#gameinfo-description-container").hide();
}

function createMonsters() {
  monsters = {
    0: [0, 2],
    1: [2, 5],
    2: [6, 8],
    3: [8, 10],
    4: [10, 14]
  };
  let n = currentMap;
  for (let m = monsters[n][0]; m < monsters[n][1]; m++) {
    const monster = new Enemy(statArray[m], m);
    gameEnemies.push(monster);
    console.log(`${statArray[m].name} created!`);
  }
}
function checkEnemyDistance() {
  for (let i = 0; i < gameEnemies.length; i++) {
    if (gameEnemies[i].heart > 0) {
      // console.log(gameEnemies[i].name)
      const distanceX = player.x - gameEnemies[i]["x"]; // if return negative number player is left if positive, right
      const distanceY = player.y - gameEnemies[i]["y"]; // if return negative number player is above if positive, below
      const vector = [distanceY, distanceX];
      gameEnemies[i]["distance"] = vector;
      if (vector[0] > -2 && vector[0] < 2 && vector[1] === 0) {
        //triggering across the map
        gameEnemies[i].attack(gameEnemies[i]["direction"]);
      } else if (vector[0] === 0 && (vector[1] > -2 && vector[1] < 2)) {
        gameEnemies[i].attack(gameEnemies[i]["direction"]);
      }
    }
  }
}
function enemyBehavior() {
  if (counter % monsterInterval === 0) {
    for (let i = 0; i < gameEnemies.length; i++) {
      setTimeout(function () {
        setTimeout(gameEnemies[i].choosePath(), monsterInterval);
      }, 10);
    }
  }
}
// function battle(attacker, attacked, mod = "0") {
//   console.log(`${attacker} moves to attack ${attacked}`);
//   let attackerRolled = attackRoll(6, mod);
//   let attackedRolled = attackRoll(6, mod);
//   console.log(attackerRolled, "<<attacker", attackedRoller, "<<attacked");
//   if (attackerRolled >= attackedRolled) {
//     attacked.heart--;
//   }
// }
function attackRoll(dice) {
  let total = 0;
  for (let i = 0; i < 3; i++) {
    const roll = Math.floor(Math.random() * dice) + 1;
    total = total + roll;
  }
  return total;
}
function randomItem() {
  console.log("randomItem is called ");
}
function addInventoryItem() {
  randomItem();
  console.log("addInventory Item is called item addded");
}
function resetMap() {
  currentMap++;
  $("#gameboard").empty();
  parseMap(currentMap);
  player.map++;
  player.populate(player.name);
  player.render("player");
  gameEnemies.length = 0;
  monstersDefeated = false;
  createMonsters();
}

function pageLoad(e) {
  e.preventDefault();
  const playerName = $(e.target["0"]).val();
  const playerClass = $(e.target["1"]).val();
  const playerColor = $(e.target["2"]).val();
  console.log('the create character was submitted')
  $("#character-creation-form").hide();

  startGame(5);
  gameStart = true;
  player.populate(playerName, playerClass, playerColor);
  $("#game-header").removeClass("hidden");
  $("#game-logo").show();
  $("#gameboard").show();
  $("#gameinfo-container").show();
  $("body").keypress(function (e) {
    //controls player movement & listens for interact keys: [f q]
    const keyed = event.which;
    // console.log(event.which)
    if (keyed === 119) {
      player.direction = "up";
      player.move();
    } else if (keyed === 115) {
      player.direction = "down";
      player.move();
    } else if (keyed === 97) {
      player.direction = "left";
      player.move();
    } else if (keyed === 100) {
      player.direction = "right";
      player.move();
    } else if (keyed === 102) {
      player.matrixArray(3);
    } else if (keyed === 101) {
      player.playerInteract();
    }
  });

  $("body").keydown(function (e) {
    //controls player attack
    const keyed = event.which;
    // console.log(event.which)
    if (keyed === 38) {
      player.attack("up");
    } else if (keyed === 40) {
      player.attack("down");
    } else if (keyed === 37) {
      player.attack("left");
    } else if (keyed === 39) {
      player.attack("right");
    } else {
    }
  });

  $("div.gameinfo-trigger").click(function () {
    hideItem(event);
  });
  $("div.gameinfo-trigger:first-child").click(function () {
    hideItem(event);
  });
  // }

}
function hideItem(e) {
  const label = e.target.id;
  let targets = label.split("-");
  let target = `#gameinfo-${targets[0]}-container`;
  if ($(target).hasClass("hidden")) {
    $(target).removeClass("hidden");
    $(target).show();
  } else {
    $(target).addClass("hidden");
    $(target).hide();
  }
}
function startGame(timed) {
  timelimit = timed;
  parseMap();
  createMonsters();
  const timer = setInterval(function () {
    gameClock.changeClock();
    if (!monstersDefeated) {
      enemyBehavior();
    }
    endGame();
    getDomProps();
    drawFogOfWar();
    counter++;
  }, 12);
  getDomProps();
}
function checkGameStatus() {
  const checkTreasure = $("div").hasClass("treasure");
  if (monstersDefeated === true && checkTreasure === false) {
    setTimeout(
      alert(`you have surpassed the challenges of this level of the dungeon`),
      1000
    );
    // console.log("next map render started");
    resetMap();
  } else {
    console.log("not ready to complete the dungeon");
    setTimeout(
      alert(`You have not faced all of this level's challenges`),
      1000
    );
  }
}
function getDomProps() {
  const target = $(`#gameboard`);
  cY = target["0"].offsetTop;
  cX = target["0"].offsetLeft;
  cHeight = target[0].offsetHeight;
  cWidth = target[0].offsetWidth;
}
function drawFogOfWar() {
  const canvas = document.getElementById("gameboard_fog");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, cWidth, cHeight);
  ctx.globalAlpha = 1; //clears screen
  const light = canvas.getContext("2d");
  // console.log(light)
  canvas.width = parseInt(cWidth);
  canvas.height = parseInt(cHeight);
  $("#gameboard_fog").css("top", cY);
  $("#gameboard_fog").css("left", cX);
  $("#gameboard_fog").css("position", "absolute");
  $("#gameboard_fog").css("z-index", 10);
  //   console.log(canvas);
  ctx.fillStyle = "rgb";
  ctx.fillRect(0, 0, cWidth, cHeight);
  light.fillStyle = "rgba(255,0,0,1)";
  const x = Math.floor(player.screenX - cX);
  const y = Math.floor(player.screenY - cY);
  // console.log(x, y)
  light.clearRect(x - 60, y - 60, 120, 120);
}
function endGame() {
  const playerFell = $("div.void").hasClass("player");
  if (
    player.heart <= 0 ||
    player.torch <= 0 ||
    timeOut === true ||
    playerFell === true
  ) {
    console.log('game over');
    if (timeOut === true) {
      clearInterval(timer);
      alert("time has run out");
      !timeOut;
    } else if (playerFell === true) {
      (`${player.name} has fallen to their death`);
      promptPlayAgain();
    } else if (player.hp <= 0) {
      alert("Your player has succumb to their injuries");
      promptPlayAgain();
    } else if (player.torch <= 0) {
      alert("When the lights go out the monsters surround you");
      promptPlayAgain();
    }


  }
}

function promptPlayAgain() {

  const replay = prompt("Would you like to play again (Y/N)", "N");

  if (replay === "Y") {
    location.reload();
  } else if (replay === "N") {
    window.close();
  } else if (replay !== null) {
    alert("please enter Y/N");
  } else {
    location.reload();
  }
}
gameSetup();

//troubleshooting dom navigation tool.
  // $("body").click(function () {
  //   const t = event.target
  //   console.log(t, t.offsetLeft, t.offsetWidth, t.offsetTop, t.offsetHeight);
  // });
