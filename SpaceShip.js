function SpaceShip(x, y, lifespan, dna){
  this.location = new p5.Vector(x, y);

  this.velocity = new p5.Vector(0, 0);
  this.acc = new p5.Vector(0, 0);

  this.width = 4;
  this.height = 10;
  this.life = 0;
  if(dna){
      this.dna = dna;
  }else{
    this.dna = new DNA(lifespan);
  }

  this.fitness = 0;
  this.completed = false;
  this.hit = false;

  this.applyForce = function (directionV){
    this.acc.add(directionV);
  }



  this.update = function (){
    this.acc = this.dna.genes[this.life];
    this.velocity.add(this.acc);
    this.location.add(this.velocity);
    this.life++;
  }



  this.draw = function (){
    push();
    fill(color(255, 255, 255));
    translate(this.location.x, this.location.y);
    rotate(this.velocity.heading());
    rectMode(CENTER);
    noStroke();
    rect(0, 0, this.height, this.width);
    pop();
  }

  this.calcFitness = function (distance, timeSpent){

    this.fitness = (1 / Math.pow(distance,2)) + (1 / timeSpent);

    if(this.hit == true){
      this.fitness /= 10;
    }

    if(this.completed == true){
      this.fitness *= 100;
    }

    return (1 / distance);
  }


}



function DNA(amount, genes){
  this.genes = [];
  this.maxForce = 0.1;
  this.amountOfMutations = 0;

  if(genes){      //if genes were specified
    this.genes = genes;
  }else{          //if not, random
    for(var i = 0; i < amount; i++){
        this.genes.push(p5.Vector.random2D().setMag(this.maxForce));
    }
  }

  this.crossover = function (other){
    var newgenes = [];
    var midPoint = floor(random(this.genes.length));

    for(i = 0; i < midPoint; i++){
      newgenes.push(this.genes[i]);
    }
    for(i = midPoint; i < this.genes.length; i++){
      newgenes.push(other.genes[i]);
    }
    return new DNA(0, newgenes);
  }

  this.mutate = function (mutationRation){
    for(i = 0; i < this.genes.length; i++){
      if(random() < mutationRation){
        this.amountOfMutations++;
        this.genes[i] = p5.Vector.random2D().setMag(this.maxForce);
      }
    }
  }


}




// helper functions
function randd(a, b){
  return Math.floor((Math.random() * b) + a);
}
