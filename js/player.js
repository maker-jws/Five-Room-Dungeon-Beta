const freeSpace = !$("div").hasClass("wall" || "locked");
const player = {
  name: "",
  torch: 3,
  heart: 10,
  armor: 2,
  speed: 20,
  inventory: [],
  x: 0,
  y: 0,
  map: currentMap,
  key: false,
  direction: "",
  attackdir: "",
  attackTarget: [],
  searching: false,
  searchMatrix: [],
  color: "",
  class: "",
  screenX: 0,
  screenY: 0,

  activate(targetClass) {
    if ($(".player").hasClass(targetClass)) {
      return true;
    }
  },
  attack(direction) {
    //this could be cleaned up
    const character = player;
    if (direction == "up") {
      $(`#cell_${character.map}_${character.y - 1}_${character.x}`).addClass(
        "playerAttacked"
      );
      this.attackTarget = [0, character.y - 1, character.x];
    } else if (direction == "down") {
      $(`#cell_${character.map}_${character.y + 1}_${character.x}`).addClass(
        "playerAttacked"
      );
      this.attackTarget = [0, character.y + 1, character.x];
    } else if (direction == "left") {
      $(`#cell_${character.map}_${character.y}_${character.x - 1}`).addClass(
        "playerAttacked"
      );
      this.attackTarget = [0, character.y, character.x - 1];
    } else if (direction === "right") {
      $(`#cell_${character.map}_${character.y}_${character.x + 1}`).addClass(
        "playerAttacked"
      );
      this.attackTarget = [0, character.y, character.x + 1];
    } else {
    }
    // console.log(this.attackTarget)
    this.checkHit();

    setTimeout(function () {
      console.log(`${character.name} finishes his attack`);
      $("div").removeClass("playerAttacked");
      $(".playerAttack").remove();
    }, this.speed * 10);
  },
  checkHealth: function () {
    if (this.health <= 0) {
      endGame();
    } else if ($("div.void").hasClass("player")) {
      endGame();
    }
  },
  checkHit() {
    const attackedEnemy = $(".enemy").hasClass("playerAttacked"); //returns T/F
    if (attackedEnemy) {
      gameEnemies.forEach(enemy => {
        if (
          this.attackTarget[1] === enemy.position[1] &&
          this.attackTarget[2] === enemy.position[2]
        ) {
          enemy.heart--;
          if (enemy.heart <= 0) {
            enemy.removeEnemy();
          }
        }
      });
    }
  },
  checkTunnel: function () {
    const playerInTunnel = $(".tunnel").hasClass("player");
    if (playerInTunnel) {
      tunnelLocations.reverse();
      //function called every 1/10th second - if player in tunnel
      for (let i = 0; i < tunnelLocations.length; i++)
        if (
          tunnelLocations[i][1] !== player.y &&
          tunnelLocations[i][2] !== player.x
        ) {
          //if player is not in this tunnel
          player.y = tunnelLocations[i][1]; //set the player.y to the 2nd item of the array i
          player.x = tunnelLocations[i][2]; //set the player.x to the 2nd item of the array i
          setTimeout(() => {
            // $('div').removeClass('star')//removes star class
            player.render("player");
            tunnelLocations.reverse();
          }, 120);
        }
    }
  },
  interact() {
    if (this.activate("treasure")) {
      console.log(`....you found treasure`);
      addInventoryItem(1);
      player.torch = player.torch + Math.floor(Math.random() * 3);
      $("div.player").removeClass("treasure");
      $("div.player").addClass("floor");
    } else if (this.activate("key")) {
      console.log("....you found a key");
      this.key = true;
      $("div.player").removeClass("key");
    }
  },
  matrixArray(range) {
    const r = range;
    const mVals = [];
    let col = 0;
    let row = 0;
    const length = (2 * range + 1) ** 2;
    console.log(length, "length of matrix");
    for (let i = 0; i < length; i++) {
      if (i === Math.floor(length / 2)) {
        mVals[0] = 0;
        mVals[1] = 0;
        col++;
      } else if (i === Math.sqrt(length) * (1 + row)) {
        col = 0;
        row++;
        mVals[0] = row - r;
        mVals[1] = col - r;
        col++;
      } else {
        mVals[0] = row - r;
        mVals[1] = col - r;
        col++;
      }
      this.searchMatrix[i] = [mVals[0], mVals[1]];
    }
    return setTimeout(this.searchArea(), 150);
  },
  findScreenPosition() {
    const character = this;
    const playerPosition = `#cell_${character.map}_${character.y}_${character.x}`;
    const screenObj = $(playerPosition)[0];
    const screenX = screenObj.offsetLeft + screenObj.offsetWidth / 2;
    const screenY = screenObj.offsetTop + screenObj.offsetHeight / 2;
    // console.log(this.screenX, this.screenY);
    return (this.screenX = screenX), (this.screenY = screenY);
  },
  move() {
    // $(playerPosition).attr("style", ``)
    this.findScreenPosition();
    if (this.direction === "up" && this.y > 0) {
      if (this.pathIsClear(-1, 0)) {
        this.y--;
      }
    } else if (this.direction === "down" && this.y < rows) {
      if (this.pathIsClear(1, 0)) {
        this.y++;
      }
    } else if (this.direction === "left" && this.x > 0) {
      if (this.pathIsClear(0, -1)) {
        this.x--;
      }
    } else if (this.direction === "right" && this.x < columns) {
      if (this.pathIsClear(0, 1)) {
        this.x++;
      }
    } else {
      console.log("player doesnt move");
    }
    this.interact();
    this.render("player");
  },

  pickLock() {
    let target = 13;
    if (attackRoll(6) >= target) {
      console.log("you successfull pick the lock");
      return true;
    } else {
      console.log("you could not pick the lock");
      if (target < 17) {
        target = target + 1;
        // console.log(target, 'current target')
      }
      return false;
    }
  },
  playerInteract() {
    const nearby = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 0],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];
    if (gameStart) {
      for (let i = 0; i < nearby.length; i++) {
        const y = parseInt(player.y) + nearby[i][0];
        const x = parseInt(player.x) + nearby[i][1];
        const cell = `#cell_0_${y}_${x}`;
        if ($(cell).hasClass("locked")) {
          const results = this.pickLock();
          // console.log(results);
          if (results === true) {
            $(cell).removeClass("locked");
          } else {
            ("lock pick failed");
          }
        } else if ($(cell).hasClass("goal")) {
          checkGameStatus();
          console.log('initiate level transfer function')
        }
        //test migrate interact functions to playerInteract - so they are under their control...
      }
      this.torch = this.torch - 0.1;
      // console.log(this.torch);
    }
  },
  populate: function (alias, type, color) {
    const start = $("div.star");
    this.name = alias;
    this.class = type;
    this.color = color;
    this.y = start.attr("y");
    this.x = start.attr("x");
    this.map = currentMap;
    start.addClass("player");
    console.log(`${this.name} joined the game`);
    // console.log(this);
    this.render("player");
  },
  pathIsClear(y, x) {
    const blocked = $(`#cell_${this.map}_${this.y + y}_${this.x + x}`).hasClass(
      "wall"
    );
    const locked = $(`#cell_${this.map}_${this.y + y}_${this.x + x}`).hasClass(
      "locked"
    );
    const occupied = $(
      `#cell_${this.map}_${this.y + y}_${this.x + x}`
    ).hasClass("enemy");
    const inTunnel = $(
      `#cell_${this.map}_${this.y + y}_${this.x + x}`
    ).hasClass("tunnel");
    const foundTreasure = $(
      `#cell_${this.map}_${this.y + y}_${this.x + x}`
    ).hasClass("treasure");
    if (inTunnel === true) {
      console.log("inTunnel");
      return true;
    } else if (foundTreasure === true) {
      console.log("found treasure");
      return true;
    } else if (blocked === false && locked === false && occupied === false) {
      return true;
    }
    return false;
  },
  render(newClass) {
    const character = this;
    const playerPosition = `#cell_${character.map}_${character.y}_${character.x}`;

    setTimeout(function () {
      // controls player speed by determining its update
      $('.player').attr(`style`, ``)
      $("div").removeClass("player");

      //remove styling at playerPosition
      $(playerPosition).addClass(newClass);
      // console.log(character.color)
      $(playerPosition).attr(`style`, `background-color: ${character.color}`)
      //add styling attribute - JQUERY //has to be at same speed as interact.
    }, this.speed);
  },
  searchArea() {
    this.torch = this.torch - 0.5;
    // console.log(this.torch);
    for (m = 0; m < this.searchMatrix.length; m++) {
      const targ = this.searchMatrix[m];
      const y = parseInt(player.y) + targ[0];
      const x = parseInt(player.x) + targ[1];
      const cell = `#cell_0_${y}_${x}`;
      // console.log(cell)
      if ($(cell).hasClass("locked")) {
        console.log("the door near by is locked");
        if (this.key === true) {
          // console.log("key", this.key, cell, "cell");
          $(cell).removeClass("locked");
          this.key = false;
        }
        console.log("player finds locked door");
        return true;
      } else if ($(cell).hasClass("trapped")) {
        console.log("you discover a trapped");
        $(cell).addClass("found-trap");
        return true;
      } else {
        console.log("you dont find anything");
      }
    }
  }
};

