import { Quad } from './quad.js';

const ALL_CENTERS = [
  { x: 200, y: 200 },
  { x: 600, y: 200 },
  { x: 200, y: 600 },
  { x: 600, y: 600 },
  { x: 400, y: 400}
];

let centers = [];
let quads = [];
let drawIteration = ALL_CENTERS.length * 4;
let song;

function preload() {
  song = loadSound('hardy.mp3');
}

function setup() {
  let sizesSide = [];

  createCanvas(800, 800);

  for (let i = 25; i < 399; i += 10) 
    sizesSide.push(i);

  for (let i = 0; i < ALL_CENTERS.length; i++)
    centers.push({x: ALL_CENTERS[i].x + Math.random() * 200 - 100, 
                  y: ALL_CENTERS[i].y + Math.random() * 200 - 100})

  sizesSide.forEach((sizeSide) => {
    centers.forEach((center) => {
      quads.push(new Quad(center.x, center.y, sizeSide + Math.random() * 10));
    });
  });

}

function draw() {
  background(255);

  noFill();

  for (let i = 0; i < drawIteration && i < quads.length; i++) quads[i].draw();
}

function keyPressed() {
  if (key == 'a') {
    if (!song.isPlaying()) song.play();
    drawIteration += ALL_CENTERS.length;
  }
}

window.setup = setup;
window.draw = draw;
window.preload = preload;
window.keyPressed = keyPressed;
