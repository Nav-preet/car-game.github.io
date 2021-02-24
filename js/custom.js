const text = document.querySelector(".text");
const gameArea = document.querySelector(".gameArea");
let player = { speed: 5 }
let keys = { ArrowUp : false, ArrowDown : false, ArrowLeft : false, ArrowRight : false }
text.addEventListener('click',start);

    
    document.addEventListener('keydown',keyDown);
    document.addEventListener('keyup',keyUp);

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
    console.log(e.key);
    console.log(keys);
}

function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
    console.log(e.key);
    console.log(keys);
}



function start(){
    gameArea.classList.add("show");
    gameArea.classList.remove("hide");
    let car = document.createElement('div');
    car.setAttribute('class','car');
    gameArea.appendChild(car);

    player.start = true ;
    player.x = car.offsetTop;
    player.y = car.offsetLeft;
    console.log(player.x);
    console.log(player.y);
    window.requestAnimationFrame(gamePlay);
}


function gamePlay(){
    let car = document.querySelector(".car");
    let road = gameArea.getBoundingClientRect();
    console.log(road);

    if(player.start){
        if(keys.ArrowUp){ player.x -= player.speed ; }
        if(keys.ArrowDown){ player.x += player.speed ; }
        if(keys.ArrowLeft){ player.y -= player.speed ; }
        if(keys.ArrowRight){ player.y += player.speed ; }
         car.style.top = player.x + "px";
         car.style.left = player.y + "px";        
    }

    
    window.requestAnimationFrame(gamePlay);
}

