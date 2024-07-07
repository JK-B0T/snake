window.addEventListener("DOMContentLoaded", main, false);

function main() {
    const player1 = player("player", 0, 0)

    function act() {
        player1.updatePos();
    }

    function paint() {
        paintTerrain(player1.lastPos.x, player1.lastPos.y);
        paintPlayerHead();
        //paintPlayerBody();
        //paintPlayerTail();
        //paintEntities();
    }

    function paintPlayerHead() {
        if (controllerDirection == "ArrowUp") {
            lienzo.drawImage(colorize(sprites[0],player1.color[0], player1.color[1], player1.color[2]), 48*player1.pos.x, 48*player1.pos.y, 48, 48);
        } else if (controllerDirection == "ArrowRight") {
            lienzo.drawImage(colorize(sprites[1],player1.color[0], player1.color[1], player1.color[2]), 48*player1.pos.x, 48*player1.pos.y, 48, 48);
        } else if (controllerDirection == "ArrowDown") {
            lienzo.drawImage(colorize(sprites[2],player1.color[0], player1.color[1], player1.color[2]), 48*player1.pos.x, 48*player1.pos.y, 48, 48);
        } else if (controllerDirection == "ArrowLeft") {
            lienzo.drawImage(colorize(sprites[3],player1.color[0], player1.color[1], player1.color[2]), 48*player1.pos.x, 48*player1.pos.y, 48, 48);
        }
    }

    function paintPlayerBody() {
        if (controllerDirection == "ArrowUp") {
            lienzo.drawImage(colorize(sprites[0],player1.color[0], player1.color[1], player1.color[2]), 48*player1.pos.x, 48*player1.pos.y, 48, 48);
        } else if (controllerDirection == "ArrowRight") {
            lienzo.drawImage(colorize(sprites[1],player1.color[0], player1.color[1], player1.color[2]), 48*player1.pos.x, 48*player1.pos.y, 48, 48);
        } else if (controllerDirection == "ArrowDown") {
            lienzo.drawImage(colorize(sprites[2],player1.color[0], player1.color[1], player1.color[2]), 48*player1.pos.x, 48*player1.pos.y, 48, 48);
        } else if (controllerDirection == "ArrowLeft") {
            lienzo.drawImage(colorize(sprites[3],player1.color[0], player1.color[1], player1.color[2]), 48*player1.pos.x, 48*player1.pos.y, 48, 48);
        }
    }

    function paintPlayerTail() {
        if (controllerDirection == "ArrowUp") {
            lienzo.drawImage(colorize(sprites[0],player1.color[0], player1.color[1], player1.color[2]), 48*player1.pos.x, 48*player1.pos.y, 48, 48);
        } else if (controllerDirection == "ArrowRight") {
            lienzo.drawImage(colorize(sprites[1],player1.color[0], player1.color[1], player1.color[2]), 48*player1.pos.x, 48*player1.pos.y, 48, 48);
        } else if (controllerDirection == "ArrowDown") {
            lienzo.drawImage(colorize(sprites[2],player1.color[0], player1.color[1], player1.color[2]), 48*player1.pos.x, 48*player1.pos.y, 48, 48);
        } else if (controllerDirection == "ArrowLeft") {
            lienzo.drawImage(colorize(sprites[3],player1.color[0], player1.color[1], player1.color[2]), 48*player1.pos.x, 48*player1.pos.y, 48, 48);
        }
    }

    function paintTerrain(x, y) {
        lienzo.imageSmoothingEnabled = false;
        if(terrain.getCell(y, x) === 0) {
            lienzo.drawImage(sprites[30], 48*x, 48*y, 48, 48);
        } else if (terrain.getCell(y, x) === 1) {
            lienzo.drawImage(sprites[31], 48*x, 48*y, 48, 48);
        } else {
            lienzo.drawImage(sprites[33], 48*x, 48*y, 48, 48);
        }
    }

    let last = 0;
    function run(now) {
        if(!last || now - last >= 0.33*1000) {
            last = now;
            act();
            paint(lienzo);
        } else if(!last || now - last >= 0.16*1000) {
             //animate
        }
        requestAnimationFrame(run);
    }

    function start() {
        for(let x = 0; x < GRID_WIDTH; x++) {
            for(let y = 0; y < GRID_HEIGHT; y++) {
                paintTerrain(x, y);
            }
        }
        player1.createController();

        run();
    }

    preloadImages(srcs).then(result => {
        sprites = result;
        start();
    }).catch(error => {
        console.error(error);
    });
}