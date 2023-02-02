score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');

setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function(e){
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode==38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {/*Jo bhi kaam kare wo 700 mili seconds ke baad kare.*/
            dino.classList.remove('animateDino')
        }, 700);
    }
    if (e.keyCode==39) {
        dino = document.querySelector('.dino');
        dinox = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = dinox + 112 + "px";
    }

    if (e.keyCode==37) {
        dino = document.querySelector('.dino');
        dinox = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = (dinox - 112) + "px";
    }
}
// /*Ham ek time interval ke baad kaam karte rahna chate hai.Basicall ye yaha obstacle se collision ko check karega ek time interval ke baad*/
setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
    /*Animation ke help se dino ki left value ko change kar rha hu*/
    dx = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));

    /*Animation ke help se dino ki top ki value ko change kar rha hu*/
    dy = parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));

    /*Animation ke help se obstacle ki left ki value ko change kar rha hu*/
    ox = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));

    /*Animation ke help se obstacle ki top ki value ko change kar rha hu*/
    oy = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
   // console.log(offsetX,offsetY)
    //Agar aap takra jate ho to game ko over ho jana hai; 
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload To Play Again";
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    //Lekin agar ham jab nahi takrate hia tab kya karna hai wo yaha karenge ;
    //Hmne cross ko isliye banaya hia taki hamra score baaar baaar na badhta rahe;
    else if( offsetX < 145 && cross){//This dino hamre obstacle ke aas paas ho and cross true ho;
        score+=1;
        updateScore(score);
        cross = false;//Cross hamara 1sec ke liye false ho jaega;
        setTimeout(() => {//Score update karne ke baad cross wapas se true ho jaega;
            cross = true;
        }, 1000);

        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ',newDur)
        }, 500);
    }

}, 10);

function updateScore(score){
    scoreCount.innerHTML = "Your Score: " + score
}