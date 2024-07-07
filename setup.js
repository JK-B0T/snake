const canvas = document.querySelector("canvas");
const lienzo = canvas.getContext('2d'); // 21 width, 13 height
const GRID_WIDTH = 21;
const GRID_HEIGHT = 13;
let controllerDirection = "ArrowRight";
let sprites = [];

const srcs = [
    './sprites/sHeadUp.png', //0
    './sprites/sHeadRight.png', //1
    './sprites/sHeadDown.png', //2
    './sprites/sHeadLeft.png', //3
    './sprites/sBodyV1.png', //4
    './sprites/sBodyV2.png', //5
    './sprites/sBodyH1.png', //6
    './sprites/sBodyH2.png', //7
    './sprites/sBodyFatV.png', //8
    './sprites/sBodyFatH.png', //9
    './sprites/sTurnUpRight.png', //10
    './sprites/sTurnUpLeft.png', //11
    './sprites/sTurnDownRight.png', //12
    './sprites/sTurnDownLeft.png', //13
    './sprites/sFatUpRight.png', //14
    './sprites/sFatUpLeft.png', //15
    './sprites/sFatDownRight.png', //16
    './sprites/sFatDownLeft.png', //17
    './sprites/sTailUp1.png', //18
    './sprites/sTailUp2.png', //19
    './sprites/sTailRight1.png', //20
    './sprites/sTailRight2.png', //21
    './sprites/sTailDown1.png', //22
    './sprites/sTailDown2.png', //23
    './sprites/sTailLeft1.png', //24
    './sprites/sTailLeft2.png', //25
    './sprites/sFatTailUp.png', //26
    './sprites/sFatTailRight.png', //27
    './sprites/sFatTailDown.png', //28
    './sprites/sFatTailLeft.png', //29
    './sprites/field.png', //30
    './sprites/mud.png', //31
    './sprites/mud1.png', //32
    './sprites/water.png', //33
    './sprites/fruit.png', //34
    './sprites/ratUp1.png', //35
    './sprites/ratUp2.png', //36
    './sprites/ratRight1.png', //37
    './sprites/ratRight2.png', //38
    './sprites/ratDown1.png', //39
    './sprites/ratDown2.png', //40
    './sprites/ratLeft1.png', //41
    './sprites/ratLeft2.png', //42
    './sprites/antHill.png', //43
    './sprites/antsUp1.png', //44
    './sprites/antsUp2.png', //45
    './sprites/antsRight1.png', //46
    './sprites/antsRight2.png', //47
    './sprites/antsDown1.png', //48
    './sprites/antsDown2.png', //49
    './sprites/antsLeft1.png', //50
    './sprites/antsLeft2.png', //51
    './sprites/signal.png', //52
    './sprites/redSignal.png', //53
];

async function preloadImages(srcs) {
    const promises = srcs.map((src) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
  
        image.src = src;
  
        image.onload = () => resolve(image);
        image.onerror = () => reject(`Image failed to load: ${src}`);
      });
    });
  
    return Promise.all(promises);
}

const boardManager = (() => {
    let gridList = {};

    const createGrid = (name, rows, columns) => {
        let grid = [];
        for (let x = 0; x < rows; x++) {
            grid[x] = [];
            for (let y = 0; y < columns; y++) {
                grid[x][y] = null;
            }
        }

        const fillGrid = (value) => {
            for (let x = 0; x < rows; x++) {
                for (let y = 0; y < columns; y++) {
                    grid[x][y] = value;
                }
            }
        }

        const printGrid = () => {
            let string = "";
            for (let x = 0; x < rows; x++) {
                string += "\n"
                for (let y = 0; y < columns; y++) {
                    string += grid[x][y];
                }
            }
            console.log(string);
        }

        const replaceGrid = (newGrid) => {
            grid = newGrid;
        }

        const getCell = (y, x) => {
            return grid[y][x];
        }

        const setCell = (y, x, value) => {
            grid[y][x] = value;
        }

        const getHeight = () => {
            return rows;
        }

        const getWidth = () => {
            return columns;
        }

        gridList[name] = {getCell, setCell, fillGrid, replaceGrid, getHeight, getWidth, printGrid};
    }

    const getGrid = (name) => {
        return gridList[name];
    }

    return {createGrid, getGrid};
})();

const colorize = (image, r, g, b) => {
    const imageSize = image.width;
  
    const offscreen = new OffscreenCanvas(imageSize, imageSize);
    const ctx = offscreen.getContext("2d");
  
    ctx.drawImage(image, 0, 0);
  
    const imageData = ctx.getImageData(0, 0, imageSize, imageSize);
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i + 0] *= r;
      imageData.data[i + 1] *= g;
      imageData.data[i + 2] *= b;
    }
  
    ctx.putImageData(imageData, 0, 0);
  
    return offscreen;
}

boardManager.createGrid("terrain", GRID_HEIGHT, GRID_WIDTH);
const terrain = boardManager.getGrid("terrain");
terrain.replaceGrid([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //1
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //2
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //3
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], //4
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], //5
    [0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0], //6
    [0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0], //7
    [0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0], //8
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], //9
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], //10
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //11
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //12
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //13
]);

boardManager.createGrid("entity", GRID_HEIGHT, GRID_WIDTH);
const entities = boardManager.getGrid("entity");
entities.replaceGrid([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //1
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //2
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //3
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //4
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //5
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //6
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //7
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //8
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //9
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //10
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //11
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //12
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //13
]);

const mover = (state, posX, posY) => ({
    pos: {
        x: posX,
        y: posY,
    },

    lastPos: {
        x: posX, 
        y: posY,
    },

    changePos: function () {
        entities.setCell(this.lastPos.y, this.lastPos.x, 0);
        entities.setCell(this.pos.y, this.pos.x, state.type);
    },

    changeLastPos: function () {
        this.lastPos.y = this.pos.y;
        this.lastPos.x = this.pos.x; 
    },

    moveUp: function() {if (this.pos.y-1 >= 0) {
        this.pos.y -= 1;
    }},
    moveDown: function() {if (this.pos.y+1 < GRID_HEIGHT) {
        this.pos.y += 1;
    }},
    moveRight: function() {if (this.pos.x+1 < GRID_WIDTH) {
        this.pos.x += 1;
    }},
    moveLeft: function() {if (this.pos.x-1 >= 0) {
        this.pos.x -= 1;
    }},
});

const playerMover = (state, posX, posY) => ({

    pos: {
        x: posX,
        y: posY,
    },

    lastPos: {
        x: posX - state.snake.length, 
        y: posY,
    },

    changePos: function () {
        entities.setCell(this.lastPos.y, this.lastPos.x, 0);
        entities.setCell(this.pos.y, this.pos.x, state.type);
    },

    changeLastPos: function () {
        if (entities.getCell(this.lastPos.y, this.lastPos.x) !== 4) {
            if(this.snake[0] === "u") {
                this.lastPos.y -= 1;
                this.snake.shift();
            } else if (this.snake[0] === "d") {
                this.lastPos.y += 1;
                this.snake.shift();
            } else if (this.snake[0] === "r") {
                this.lastPos.x += 1;
                this.snake.shift();
            } else if (this.snake[0] === "l") {
                this.lastPos.x -= 1;
                this.snake.shift();
            }
        }
    },

    moveUp: function() {if (this.pos.y-1 >= 0) {
        this.pos.y -= 1;
        this.snake.push("u");
        this.changeLastPos();
    }},
    moveDown: function() {if (this.pos.y+1 < GRID_HEIGHT) {
        this.pos.y += 1;
        this.snake.push("d");
        this.changeLastPos();
    }},
    moveRight: function() {if (this.pos.x+1 < GRID_WIDTH) {
        this.pos.x += 1;
        this.snake.push("r");
        this.changeLastPos();
    }},
    moveLeft: function() {if (this.pos.x-1 >= 0) {
        this.pos.x -= 1;
        this.snake.push("l");
        this.changeLastPos();
    }},

    createController: function() {
        const self = this;
        document.addEventListener('keydown', function(e) {
            const headDirection = self.snake[self.snake.length-1];
            if ((e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowRight") 
                && ((headDirection === "u" && e.key !== "ArrowDown")
                || (headDirection === "r" && e.key !== "ArrowLeft")
                || (headDirection === "d" && e.key !== "ArrowUp")
                || (headDirection === "l" && e.key !== "ArrowRight"))) {
                controllerDirection = e.key;
            }
        }, false);
    },

    updatePos: function() {
        entities.printGrid();
        console.log(this.snake);

        if (controllerDirection == "ArrowUp") {
            this.moveUp();
        } else if (controllerDirection == "ArrowDown") {
            this.moveDown();
        } else if (controllerDirection == "ArrowRight") {
            this.moveRight();
        } else if (controllerDirection == "ArrowLeft") { 
            this.moveLeft();
        }        
        this.changePos();
    },
});

const player = (name, posX, posY) => {
    let state = {
        name,
        speed: 1,
        type: 1,
        color: [0.85, 1, 0],
        hasEaten: false,
        snake: ["r","r"],
    }

    return Object.assign(
        {},
        state,
        playerMover(state, posX, posY),
    )
}

/* ---Ejemplo de pintar imagen---
const img = new Image();
img.src = "./sprites/sHead.png";
console.log(img)
img.addEventListener("load",() => {
    lienzo.imageSmoothingEnabled = false;

    const colorizedImage = colorize(img, 1, 1, 0);
    lienzo.drawImage(colorizedImage, 24*0, 0, 24, 24);
}, false);
*/