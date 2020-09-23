import { Quad } from './quad.js';

const centers = [
  { x: 200, y: 200 },
  { x: 600, y: 200 },
  { x: 200, y: 600 },
  { x: 600, y: 600 },
];
// const centers = [{ x: 400, y: 400 }];

const sizesSide = [2, 4, 6, 8, 16, 32, 64, 128, 256];

// const sizesSide = [100];

let quads = [];

function setup() {
  createCanvas(800, 800);

  centers.forEach((center) => {
    sizesSide.forEach((sizeSide) => {
      quads.push(new Quad(center.x, center.y, sizeSide));
    });
  });
}

function draw() {
  background(240);

  noFill();

  quads.forEach((quad) => {
    quad.draw();
  });
}

window.setup = setup;
window.draw = draw;
