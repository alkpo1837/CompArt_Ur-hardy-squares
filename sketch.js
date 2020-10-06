import { Quad } from './quad.js';

const ALL_CENTERS = [
  { x: 250, y: 250 },
  { x: 550, y: 250 },
  { x: 250, y: 550 },
  { x: 550, y: 550 },
  { x: 400, y: 400}
];

let centers = [];
let quads = [];
let drawIteration = ALL_CENTERS.length * 4;
let song;

function preload() {
  song = loadSound('hardy_alternate.mp3');
}

function setup() {
  let sizesSide = [];

  createCanvas(800, 800);

  for (let i = 25; i < 440; i += 10) 
    sizesSide.push(i);

  for (let i = 0; i < ALL_CENTERS.length; i++)
    centers.push({x: ALL_CENTERS[i].x + Math.random() * 150 - 100, 
                  y: ALL_CENTERS[i].y + Math.random() * 150 - 100})

  sizesSide.forEach((sizeSide) => {
    centers.forEach((center) => {
      quads.push(new Quad(center.x, center.y, sizeSide + Math.random() * 10));
    });
  });

}

function draw() {
  background(255);
  displayBackground();

  for (let i = 0; i < drawIteration && i < quads.length; i++) quads[i].draw();
}

function displayBackground()
{
  let grayColor = color(180, 180, 180, 255);
  let whiteColor = color(255, 255, 255, 255);

  for (let i = 0; i <= 400; i += 4)
  {
    // let color = map(i, 0, 400, 210, 255);
    let inter = map(i, 0, 400, 0, 1);
    let color = lerpColor(grayColor, whiteColor, inter);

    stroke(color);

    line(i, i, 800 - i, i);
    line(800 - i, i, 800 - i, 800 - i);
    line(800 - i, 800 - i, i, 800 - i);
    line(i, 800 - i, i, i);
  }
}

function displayBackgroundV2()
{
  stroke(128);
  let grayColor = color(210, 210, 210, 255);
  let whiteColor = color(255, 255, 255, 255);

  let i = 300;
  // line(0, 400 + i, 800, 400 + i);

  for (let i = 0; i < 800; i += 0.5)
  {
    let inter;
    let color;
    
    if (i < 400)
    {
       inter = map(i, 0, 400, 0, 1);
      color = lerpColor(grayColor, whiteColor, inter);
    }else{
      inter = map(i, 400, 800, 0, 1);
      color = lerpColor(whiteColor, grayColor, inter);
    }
    stroke(color);

    line(0, i, 800, i);
  }
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
