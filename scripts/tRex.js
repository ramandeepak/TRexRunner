var runStarted = false;
var runInterval;
var tRexAliveInterval;
var tRexAliveInterval2;
var tRexAliveLoopInterval;
var moveInterval;
var isTRexJumping = false;
var tRexClass = "tRex1";
var tRexCurrentX;
var tRexCurrentY;
var isTRexDucking = false;
var isGameOver = false;


function myFunction(event) {
  if(isGameOver==true) {
    return;
  }

  var downInterval;
  var keyPressed = event.key;

  var tRex = document.getElementById("tRex");
  var tRexContainer = document.getElementById("tRexContainer");
  tRexCurrentX = parseInt(tRex.style.left, 10);
  tRexCurrentY = parseInt(tRex.style.top, 10);
  tRexContainerCurrentY = parseInt(tRexContainer.style.top, 10);
  tRexContainerCurrentX = parseInt(tRexContainer.style.left, 10);
  
  if(keyPressed == "ArrowRight") {
    if(runStarted==false) {
      runStarted = true;
      clearInterval(tRexAliveInterval);
      clearInterval(tRexAliveInterval2);
      clearInterval(tRexAliveLoopInterval);
      runInterval = setInterval(runTRex, 100);
      moveInterval = setInterval(moveTRexFewSteps, 10);
    }
  }
  
  if(keyPressed == "ArrowUp") {
    if(isTRexJumping==false && runStarted==true) {
      playJumpAudio();
      isTRexJumping = true;
      isTRexDucking = false;
      document.getElementById("tRex").className = "tRexStill";
      clearInterval(runInterval);
      var upInterval = setInterval(tRexUp, 1);
    }
  }

  function tRexUp() {
    if(tRexContainerCurrentY > 5) {
      tRexContainerCurrentY--;
      tRexContainer.style.top = tRexContainerCurrentY + "px";
    } else {
      clearInterval(upInterval);
      downInterval = setInterval(tRexDown, 1);
    }
  }

  function tRexDown() {
    if(tRexContainerCurrentY < 110) {
      tRexContainerCurrentY++;
      tRexContainer.style.top = tRexContainerCurrentY + "px";
   } else {
      clearInterval(downInterval);
      runInterval = setInterval(runTRex, 100);
      runStarted = true;
      isTRexJumping=false;
   }
  }

 } 

 function isTRexDuckingNeeded(event) {
  if(isGameOver==true) {
    return;
  }
  var keyPressed = event.key;
  if(keyPressed == "ArrowDown" && runStarted==true) {
    if(isTRexDucking==false) {
      isTRexDucking = true;
      tRexClass = "tRexDuck1";
      document.getElementById("tRex").className = tRexClass;
    } else {
      isTRexDucking = false;
      tRexClass = "tRex1";
      document.getElementById("tRex").className = tRexClass;
    }
  }
 }

 function runTRex() {
    var isTRexHitCacti = isOverLapping();
    if(isTRexHitCacti==true) {
      endGame();
      return;
    }

   if(isTRexDucking==true) {
    if(tRexClass=="tRexDuck1") {
      tRexClass="tRexDuck2";
    } else {
      tRexClass="tRexDuck1";
    }
   } else {
    if(tRexClass=="tRex1") {
      tRexClass="tRex2";
    } else {
      tRexClass="tRex1";
    }
   }
  document.getElementById("tRex").className = tRexClass;
 }

 function moveTRexFewSteps() {
   if(tRexContainerCurrentX < 150) {
    tRexContainerCurrentX++;
    tRexContainer.style.left = tRexContainerCurrentX + "px";
   } else {
      clearInterval(moveInterval);
      document.getElementById("cloud").style.animationPlayState = "running";
      document.getElementById("ground").style.animationPlayState = "running";
      document.getElementById("cacti").style.animationPlayState = "running";
   }
 }

 function tRexAliveLoop() {
    tRexAliveLoopInterval = setInterval(tRexAlive, 5000);
 }

 function tRexAlive() {
    tRexAliveInterval = setInterval(tRexBlink, 150);
 }

 function tRexBlink() {
  tRexClass="tRexStill2";
  document.getElementById("tRex").className = tRexClass;
  clearInterval(tRexAliveInterval);
  tRexAliveInterval2 = setInterval(tRexBlink2, 150);
 }

 function tRexBlink2() {
  tRexClass="tRexStill";
  document.getElementById("tRex").className = tRexClass;
  clearInterval(tRexAliveInterval2);
 }

 function playJumpAudio() {
    var audio = new Audio("/sounds/jump.wav");
    audio.play();
 }

 function isOverLapping() {
   var tRexContainerRect = tRexContainer.getBoundingClientRect();
   var cactiContainerRect = document.getElementById("cacti").getBoundingClientRect();
   return ((tRexContainerRect.right - 40 > cactiContainerRect.left) && (tRexContainerRect.left + 40 < cactiContainerRect.right)) || ((tRexContainerRect.bottom - cactiContainerRect.height - 2) > cactiContainerRect.top);
 }

 function endGame() {
  clearInterval(runInterval);
  clearInterval(tRexAliveInterval);
  clearInterval(tRexAliveInterval2);
  clearInterval(tRexAliveLoopInterval);
  clearInterval(moveInterval);
  document.getElementById("cloud").style.animationPlayState = "paused";
  document.getElementById("ground").style.animationPlayState = "paused";
  document.getElementById("cacti").style.animationPlayState = "paused";
  document.getElementById("tRex").className = "tRexDied";
  playGameOverAudio();
  isGameOver = true;
 }

 function playGameOverAudio() {
  var audio = new Audio("/sounds/die.wav");
  audio.play();
}