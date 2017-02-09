function Obstacle(x1, y1, x2, y2){
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;

  this.draw = function (){
    fill(55);
    rect(this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1);
  }

  this.leftX = function (){
    return min(this.x1, this.x2);
  }

  this.lowerY = function (){
    return min(this.y1, this.y2);
  }

  this.rightX = function (){
    return max(this.x1, this.x2);
  }

  this.upperY = function (){
    return max(this.y1, this.y2);
  }
}
