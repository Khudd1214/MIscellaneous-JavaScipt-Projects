const imageElement = document.getElementsByTagName("img")[0];
const textElement = document.getElementsByTagName("p")[0];

const fullDeck = [
  "2H",
  "3H",
  "4H",
  "5H",
  "6H",
  "7H",
  "8H",
  "9H",
  "0H",
  "JH",
  "QH",
  "KH",
  "AH",
  "2D",
  "3D",
  "4D",
  "5D",
  "6D",
  "7D",
  "8D",
  "9D",
  "0D",
  "JD",
  "QD",
  "KD",
  "AD",
  "2C",
  "3C",
  "4C",
  "5C",
  "6C",
  "7C",
  "8C",
  "9C",
  "0C",
  "JC",
  "QC",
  "KC",
  "AC",
  "2S",
  "3S",
  "4S",
  "5S",
  "6S",
  "7S",
  "8S",
  "9S",
  "0S",
  "JS",
  "QS",
  "KS",
  "AS",
];

let playingDeck = [];

function setDeck() {
  playingDeck = [...fullDeck];
  let x = playingDeck.length;
  imageElement.setAttribute("src", "cardImages/Gray_back.jpg");
  textElement.textContent = "You have " + x + " cards remaining!";
}

function dealCard() {
  let x = playingDeck.length;
  if (x - 1 >= 0) {
    const randInt = Math.floor(Math.random() * (x - 1));
    imageElement.setAttribute(
      "src",
      "cardImages/" + playingDeck[randInt] + ".jpg"
    );
    playingDeck.splice(randInt, 1);
  }
  if (x - 1 <= 0) {
    textElement.textContent =
      "You have no more cards remaining! Shuffle the deck to continue.";
  } else {
    textElement.textContent = "You have " + (x - 1) + " cards remaining!";
  }
}

//console.log(fullDeck);
//console.log(playingDeck);
//setDeck();
