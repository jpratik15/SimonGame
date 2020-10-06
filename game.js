
let colors = ['red','blue','green','yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level=0;
let gameStarted=false;

$(document).on('keydown',function(){
    if(gameStarted===false){
        gameStarted=true
        nextSequence();
    }
});

function playSound(name){
    let soundSrc  = 'sounds/' + name + '.mp3';
    let colorAud = new Audio(soundSrc);
    colorAud.play();
}

function animatePress(currColor){
    //showing press
    $("#" + currColor).addClass('pressed');

    //removing press 
    setTimeout(function(){
        $("#" + currColor).removeClass('pressed');
    },100);

}

function checkAnswer(ind){
    if(userClickedPattern[ind]===gamePattern[ind]){
        console.log("Success");

        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("Failure");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        
        $("h1").text("Stuti Noob!!,Game Over Press Any Key to Restart");
        startNewGame();
    }
}

function startNewGame(){
    gameStarted=false;
    userClickedPattern=[];
    gamePattern=[];
    level=0;
}

$(".btn").click(function(){
    //finding which color
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);

    //playing the color sound
    playSound(userChosenColor);

    //animating the press
    animatePress(userChosenColor);

    //checking answer
    console.log(gamePattern);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern = [];
    //level increaser everytime new seq is calle
    level++;
    $("h1").text("Level " + level);

    //generating the next rand color
    let randNumber = Math.floor((Math.random()*4));
    let randColor = colors[randNumber];
    gamePattern.push(randColor);

    //flashing button for next seq
    let colorId = '#' + randColor;
    $(colorId).fadeOut(150).fadeIn(150);

    //playing sound for the current shown random button
    playSound(randColor);

}















