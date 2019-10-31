//plays when a correct pattern is chosen
var correctSound = new Audio("sounds/yea.mp3");
//plays when container rotates
var shuffleSound = new Audio("sounds/shuffle.mp3");
//the player's score
var p_score = 10;
//chooses the direction the container rotates
var dir = Math.round(Math.random());
//the container's current orientation
var orientation = 0;
//the orientation to move the container to
var deg = 0;
//the current difficulty
var difficulty = 5;
//the number of correct tiles the player has picked for the current pattern
var picked = 0;
//the number of correct tiles in the current pattern
var corrects = 0;

//an array showing which tiles are correct
var tileArray = [];


//resets tile array and fills it with 0s
function zeroArray() {
    for(let i=0; i<5; i++) {
        tileArray[i] = [];
    }
    for(let i=0; i<5; i++) {
        for(let j=0; j<5; j++) {
            tileArray[i][j] = 0;
        }
    }

    var tiles = document.getElementsByClassName('panel');
    
    for(let i=0; i<tiles.length; i++) {
        tiles[i].setAttribute( "onclick", "clickTile(this.id)");
    }
}

//hides the start button
function hideStart() {
    document.getElementById("startButton").style.display="none";
    showTiles();
    startGame();
}

//starts the game. Displays tiles and their initial pattern.
function startGame() {
    zeroArray();
    setPattern();
    showPattern();
    window.setTimeout(continueGame, 1000);
}

//hides the pattern and rotates the container.
function continueGame() {
    hidePattern();
    RotateContainer();
}

//Rotates the container 90 degrees in a random direction.
function RotateContainer () {
    var mc = document.getElementById("main_container");

    shuffleSound.play();

    mc.style.transform = "rotate("+deg+"deg)";
    
    if(orientation - deg >= 90 || orientation - deg <= -90) { 
        orientation = deg;
        dir = Math.round(Math.random());
        return; 
    }
    
    loop = setTimeout('RotateContainer()', 5);

    if(dir) {
        deg++;
    } else {
        deg--;
    }
}

//If tile is correct, increases score and turns it green. Else decreases score and turns red.
function clickTile(id) {
    var xy = id.split(",");

    if(tileArray[xy[0]][xy[1]]) {
        picked++;
        p_score++;
        document.getElementById(xy).style.backgroundColor = "green";
        document.getElementById(xy).onclick = '';
        if(picked >= corrects) {
            picked = 0;
            correctSound.play();
            window.setTimeout(hidePattern, 900);
            window.setTimeout(startGame, 1000);
        }
    } else {
        p_score--;
        document.getElementById(xy).style.backgroundColor = "red";
        document.getElementById(xy).onclick = '';
        if(p_score <= 0) {
            var mc = document.getElementById("main_container");
            mc.style.transform = "rotate(0deg)";
            hideTiles();
            document.getElementById("restartButton").style.display = "inline-block";
        }
    }

    document.getElementById("scoreDisplay").textContent =  p_score;
    document.getElementById("scoreField").value =  p_score;
}

//Sets a randomized pattern of tiles based on player score. 
function setPattern() {
    //zeroArray();

    if(difficulty < 12) {
        difficulty = 4 + (p_score/10);
    }

    corrects = difficulty;
    
    let tiles = 0;

    while(tiles < difficulty) {
        let x = Math.round(Math.random() * 4);
        let y = Math.round(Math.random() * 4);

        if(tileArray[x][y] == 0) {
            tileArray[x][y] = 1;
            tiles++;
        }
    }

}

//hides all tiles
function hideTiles() {
    var tiles = document.getElementsByClassName('panel');
    
    for(let i=0; i<tiles.length; i++) {
        tiles[i].style.display="none";
    }
}

//shows all tiles
function showTiles() {
    var tiles = document.getElementsByClassName('panel');
    
    for(let i=0; i<tiles.length; i++) {
        tiles[i].style.display="inline-block";
    }
}

//shows the pattern.
function showPattern() {
    var tiles = document.getElementsByClassName('panel');
    
    for(let i=0; i<tiles.length; i++) {
        var xy = tiles[i].id.split(",");
        
        if(tileArray[xy[0]][xy[1]]) {
            tiles[i].style.backgroundColor="green";
        }
    }
}

//hides the pattern.
function hidePattern() {
    var tiles = document.getElementsByClassName('panel');
    
    for(let i=0; i<tiles.length; i++) {
            tiles[i].style.backgroundColor="lightpink";
    }
}

//resets game
function restart() {
    location.reload();
}

 