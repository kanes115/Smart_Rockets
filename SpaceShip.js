function SpaceShip(x, y, boredom){
  this.location = new p5.Vector(x, y);

  this.maxSpeed = 6;
  this.maxForce = 0.6;

  this.velocity = new p5.Vector(0, 0);
  this.acc = new p5.Vector(0, 0);
  this.width = 4;
  this.height = 10;
  this.life = 0;
  this.lifespan = 200;

  this.dna = new DNA(this.lifespan);

  this.applyForce = function (directionV){
    this.acc.add(directionV);
  }

  this.update = function (){
    this.acc = this.dna.genes[this.life];
    this.velocity.add(this.acc);
    this.location.add(this.velocity);
  }

  this.draw = function (){

    if(this.life >= this.lifespan){
      return;
    }

    push();
    fill(color(255, 255, 255));
    translate(this.location.x, this.location.y);
    rotate(this.velocity.heading());
    rectMode(CENTER);
    noStroke();
    rect(0, 0, this.height, this.width);
    pop();

    this.life++;
  }

}



function DNA(amount){
  this.genes = [];
  for(var i = 0; i < amount; i++){
      this.genes.push(p5.Vector.random2D());
  }
}




// helper functions
function randd(a, b){
  return Math.floor((Math.random() * b) + a);
}
