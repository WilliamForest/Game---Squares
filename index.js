'use strict';
const $start = document.querySelector('#start'),
      $game = document.querySelector('#game'),
      $time = document.querySelector('#time'),
      $headerTime = document.querySelector('#time-header'),
      $headerResult = document.querySelector('#result-header'),
      $gameTime = document.querySelector('#game-time');

let $result = document.querySelector('#result');

let score = 0;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setTimeGame);

let gameDefaultRunTime = false;

function createBox(){
    $game.innerHTML = '';
    const box = document.createElement('div');
    box.innerHTML ='';
    box.style.position = 'absolute';
    box.setAttribute('data-box', 'true');

    let sizeField = $game.getBoundingClientRect();
    let size = getRandom(10, 100);
    let top = sizeField.height - size;
    let left = sizeField.width - size;  
    
    box.style.width = box.style.height = size + 'px';
    box.style.backgroundColor = `#${getRandom(123456, 999999)}`;
    box.style.top = getRandom(1, top) + 'px';
    box.style.left = getRandom(1, left) + 'px';
    box.style.cursor = 'pointer';

    $game.insertAdjacentElement('afterbegin', box);
}

function handleBoxClick(event){
    if(!gameDefaultRunTime){
        return;
    }
    if(event.target.dataset.box){
        score++;
        createBox();
    }
}

function startGame (){
    gameDefaultRunTime = true;
    hidden($start);
    $game.style.cssText = 'background-color: #fff';
    $gameTime.setAttribute('disabled', true);
    createBox();
    startTimer();
    setTimeGame();
    resetGame();
}

function getRandom(min, max){
    return parseInt(Math.floor(Math.random() * (max-min) + min));
}

function hidden($el){
    $el.classList.add('hide');
}
function show($el){
    $el.classList.remove('hide');
}


function gameEnd(){
gameDefaultRunTime = false;
getScore();

$gameTime.removeAttribute('disabled'); 
$game.innerHTML ='';
$game.style.backgroundColor = '#ccc';
show($start);

hidden($headerTime);
show($headerResult);
}

function startTimer(){
    let interval = setInterval(()=>{
        let time = parseFloat($time.textContent);
        if(time <= 0){
            clearInterval(interval);
            gameEnd();
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }
    }, 100);
}

function getScore(){
    $result.textContent = score.toString();
}

function setTimeGame(){
    let time = +$gameTime.value;
    $time.textContent = time.toFixed('1');
}

function resetGame(){
  score = 0;
  show($headerTime);
  hidden($headerResult);
}