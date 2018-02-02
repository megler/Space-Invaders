$( document ).ready(function() {

var counter = 0;
var score = 0;
var points = document.getElementById("score");

var base = {
	top: 600,
	left: 610
};

var background = {    top: 10
};

var missiles = [];
var aliens = [];
var alien2 = [];

// dynamically position aliens.  y = y coordinate

function alienPosition(){
 for (var x = 200; x < 1100; x+=100){
   aliens.push({
    left: x,
    top: 50
  });
   alien2.push({
    left: x,
    top: 130
  });
}
}


// event listener for control buttons

$("#start").click(function(){play();});
$("#pause").click(function(){pause();});
$("#stop").click(function(){stop();});


// functions to start, pause, and resume game.  typeof always returns a value, so it's never
// undefined.  That's why this function works even though gameInterval isn't a global variable.


function play(){
    if (typeof gameInterval != "undefined")
        clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, 100);
        allowPressKeys = true;
        $("#gameOver").html("");

 }

function pause(){
clearInterval(gameInterval);
allowPressKeys = false;
}

function init(){
    alienPosition();
    gameLoop();
    
}

function gameOver(){
    $("#gameOver").html("GAME OVER");
    pause();
    alertify.confirm('Game Status?','Do You Want To Start A New Game?', 
            function(){
                location.reload();
                }, function(){ alertify.error('Cancel')});
}

function stop(){    
    $("#gameOver").html("GAME OVER");
    document.getElementById("stop").blur();
    pause();
        alertify.confirm('Game Status?','Do You Want To Start A New Game?', 
            function(){
                location.reload();
                }, 
             function(){
                document.getElementById("start").focus();
                play();
            });
        

}



// game loop that moves and draws game pieces
function gameLoop(){ 
            moveMissiles();
            drawMissiles();
            moveAliens();
            drawAliens();
            collisionDetection();
}

/* 
game controls
left arrow = move left
right arrow = move right
space bar = fire
start button = begin game
pause button = pause game
resume button = resume game
*/
document.onkeydown = function(evt){

	if (evt.keyCode === 37){
		base.left -= 10;
		moveBase();
	}
 	else if (evt.keyCode === 39){
		base.left += 10;
		moveBase();
    }    
	else if (evt.keyCode === 32){
		missiles.push({
		left: base.left + 20,
		top: base.top -30
        });
    } 
    else if (evt.keyCode == 80){
        pause();
    } 
    
};

// functions to run game.  functions names are self explanatory

function moveBase(){
	document.getElementById("base").style.left = base.left + "px";
    if (base.left >= 1100){
        //move right stop at edge of screen
        document.getElementById("base").style.left = (base.left -= 10) + "px";
    } else if (base.left <= 110){
        //move left stop at edge of screen
        document.getElementById("base").style.left = (base.left += 10) + "px";

    }
}

function drawMissiles(){
	document.getElementById("missiles").innerHTML = "";
	for (var i=0; i < missiles.length; i++){
			document.getElementById("missiles").innerHTML += `<div class = 'missile' style= 'left:${missiles[i].left}px; top:${missiles[i].top}px;'></div>`;
		if (missiles[i].top <= background.top){
            document.getElementById("missiles").innerHTML = "";

        }
	}
}

function moveMissiles(){
	for (var i=0; i<missiles.length; i++){
		missiles[i].top -=15;
        
	}
}

function drawAliens(){
	document.getElementById("aliens").innerHTML = "";
    document.getElementById("alien2").innerHTML = "";
	for (var i=0; i < aliens.length; i++){
			document.getElementById("aliens").innerHTML += `<div class = 'alien' style= 'left:${aliens[i].left}px; top:${aliens[i].top}px;'></div>`;
            		
	}
    for (var j=0; j < alien2.length; j++){
    document.getElementById("alien2").innerHTML += `<div class = 'alien2' style= 'left:${alien2[j].left}px; top:${alien2[j].top}px;'></div>`;
}
}

//if bottom of alien is = to top of base, then end game.  Otherwise, move aliens down
function moveAliens(){

   	for (var i=0; i<aliens.length; i++){
        aliens[i].top +=2;
        if(aliens[i].top == 560){
            gameOver();
        }
	}
    for (var j=0; j<alien2.length; j++){
        alien2[j].top +=2;
        if(alien2[j].top + 37 >= 600){
            gameOver();
        }
    }
}



function collisionDetection(){
	for (var i=0; i< aliens.length; i++){
		for (var j=0; j < missiles.length; j++){
			if (
				(missiles[j].top <= aliens[i].top + 49) && 
				(missiles[j].top >= aliens[i].top) && 
				(missiles[j].left+ 8 >= aliens[i].left) && 
				(missiles[j].left <= aliens[i].left + 50)
               	){
					aliens.splice([i], 1);
					missiles.splice([j], 1);
                    score += 100;
                    points.innerHTML = score;
			}
}
}
    for (var k=0; k< alien2.length; k++){
        for (var m=0; m < missiles.length; m++){
            if (
                (missiles[m].top <= alien2[k].top + 37) && 
                (missiles[m].top >= alien2[k].top) && 
                (missiles[m].left+ 8 >= alien2[k].left) && 
                (missiles[m].left <= alien2[k].left + 50)
                 ){
                    alien2.splice([k], 1);
                    missiles.splice([m], 1);
                    score += 100;
                    points.innerHTML = score;
            }
}
}
}



init();
});