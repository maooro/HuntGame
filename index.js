
//dom
const container = document.querySelector(".container");
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const score = document.querySelector("#score");
const lose = document.querySelector(".commands h1");

//interval
var movInterval;
const interval = 50;

//matrix size
const x = 20; //j
const y = 20; //i

class Dot {
    constructor() {
        this.randomize();
    }

    setCoord(x, y) {
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    randomize() {
        this.x = Math.floor(Math.random() * x);
        this.y = Math.floor(Math.random() * y);
    }
}

const food = new Dot();
const ekans = new Dot();
var bombs = new Array();
bombs.push(new Dot());
console.log(bombs);
//inserire le bombe da evitare, per non morire

var matrix = new Array(x);

const createGame = () => {
    //matrix
    for (let i = 0; i < x; i++) {
        matrix[i] = new Array(y);
    }
}

const render = () => {
    container.innerHTML = "";
    const table = document.createElement("table");
    table.classList.add("table");
    const body = document.createElement("tbody");
    for (let i = 0; i < x; i++) {
        const row = document.createElement("tr");
        body.appendChild(row);
        for (let j = 0; j < y; j++) {
            const col = document.createElement("td");
            //food
            if (i == food.getY() && j == food.getX()) {
                col.classList.add("isFood");
            }
            //ekans
            else if (i == ekans.getY() && j == ekans.getX()) {
                col.classList.add("isSnake");
            }
            //bomb
            else {
                for (let b = 0; b < bombs.length; b++) {
                    if (i == bombs[b].getY() && j == bombs[b].getX())
                        col.classList.add("isBomb");
                }
            }
            row.appendChild(col);
            table.appendChild(body);
        }
    }

    container.appendChild(table);
}

startBtn.addEventListener("click", () => {
    container.classList.remove("loser");
    lose.classList.remove("loser");
    bombs = [];
    food.randomize();
    ekans.randomize();
    render();
})

stopBtn.addEventListener("click", () => {
    clearInterval(movInterval);
})

const moveSnake = (axis, step) => {
    if (axis == 'x') {
        if (ekans.getX() + (step) < 0)
            ekans.setCoord(x - 1, ekans.getY());
        else if (ekans.getX() + (step) > x - 1)
            ekans.setCoord(0, ekans.getY());

        else ekans.setCoord(ekans.getX() + (step), ekans.getY());
    }
    else if (axis == 'y') {
        if (ekans.getY() + (step) < 0)
            ekans.setCoord(ekans.getX(), y - 1);
        else if (ekans.getY() + (step) > y - 1)
            ekans.setCoord(ekans.getX(), 0);

        else ekans.setCoord(ekans.getX(), ekans.getY() + (step));
    }

    if (ekans.getX() == food.getX() && ekans.getY() == food.getY()) {
        food.randomize();
        score.innerHTML = parseInt(score.innerHTML) + 10;
        bombs.push(new Dot());
    }
    else {
        for (let b = 0; b < bombs.length; b++) {
            if (ekans.getX() == bombs[b].getX() && ekans.getY() == bombs[b].getY()) {
                stopBtn.click();
                container.classList.add("loser");
                lose.classList.add("loser");
            }
        }
    }
    render();
}

document.addEventListener('keydown', (event) => {
    if (!container.classList.contains("loser")) {
        clearInterval(movInterval);
        switch (event.code) {
            case 'ArrowUp':
                function moveUp() {
                    moveSnake('y', -1);
                }
                movInterval = setInterval(moveUp, interval);
                break;
            case 'ArrowLeft':
                function moveLeft() {
                    moveSnake('x', -1);
                }
                movInterval = setInterval(moveLeft, interval);
                break;
            case 'ArrowRight':
                function moveRight() {
                    moveSnake('x', 1);
                }
                movInterval = setInterval(moveRight, interval);
                break;
            case 'ArrowDown':
                function moveDown() {
                    moveSnake('y', 1);
                }
                movInterval = setInterval(moveDown, interval);
                break;
        }
    }
}, false);

createGame();
render();