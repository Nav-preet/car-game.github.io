const text = document.querySelector(".text");
const gameArea = document.querySelector(".gameArea");
let player = { speed: 3 , score : 0 }
let keys = { ArrowUp : false, ArrowDown : false, ArrowLeft : false, ArrowRight : false }
text.addEventListener('click',start);

    
    document.addEventListener('keydown',keyDown);
    document.addEventListener('keyup',keyUp);

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
}

function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
}

function hexColor(){
    function c1(){
        let hex = Math.floor(Math.random()*256).toString(16);
        return ("0"+ String(hex)).substr(-2);
    }
    return "#" + c1() + c1() + c1();
}

function start(){
    gameArea.classList.add("show");
    gameArea.classList.remove("hide");
    let car = document.createElement('div');
    car.setAttribute('class','car');
    gameArea.appendChild(car);

    for (i=0; i<5 ; i++){

        let roadLines = document.createElement('div');
        roadLines.setAttribute('class' , 'lines');
        roadLines.y = (i*150);
        roadLines.style.top = roadLines.y + 'px';
        gameArea.appendChild(roadLines);
    }

    for (x=0; x<3 ; x++){

        let roadCars = document.createElement('div');
        roadCars.setAttribute('class' , 'enemyCars');
        roadCars.y = ((x+1)*350)*-1;
        roadCars.style.top = roadCars.y + 'px';
        roadCars.style.background = hexColor();
        roadCars.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(roadCars);
    } 

    player.start = true ;
    player.x = car.offsetTop;
    player.y = car.offsetLeft;
    console.log(player.x);
    console.log(player.y);
    window.requestAnimationFrame(gamePlay);
}
function isCollide(a,b){
    aPos = a.getBoundingClientRect();
    bPos = b.getBoundingClientRect();
    
    return !((aPos.top > bPos.bottom) || (aPos.bottom < bPos.top) || (aPos.left > bPos.right) || (aPos.right < bPos.left))
}

function moveLines(){
    let lines = document.querySelectorAll('.lines');
    
    lines.forEach(function(item) {
        if(item.y >= 700){
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + 'px';
    });
} 
function endGame() {
    player.start = false;
    console.log('hit');
}
function moveCars(car){
    let eCars = document.querySelectorAll('.enemyCars');
    
    eCars.forEach(function(item) {
         if(isCollide(car, item)){
            endGame();
        }
        if(item.y >= 750){
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + 'px';
    });
} 

function gamePlay(){
    let car = document.querySelector(".car");
    let eCars = document.querySelector('.enemyCars');
    let road = gameArea.getBoundingClientRect();
    
    
    if(player.start){
        moveLines();
        moveCars(car);

        if(keys.ArrowUp && player.x > (road.top + 50)) { player.x -= player.speed ; }
        if(keys.ArrowDown && player.x < (road.bottom - 70)){ player.x += player.speed ; }
        if(keys.ArrowLeft && player.y > 0){ player.y -= player.speed ; }
        if(keys.ArrowRight && player.y < (road.width - 50)){ player.y += player.speed ; }
         car.style.top = player.x + "px";
         car.style.left = player.y + "px"; 
         player.score++;
        text.innerHTML = player.score ; 
        window.requestAnimationFrame(gamePlay);      
    }

    
    
}

