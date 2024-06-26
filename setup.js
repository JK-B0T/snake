const canvas = document.querySelector("canvas");
const lienzo = canvas.getContext('2d'); // 21 width, 13 height
const GRID_WIDTH = 21;
const GRID_HEIGHT = 13;
let sprites = [];

const srcs = [
    './sprites/sHead.png', //0
    './sprites/sBodyLeft.png', //1
    './sprites/sBodyRight.png', //2
    './sprites/sTailLeft.png', //3
    './sprites/sTailRight.png', //4
    './sprites/sBodyFat.png', //5
    './sprites/field.png', //6
    './sprites/mud.png', //7
    './sprites/mud1.png', //8
    './sprites/water.png', //9
    './sprites/fruit.png', //10
    './sprites/ratStep1.png', //11
    './sprites/ratStep2.png', //12
    './sprites/antHill.png', //13
    './sprites/ants1.png', //14
    './sprites/ants2.png', //15
    './sprites/signal.png', //16
    './sprites/redSignal.png', //17
    './sprites/sBodyTurn.png', //18
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

        const replaceGrid = (newGrid) => {
            grid = newGrid;
        }

        const getCell = (x, y) => {
            return grid[x][y];
        }

        const setCell = (x, y, value) => {
            grid[x][y] = value;
        }

        const getHeight = () => {
            return rows;
        }

        const getWidth = () => {
            return columns;
        }

        gridList[name] = {getCell, setCell, fillGrid, replaceGrid, getHeight, getWidth};
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

/*
const img = new Image();
img.src = "./sprites/sHead.png";
console.log(img)
img.addEventListener("load",() => {
    lienzo.imageSmoothingEnabled = false;

    const colorizedImage = colorize(img, 1, 1, 0);
    lienzo.drawImage(colorizedImage, 24*0, 0, 24, 24);
}, false);
*/