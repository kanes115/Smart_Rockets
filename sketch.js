var space;
var startRectX;
var startRectY;

var counterP;

function setup() {
  createCanvas(640, 480);

  space = new Space(100, 100, 100);

  counterP = createP();

}

function draw() {
  background(10, 0, 0);

  space.draw();
  counterP.html(space.genre);

}

function mousePressed(){
  startRectX = mouseX;
  startRectY = mouseY;
}

function mouseReleased(){
  space.createObstacle(startRectX, startRectY, mouseX, mouseY);
}
