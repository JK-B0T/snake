window.addEventListener("DOMContentLoaded", main, false);

function main() {
    const canvas = document.querySelector("canvas");
    const lienzo = canvas.getContext('2d');

    lienzo.fillRect(10, 10, 50, 50);
    lienzo.fillStyle = "#ff7bd4";
    lienzo.fillRect(70, 10, 50, 50);
}