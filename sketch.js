var space = new Space(100, 100, 100);
var startRectX;
var startRectY;

function setup() {
  createCanvas(640, 480);
  space.createShips();

}

function draw() {
  background(10, 0, 0);

  space.draw();


}

function mousePressed(){
  startRectX = mouseX;
  startRectY = mouseY;
}

function mouseReleased(){
  space.createObstacle(startRectX, startRectY, mouseX, mouseY);
}
