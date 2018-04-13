/*
* Create a list that holds all of your cards
*/

let cardList = document.getElementsByClassName("card");
let cards = [...cardList];

let deck = document.getElementsByClassName("deck")[0];

let moves = 0;
let counter = document.querySelector(".moves");


const stars = document.querySelectorAll(".fa-star");


let matchedCard = document.getElementsByClassName("match");


let timer = document.querySelector(".timer");


let  checkCards = [];

let wait = false;

let score;

let time;


start();


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function start(){
  checkCards=[];
  cards = shuffle(cards);
  cards.forEach(function (card)
  {
    card.classList.remove("show", "open", "match");
    card.addEventListener("click", onCardClick);
    card.addEventListener("click", finish);
    deck.appendChild(card);
  });

  moves = 0;
  counter.innerHTML = moves;
  score = 3;

  for (let i= 0; i < stars.length; i++){
    stars[i].style.visibility = "visible";
  }

  const  second = 0;  minute = 0;  hour = 0;
  timer.innerHTML = "0:0";
  clearInterval(time);
}



function onCardClick(event){
  if(!wait && ! this.classList.contains("open")){
  this.classList.add("open");
  this.classList.add("show");
  checkCards.push(this);
  let number = checkCards.length;
  if(number === 2 ){
    wait = true;
    count();
    if(checkCards[0].innerHTML === checkCards[1].innerHTML){
      matched();
    } else {
      unmatched();
    }
  }
}

}

function count(){
  moves++;
  counter.innerHTML = moves;
  if(moves === 1){
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
  if (moves > 10 && moves < 20){
    stars[2].style.visibility = "hidden";
    score = 2;
      }

  else if (moves > 20){
    stars[1].style.visibility = "hidden";
    score = 1;
  }
}

function startTimer(){
  time = setInterval(function(){
    second++;
    if(second === 60){
      minute++;
      second=0;
    }
    if(minute === 60){
      hour++;
      minute = 0;
    }
    timer.innerHTML = minute+":"+second;
    
  },1000);
}

function matched(){
  checkCards[0].classList.add("match");
  checkCards[1].classList.add("match");
  checkCards[0].classList.remove("show", "open");
  checkCards[1].classList.remove("show", "open");
  checkCards = [];
  wait = false;
}

function unmatched(){
  
  setTimeout(function(){
    checkCards[0].classList.remove("show", "open");
    checkCards[1].classList.remove("show", "open");
    checkCards = [];
    wait = false;
  },1000);
}


function finish(){
  if (matchedCard.length === 16){
    clearInterval(time);
        swal({
    allowEscapeKey: false,
    allowOutsideClick: false,
    title: 'Congratulations! You Won!',
    text: 'With ' + moves + ' Moves and ' + score + ' Stars in ' + minute+":"+second + '\n Woooooo!',
    type: 'success',
    confirmButtonColor: '#02ccba',
    confirmButtonText: 'Play again!'
  }).then(function (check) {
    if (check) {
      start();
    }
  })


  }
}


