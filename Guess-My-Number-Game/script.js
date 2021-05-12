'use strict';
// add higher order function for click events
// create change background color function
let secretNumber = Math.ceil(Math.random() * 20);
let score = 20;
let highscore = 0;

const message = document.querySelector('.message');
const scoreLocation = document.querySelector('.score');
const backgroundColorChange = document.getElementsByTagName('body')[0];
const numberWidth = document.querySelector('.number');

function incorrectGuess(guess) {
  message.textContent =
    guess > secretNumber ? 'Sorry, too high...' : 'Sorry, too low...';
  score--;
  scoreLocation.textContent = score;
}

function winCondition() {
  message.textContent = 'Correct!';
  backgroundColorChange.style.backgroundColor = 'green';

  numberWidth.style.width = '30rem';

  document.querySelector('.number').textContent = secretNumber;
}

function loseCondition() {
  message.textContent = 'You lose!';
  backgroundColorChange.style.backgroundColor = 'red';
  score = 0;
  scoreLocation.textContent = score;

  numberWidth.style.width = '30rem';

  document.querySelector('.number').textContent = secretNumber;
}

const target = document.querySelector('.check');
target.addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  const guessRange = Boolean(guess >= 1 && guess <= 20);

  //Dom Locations stored as variables

  if (!guess && guess !== 0) {
    //Game Logic - This first statement is for when the player fails to entery any number or enters zero.
    message.textContent = 'No number!';
  } else if (guess === secretNumber && guessRange) {
    //This next condition is for when the player guesses the correct number.
    winCondition();
    if (score > highscore) {
      document.querySelector('.highscore').textContent = score;
    }
  } else if (guess !== secretNumber && guessRange) {
    //This next condition is for when the player guesses a lower number than the correct answer.
    if (score > 1) {
      incorrectGuess(guess);
    } else {
      loseCondition();
    }
  } else {
    message.textContent = 'Please enter a number between 1 and 20';
  }
});

//This function will properly restore the default settings of the page
const again = document.querySelector('.again');
again.addEventListener('click', function () {
  score = 20;
  secretNumber = Math.ceil(Math.random() * 20);
  const message = document.querySelector('.message');
  message.textContent = 'Start guessing';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  document.getElementsByTagName('body')[0].style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});

/* This function 'restores' the initial state of the page by forcing the browser to refresh.
const again = document.querySelector('.again');
again.addEventListener('click', function () {
  //document.getElementsByTagName('body')[0].style.backgroundColor = 'red';
  location.reload();
});
*/
