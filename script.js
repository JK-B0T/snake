window.addEventListener("DOMContentLoaded", main, false);

function main() {
    const canvas = document.querySelector("canvas");
    const lienzo = canvas.getContext('2d');

    const colorize = (image, r, g, b) => {
        const imageSize = image.width;
      
        const offscreen = new OffscreenCanvas(imageSize, imageSize);
        const ctx = offscreen.getContext("2d");
      
        ctx.drawImage(image, 0, 0);
      
        const imageData = ctx.getImageData(0, 0, imageSize, imageSize);
        console.log(imageData);
        for (let i = 0; i < imageData.data.length; i += 4) {
          imageData.data[i + 0] *= r;
          imageData.data[i + 1] *= g;
          imageData.data[i + 2] *= b;
          console.log(i, imageData.data[i + 0], imageData.data[i + 1], imageData.data[i + 2])
        }
      
        ctx.putImageData(imageData, 0, 0);
      
        return offscreen;
    }

    const img = new Image();
    img.src = "./sprites/sHead.png";
    img.addEventListener("load",() => {
        lienzo.imageSmoothingEnabled = false;

        const colorizedImage = colorize(img, 1, 1, 0);
        lienzo.drawImage(colorizedImage, 0, 0, 24, 24);
    }, false);

    const img2 = new Image();
    img2.src = "./sprites/ratStep1.png";
    img2.addEventListener("load",() => {
        lienzo.imageSmoothingEnabled = false;
        
        lienzo.drawImage(img2, 25, 0, 24, 24);
    }, false);

    function act() {
        
    }

    function paint() {

    }

    function run() {
        requestAnimationFrame(run);
        act();
        paint(lienzo);
    }
}