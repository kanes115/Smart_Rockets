function Space(amountOfShips, xTarget, yTarget){
  this.amountOfShips = amountOfShips;
  this.ships = [];
  this.obstacles = [];

  this.createShips = function (){

    for(i = 0; i < amountOfShips; i++){
      this.ships[i] = new SpaceShip(width/2, height, 100000000);
    }
  }


  this.draw = function(){
    for(i = 0; i < this.ships.length; i++){
      //this.ships[i].moveTowards(createVector(randd(0, 500), randd(0,500)));  //createVector(mouseX, mouseY)
      this.ships[i].update();
      this.ships[i].draw();
    }

    for(i = 0; i < this.obstacles.length; i++){
      this.obstacles[i].draw();
    }
  }

  this.createObstacle = function(x1, y1, x2, y2){
    this.obstacles.push(new Obstacle(x1, y1, x2, y2));
  }

  this.hitObstacle = function(){
    for(i = 0; i < this.ships.length; i++){
      for(j = 0; j < this.obstacles.length; j++){
        var ship = this.ships[i];
        var obst = this.obstacles[j];

      }
    }
  }
}





// helper functions
function randd(a, b){
  return Math.floor((Math.random() * b) + a);
}
