
class Enemy {
    constructor(stats, idx) {
        this.monsterCount = idx
        this.name = stats.name;
        this.heart = stats.hp;
        this.armor = 2;
        this.speed = 200;
        this.bordercolor = stats.bordercolor;
        this.color = stats.color;
        this.x = stats.cell;
        this.y = stats.row;
        this.map = currentMap;
        this.origin = [currentMap, stats.row, stats.cell]; // was going to be used for a patrol function;
        this.direction = [];
        this.direction = "";
        this.distance;
        this.options = stats.options;
        this.render();
    }
    choosePath() {
        if (this.heart > 0) {
            const path = this.options[Math.floor(Math.random() * this.options.length)]; //path random but if it read through options in order and returned path      
            this.direction = path;
            this.move();
            this.render();
        }
    };
    pathIsClear(y, x) {
        const blocked = $(`#cell_${this.map}_${this.y + y}_${this.x + x}`).hasClass('wall')
        const locked = $(`#cell_${this.map}_${this.y + y}_${this.x + x}`).hasClass('locked')
        const occupied = $(`#cell_${this.map}_${this.y + y}_${this.x + x}`).hasClass('enemy')
        const isPlayer = $(`#cell_${this.map}_${this.y + y}_${this.x + x}`).hasClass('player')
        const isLava = $(`#cell_${this.map}_${this.y + y}_${this.x + x}`).hasClass('lava')
        const isVoid = $(`#cell_${this.map}_${this.y + y}_${this.x + x}`).hasClass('void')
        if (blocked === false && locked === false && occupied === false && isPlayer === false && isLava === false && isVoid === false) {
            return true;
        } return false;
    };
    move() {
        $(`#cell_${this.map}_${this.y}_${this.x}`).removeClass(`enemy ${this.name}`);
        $(`#cell_${this.map}_${this.y}_${this.x}`).attr('style', "");
        if (this.direction === "up" && this.y > 0) {
            if (this.pathIsClear(-1, 0)) {
                this.y--
            }
        } else if (this.direction === "down" && this.y < rows) {
            if (this.pathIsClear(1, 0)) {
                this.y++
            }
        } else if (this.direction === "left" && this.x > 0) {
            if (this.pathIsClear(0, -1)) {
                this.x--
            }
        } else if (this.direction === "right" && this.x < columns) {
            if (this.pathIsClear(0, 1)) {
                this.x++
            }
        }
        this.position = [this.map, this.y, this.x];
    };
    attack(direction) {
        this.direction == direction;
        setTimeout(function () {
            $('div.player').append(`<div class=enemyAttacked></div>`);
            $('div.player').addClass('enemyAttack')
            //trigger Battle Calculation
            this.attackdir = ""
            const attack = attackRoll(6);
            if (attack > 10 + player.armor) {
                player.heart--
                console.log(player.heart, 'Player hp remaining')

            }

        }, this.speed * 5);

        setTimeout(function () {
            console.log(`${this.name} finishes his attack`)
            $('div.player').empty();
            $('div').removeClass('enemyAttacked')
            $('.div').removeClass('enemyAttack')
        }, this.speed * 8);

    };
    render() {
        const enemyPosition = `#cell_${this.map}_${this.y}_${this.x}`
        $(enemyPosition).addClass(`enemy ${this.name}`);
        $(enemyPosition).css("background-color", ` ${this.color}`);
        $(enemyPosition).css("border", `2px dotted ${this.bordercolor}`);
    };
    removeEnemy() {
        $(`#cell_${this.map}_${this.y}_${this.x}`).removeClass(`enemy ${this.name}`);
        $(`#cell_${this.map}_${this.y}_${this.x}`).attr('style', "");
        console.log(`${this.name} defeated!`)
        if (gameEnemies.length === 1) {
            gameEnemies.pop();
            monstersDefeated = true;
            alert('all monsters defeated', monstersDefeated)
            console.log(gameEnemies);
        } else if (gameEnemies.length > 1) {
            gameEnemies.splice(this.monsterCount, 1)
        }
    }
} 