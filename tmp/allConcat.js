var Tile = require('./../js/tile.js').tileModule;

$(document).ready(function() {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var numTries = 0;

  var tiles = [];
  var words = [
    'Bach',
    'Beethoven',
    'Brahms',
    'Bruckner',
    'Bruch',
    'Ries',
    'Rachy',
    'Tchaik',
    'Webern',
    'Schoenberg',
    'Sibelius',
    'Suk'
  ];

  var selected = [];
  var tilesInPlay = [];

  $( "#myCanvas" ).mousedown(function() {
    var mouseX = event.pageX;
    var mouseY = event.pageY;
    for (var i=0; i<tiles.length; i++) {
      if (tiles[i].isUnderMouse(mouseX, mouseY)) {
        if (tilesInPlay.length < 2 && !tiles[i].isFaceUp) {
          tiles[i].drawFaceUp(ctx);
          tilesInPlay.push(tiles[i]);
          if (tilesInPlay.length === 2) {
            numTries++;
            if (tilesInPlay[0].word === tilesInPlay[1].word) {
              tilesInPlay[0].isMatch = true;
              tilesInPlay[1].isMatch = true;
            } else {
              var v = tilesInPlay[0];
              setTimeout(function(){v.drawFaceDown(ctx);}, 1000);
              var w = tilesInPlay[1];
              setTimeout(function(){w.drawFaceDown(ctx);}, 500);
            }
            numFlipped = 0;
            tilesInPlay.length = 0;
            var foundAllMatches = true;
            for (var j = 0; j < tiles.length; j++) {
              foundAllMatches = foundAllMatches && tiles[j].isMatch;
            }
            if (foundAllMatches) {
              $("#myCanvas").hide();
              $("#gameOver").show().text("You found them all in " + numTries + " tries");
            }
          }
        }
      }
    }
  });

  for (var i = 0; i < 10; i++) {
    // Randomly pick one from the array of faces
    var randomInd = Math.floor(Math.random(words.length));
    var word = words[randomInd];
    // Push 2 copies onto array
    selected.push(word);
    selected.push(word);
    // Remove from faces array so we don't re-pick
    words.splice(randomInd, 1);
  }

  selected.sort(function() {
    return 0.5 - Math.random();
  });

  var NUM_COLS = 5;
  var NUM_ROWS = 4;
  for (var j = 0; j < NUM_COLS; j++) {
    for (var k = 0; k < NUM_ROWS; k++) {
      tiles.push(new Tile(j * 78 + 10, k * 78 + 40, selected.pop()));
    }
  }



  for (var l = 0; l < tiles.length; l++) {
    tiles[l].drawFaceDown(ctx);
  }


});
