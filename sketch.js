var space;
var startRectX;
var startRectY;

var counterP;
var maxFP;
var amountMoutations;

var mutationSlider;

function setup() {
  createCanvas(400, 380);

  space = new Space(300, 100, 100);

  counterP = createP();
  maxFP = createP();
  amountMoutations = createP();
  mutationSlider = createSlider(0, 10, 1);

}

function draw() {
  background(10, 0, 0);

  space.mutationRatio = (mutationSlider.value())/100;
  space.draw();
  counterP.html(space.genreProg);
  maxFP.html("Max fitness: " + space.maxFitness);
  amountMoutations.html("Total mutations: " + space.getPercentOfMutations() + "%");

}

function mousePressed(){
  startRectX = mouseX;
  startRectY = mouseY;
}

function mouseReleased(){
  space.createObstacle(startRectX, startRectY, mouseX, mouseY);
}
