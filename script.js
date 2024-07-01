window.addEventListener("DOMContentLoaded", main, false);

function main() {
    const player1 = player("player", 0, 0)
    console.log(player1);

    function act() {
        player1.updatePos();
        console.log(player1.pos.x, player1.pos.y, "/", player1.headLastPos.x, player1.headLastPos.y);
    }

    function paint() {
        paintTerrain(player1.headLastPos.x, player1.headLastPos.y);
        paintPlayer();
        
    }

    function paintPlayer() {
        if (currentDirection == "ArrowUp") {
            lienzo.drawImage(colorize(sprites[0],player1.color[0], player1.color[1], player1.color[2]), 24*player1.pos.x, 24*player1.pos.y, 24, 24);
        } else if (currentDirection == "ArrowRight") {
            lienzo.drawImage(colorize(sprites[1],player1.color[0], player1.color[1], player1.color[2]), 24*player1.pos.x, 24*player1.pos.y, 24, 24);
        } else if (currentDirection == "ArrowDown") {
            lienzo.drawImage(colorize(sprites[2],player1.color[0], player1.color[1], player1.color[2]), 24*player1.pos.x, 24*player1.pos.y, 24, 24);
        } else if (currentDirection == "ArrowLeft") {
            lienzo.drawImage(colorize(sprites[3],player1.color[0], player1.color[1], player1.color[2]), 24*player1.pos.x, 24*player1.pos.y, 24, 24);
        }
    }

    function paintTerrain(x, y) {
        lienzo.imageSmoothingEnabled = false;
        if(terrain.getCell(y, x) === 0) {
            lienzo.drawImage(sprites[30], 24*x, 24*y, 24, 24);
        } else if (terrain.getCell(y, x) === 1) {
            lienzo.drawImage(sprites[31], 24*x, 24*y, 24, 24);
        } else {
            lienzo.drawImage(sprites[33], 24*x, 24*y, 24, 24);
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

        document.addEventListener('keydown', function(e) {
            if ((currentDirection === "ArrowUp" && e.key !== "ArrowDown")
                || (currentDirection === "ArrowRight" && e.key !== "ArrowLeft")
                || (currentDirection === "ArrowDown" && e.key !== "ArrowUp")
                || (currentDirection === "ArrowLeft" && e.key !== "ArrowRight")) {
                lastDirection = currentDirection;
                currentDirection = e.key;
            }
        }, false);

        run();
    }

    preloadImages(srcs).then(result => {
        sprites = result;
        start();
    }).catch(error => {
        console.error(error);
    });
}