
var Tile = function(x, y, word) {
  this.x = x;
  this.y = y;
  this.word = word;
  this.width = 70;
};

Tile.prototype.drawFaceDown = function(canvas) {
  canvas.beginPath();
  canvas.rect(this.x, this.y, this.width, this.width);
  canvas.fillStyle = "red";
  canvas.fill();
  this.isFaceUp = false;
}

Tile.prototype.drawFaceUp = function(canvas) {
  canvas.beginPath();
  canvas.rect(this.x, this.y, this.width, this.width);
  canvas.fillStyle = "yellow";
  canvas.fill();
  canvas.fillStyle = "black";
  canvas.font="10px Georgia";
  canvas.fillText(this.word,this.x,this.y+this.width/2);
  this.isFaceUp = true;
}

Tile.prototype.isUnderMouse = function(x, y) {
  return x >= this.x && x <= this.x + this.width  &&
    y >= this.y && y <= this.y + this.width;
};

exports.tileModule = Tile;
