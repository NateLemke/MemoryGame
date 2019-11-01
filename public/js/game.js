//plays when a correct pattern is chosen
var correctSound = new Audio("sounds/yea.mp3");
//plays when container rotates
var shuffleSound = new Audio("sounds/shuffle.mp3");
//plays when the player make 4 wrong answers on 1 pattern
var failSound = new Audio("sounds/boo.mp3");
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
//the current width of the grid
var gridWidth = 5;
//the current height of the grid
var gridHeight = 5;
//The number of wrong answers the player has picked for this pattern
var wrongAnswers = 0;

//an array showing which tiles are correct
var tileArray = [];


//resets tile array and fills it with 0s. resizes the grid.
function zeroArray() {
    var main = document.getElementById("main_container");
     main.innerHTML = '';

    var startButton = document.createElement("button");
    var restartButton = document.createElement('button');
    startButton.setAttribute("id", "startButton");
    startButton.setAttribute("onclick", "hideStart()");
    restartButton.setAttribute("id", "restartButton");
    restartButton.setAttribute("onclick", "restart()");

    for(let i=0; i<gridWidth; i++) {
        tileArray[i] = [];
    }
    for(let i=0; i<gridWidth; i++) {
        for(let j=0; j<gridHeight; j++) {
            tileArray[i][j] = 0;

            var t = document.createElement("div");
            t.setAttribute("class", "tile");
            t.setAttribute("id", i+","+j);
            t.setAttribute("onclick", "clickTile(this.id)");

            main.appendChild(t);
        }
        br = document.createElement("br");
        main.appendChild(br);
    }
}

//hides the start button
function hideStart() {
    document.getElementById("startButton").style.display="none";
    startGame();
}

//starts the game. Displays tiles and their initial pattern.
function startGame() {
    picked = 0;
    wrongAnswers = 0;
    zeroArray();
    showTiles();
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
        if(picked >= difficulty) {
            correctSound.play();
            if(wrongAnswers <= 1 && (gridWidth <= 8 || gridHeight <= 8)) {
                if(gridWidth <= gridHeight) {
                    gridWidth++;
                } else {
                    gridHeight++;
                }
            }
            window.setTimeout(hidePattern, 900);
            window.setTimeout(startGame, 1000);
        }
    } else {
        p_score--;
        wrongAnswers++;
        document.getElementById(xy).style.backgroundColor = "red";
        document.getElementById(xy).onclick = '';
        if(wrongAnswers == 3 && (gridWidth > 5 || gridHeight > 5)) {
            if(gridWidth >= gridHeight) {
                gridWidth--;
            } else {
                gridHeight--;
            }
        }
        if(wrongAnswers > 3) {
            failSound.play();
            window.setTimeout(hidePattern, 1000);
            window.setTimeout(startGame, 1500);
        }
        if(p_score <= 0) {
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
        difficulty = 4 + (p_score/20);
    }
    
    let tiles = 0;

    while(tiles < difficulty) {
        let x = Math.round(Math.random() * (gridWidth - 1));
        let y = Math.round(Math.random() * (gridHeight - 1));

        if(tileArray[x][y] == 0) {
            tileArray[x][y] = 1;
            tiles++;
        }
    }

}

//hides all tiles
function hideTiles() {
    var tiles = document.getElementsByClassName('tile');
    
    for(let i=0; i<tiles.length; i++) {
        tiles[i].style.display="none";
    }
}

//shows all tiles
function showTiles() {
    var tiles = document.getElementsByClassName('tile');
    
    for(let i=0; i<tiles.length; i++) {
        tiles[i].style.display="inline-block";
    }
}

//shows the pattern.
function showPattern() {
    var tiles = document.getElementsByClassName('tile');
    
    for(let i=0; i<tiles.length; i++) {
        var xy = tiles[i].id.split(",");
        
        if(tileArray[xy[0]][xy[1]]) {
            tiles[i].style.backgroundColor="green";
        }
    }
}

//hides the pattern.
function hidePattern() {
    var tiles = document.getElementsByClassName('tile');
    
    for(let i=0; i<tiles.length; i++) {
            tiles[i].style.backgroundColor="lightpink";
    }
}

//resets game
function restart() {
    location.reload();
}

 