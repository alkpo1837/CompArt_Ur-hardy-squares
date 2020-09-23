import { Quad } from './quad.js';

const centers = [
  { x: 200, y: 200 },
  { x: 600, y: 200 },
  { x: 200, y: 600 },
  { x: 600, y: 600 },
];
// const centers = [{ x: 400, y: 400 }];

// const sizesSide = [2, 4, 6, 8, 16, 32, 64, 128, 256];
// const sizesSide = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 388];

// const sizesSide = [100];

let quads = [];
let drawIteration = 4;
let song;

function preload() {
  song = loadSound('hardy.mp3');
}

function setup() {
  let sizesSide = [];

  for (let i = 25; i < 399; i += 10) sizesSide.push(i);

  createCanvas(800, 800);

  sizesSide.forEach((sizeSide) => {
    centers.forEach((center) => {
      quads.push(new Quad(center.x, center.y, sizeSide));
    });
  });

  song.play();
}

function draw() {
  background(240);

  noFill();

  for (let i = 0; i < drawIteration && i < quads.length; i++) quads[i].draw();
}

function keyPressed() {
  if (key == 'a') {
    drawIteration += 4;
  }
}

window.setup = setup;
window.draw = draw;
window.preload = preload;
window.keyPressed = keyPressed;
