'use strict';

//instead of left and right based on activeness decide the current player(by using activePlayer logic)
//it would reduce duplication of code.

//variables
let newGameButton = document.querySelector('.btn--new');
let rollDiceButton = document.querySelector('.btn--roll');
let holdButton = document.querySelector('.btn--hold');
let diceImage = document.querySelector('.dice');

let totalScoreLeft = document.getElementById('score--0');
let totalScoreRight = document.getElementById('score--1');
let currentLeft = document.getElementById('current--0');
let currentRight = document.getElementById('current--1');

let playerLeft = document.querySelector('.player--0');
let playerRight = document.querySelector('.player--1');

let min = 1;
let max = 6;

let currentScore = 0;

let scores = [0, 0]; //scoreLeft,scoreRight.

let activePlayer = 0; //works as a flag variable.(to keep track of player's activeness)

//initial point dice image = none.
diceImage.classList.add('hidden');

//functions Expressions
const newGame = function () {
  location.reload(); //resets to initial state.
};

const generateDiceNumber = function () {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  //remove the hidden class of the diceImage
  diceImage.classList.remove('hidden');
  // changeDiceImage(randomNumber);
  //switch is lot of code
  diceImage.src = `dice-${randomNumber}.png`; //just one line instead of switch case

  if (randomNumber !== 1) {
    //add dice to current score
    currentScore += randomNumber;

    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } //if randomNumber == 1.
  else {
    // currentScore becomes zero
    changeActiveness();
  }
};

//gets called when hold button is clicked
const saveCurrentScore = function () {
  //adding current score to the active player.
  scores[activePlayer] += currentScore;

  //update total score of current player
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  //check if winner
  if (scores[activePlayer] >= 20) {
    //finish the game.
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    //disable buttons
    rollDiceButton.disabled = true;
    holdButton.disabled = true;

    //hide the dice image
    diceImage.classList.add('hidden');
  }

  //change activePlayer
  else {
    changeActiveness();
  }
};

const changeActiveness = function () {
  // currentScore becomes zero
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore; //ie = 0.

  //change player activeness.
  activePlayer = activePlayer === 0 ? 1 : 0;

  playerLeft.classList.toggle('player--active');
  playerRight.classList.toggle('player--active');
};

//main script program

//when new game button is pressed
newGameButton.addEventListener('click', newGame); //newGame reference is passed.

//Rolling dice functionality.
//when dice is rolled,rand number is generated,gets accumulated to currentScore
//player who is active will rolldice and hold button.
rollDiceButton.addEventListener('click', generateDiceNumber);

//when holdButton is clicked
holdButton.addEventListener('click', saveCurrentScore);

//rollButton and hold Button must make changes on web page based on the activeness of the player.
