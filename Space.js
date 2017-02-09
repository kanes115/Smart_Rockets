function Space(amountOfShips, xTarget, yTarget){
  this.amountOfShips = amountOfShips;
  this.ships = [];
  this.obstacles = [];
  this.genreProg = 1;                             //progress on current genre
  this.target = new Target(width/2, 50, 25);
  this.genreLen = 400;                            //length of one generation, decides about the length of DNA as well
  this.startingX = width/2;
  this.startingY = height;

  //genetics
  this.maxFitness = 0;
  this.mutationRatio = 0.05;


  this.createShips = function (){
    for(i = 0; i < amountOfShips; i++){
      this.ships[i] = new SpaceShip(this.startingX, this.startingY, this.genreLen);
    }
  }

  this.createShips();                  //zawsze na początku tworzymy statki - random

  this.amountOfGenes = this.genreLen * this.ships.length;

  this.draw = function(){
    this.target.draw();               //rysujemy target

    this.checkCompletence();
    this.checkIfHit();

    for(i = 0; i < this.ships.length; i++){
      if(this.ships[i].completed == false && this.ships[i].hit == false){
        this.ships[i].update();
      }
      this.ships[i].draw();
    }
    this.genreProg++;                     //każde rysowanie to jedno posunięcie wszytskich statków

    if(this.genreProg == this.genreLen){
      this.nextGeneration();
      this.genreProg = 1;
    }


    for(i = 0; i < this.obstacles.length; i++){   //drawing obstacles
      this.obstacles[i].draw();
    }
  }

  this.createObstacle = function(x1, y1, x2, y2){
    this.obstacles.push(new Obstacle(x1, y1, x2, y2));
  }     //creates obstacles with specified lower-left corner and upper-right corner


  this.checkCompletence = function (){
    for(i = 0; i < this.ships.length; i++){
      if(dist(this.ships[i].location.x, this.ships[i].location.y, this.target.x, this.target.y) < this.target.r){
        this.ships[i].completed = true;
      }
    }
  }

  this.checkIfHit = function (){
    for(i = 0; i < this.ships.length; i++){
      var shp = this.ships[i];
      for(j = 0; j < this.obstacles.length; j++){
        var obst = this.obstacles[j];
        if(shp.location.x < obst.rightX() && shp.location.x > obst.leftX() && shp.location.y > obst.lowerY()
              && shp.location.y < obst.upperY()){
                shp.hit = true;
              }
        if(shp.location.x < 0 || shp.location.x > width || shp.location.y < 0 || shp.location.y > height){
          shp.hit = true;
        }
      }
    }
  }


  //genetics part

  this.nextGeneration = function (){
    var maxF = this.evalFitness();
    this.maxFitness = maxF;
    this.normalize(maxF);
    var matingPool = this.createMatingPool();
    this.ships = this.selection(matingPool);
    this.mutate();

  }


  this.evalFitness = function (){
    var maxF = 0;
    for(i = 0; i < this.ships.length; i++){
      var ship = this.ships[i];
      var currentF = ship.calcFitness(dist(ship.location.x, ship.location.y, this.target.x, this.target.y), this.genreProg);
      if(maxF < currentF) maxF = currentF;
    }

    return maxF;
  }

  this.normalize = function (maxF){
    for(i = 0; i < this.ships.size; i++){
      this.ships[i].fitness /= maxF;
    }
  }

  this.createMatingPool = function (){
    var res = [];
    for(i = 0; i < this.ships.length; i++){
      for(j = 0; j < this.ships[i].fitness * 1000000; j++){
        res.push(this.ships[i]);
      }
    }

    return res;
  }

  this.selection = function (matingPool){
    var newShips = [];

    for(i = 0; i < this.ships.length; i++){
      var parentA = random(matingPool).dna;
      var parentB = random(matingPool).dna;
      var child = parentA.crossover(parentB);
      newShips[i] = new SpaceShip(this.startingX, this.startingY, -1, child);
    }

    return newShips;
  }

  this.mutate = function (){
    for(i = 0; i < this.ships.length; i++){
      this.ships[i].dna.mutate(this.mutationRatio);
    }
  }

  this.getAmountOfAllMutations = function (){
    var sum = 0;
    for(i = 0; i < this.ships.length; i++){
      sum += this.ships[i].dna.amountOfMutations;
    }
    return sum;
  }

  this.getPercentOfMutations = function (){
    console.log(this.amountOfGenes);
    return Math.floor((this.getAmountOfAllMutations() / this.amountOfGenes) * 100);
  }

}






function Target(x, y, r){
  this.x = x;
  this.y = y;
  this.r = r;

  this.draw = function (){
    fill(100);
    ellipse(x, y, r, r);
  }
}





// helper functions
function randd(a, b){
  return Math.floor((Math.random() * b) + a);
}
