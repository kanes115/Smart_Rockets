function Space(amountOfShips, xTarget, yTarget){
  this.amountOfShips = amountOfShips;
  this.ships = [];
  this.obstacles = [];
  this.genreProg = 0;                             //progress on current genre
  this.target = new Target(width/2, 50, 25);
  this.genreLen = 200;                            //length of one generation


  this.createShips = function (){

    for(i = 0; i < amountOfShips; i++){
      this.ships[i] = new SpaceShip(width/2, height, 200);
    }
  }

  this.createShips();                  //zawsze na początku tworzymy statki


  this.draw = function(){
    this.target.draw();               //rysujemy target

    for(i = 0; i < this.ships.length; i++){
      this.ships[i].update();
      this.ships[i].draw();
    }
    this.genreProg++;                     //każde rysowanie to jedno posunięcie wszytskich statków

    if(this.genreProg == this.genreLen){
      this.createShips();//tymczasowe
      this.genreProg = 0;
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
