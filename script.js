window.addEventListener("DOMContentLoaded", main, false);

function main() {

    function act() {
        
    }

    function paint() {

    }

    function run() {
        requestAnimationFrame(run);
        act();
        paint(lienzo);
    }

    function start() {
        for(let x = 0; x < GRID_WIDTH; x++) {
            for(let y = 0; y < GRID_HEIGHT; y++) {
                lienzo.imageSmoothingEnabled = false;
                if(terrain.getCell(y, x) === 0) {
                    lienzo.drawImage(sprites[6], 24*x, 24*y, 24, 24);
                } else if (terrain.getCell(y, x) === 1) {
                    lienzo.drawImage(sprites[7], 24*x, 24*y, 24, 24);
                } else {
                    lienzo.drawImage(sprites[9], 24*x, 24*y, 24, 24);
                }
            }
        }

        let lastPress = null
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