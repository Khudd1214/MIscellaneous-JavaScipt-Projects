'use strict';

//DOM statements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');

const diceElement = document.querySelector('.dice');
const newButton = document.querySelector('.btn--new');
const rollButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const initialize = function () {
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  diceElement.classList.add('hidden');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

window.addEventListener('load', initialize);

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

rollButton.addEventListener('click', function () {
  if (playing) {
    //roll the dice
    const diceRoll = Math.ceil(Math.random() * 6);
    //display the dice
    diceElement.setAttribute('src', 'dice-' + diceRoll + '.png');
    diceElement.classList.remove('hidden');
    //check for rolled 1. If true, switch to next player
    if (diceRoll !== 1) {
      //add dice to current score, the 'pot'
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else if (diceRoll === 1) {
      //switch to next player
      switchPlayer();
    }
  }
});

holdButton.addEventListener('click', function () {
  if (playing) {
    // add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if players score is >= 100
    //Finish the game
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceElement.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

newButton.addEventListener('click', initialize);
