window.addEventListener("DOMContentLoaded", main, false);

function main() {
    const player1 = player("player", 0, 0)
    console.log(player1);

    function act() {
        player1.updatePos();
        console.log(player1.pos.x, player1.pos.y, "/", player1.lastPos.x, player1.lastPos.y);
    }

    function paint() {
        paintTerrain(player1.lastPos.x, player1.lastPos.y);
        paintPlayer();
        
    }

    function paintPlayer() {
        lienzo.drawImage(colorize(sprites[0],0.85,1,0), 24*player1.pos.x, 24*player1.pos.y, 24, 24);
    }

    function paintTerrain(x, y) {
        lienzo.imageSmoothingEnabled = false;
        if(terrain.getCell(y, x) === 0) {
            lienzo.drawImage(sprites[6], 24*x, 24*y, 24, 24);
        } else if (terrain.getCell(y, x) === 1) {
            lienzo.drawImage(sprites[7], 24*x, 24*y, 24, 24);
        } else {
            lienzo.drawImage(sprites[9], 24*x, 24*y, 24, 24);
        }
    }

    let last = 0;
    function run(now) {
        if(!last || now - last >= 0.25*1000) {
            last = now;
            act();
            paint(lienzo);
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
            lastPress = e.key;
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