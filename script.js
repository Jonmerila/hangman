const keyBoard = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessCount = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModel = document.querySelector(".game-model");
const displayWord = document.querySelector(".content b");
const playAgian = document.querySelector(".play-agian");

let currentWord,
  correctLetters = [],
  wrongGuessCount = 0;
const maxGuesses = 6;

//Reset game
const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  guessCount.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  keyBoard.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  gameModel.classList.remove("show");
};

const getRandomWord = () => {
  //Selecting a random word and hiny form the wordList
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  console.log(hint, word);
  currentWord = word;
  displayWord.innerText = word;
  const hintText = (document.querySelector(".hint-text b").innerText = hint);
  resetGame();
  wordDisplay.innerHTML = word
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modelText = isVictory
      ? "You guessed the right word!"
      : "The correct word was: ";
    gameModel.querySelector("img").src = `images/${
      isVictory ? "victory" : "lost"
    }.gif`;
    gameModel.querySelector("h3").innerText = `${
      isVictory ? "Congrats!" : "You lost!"
    }`;
    gameModel.querySelector(
      "p"
    ).innerHTML = `${modelText} <b>${currentWord}</b>`;

    gameModel.classList.add("show");
  }, 300);
};

const initGame = (button, clickedLetter) => {
  //Checking if the selected letter exists in the current hangman word word
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add = "guessed";
      }
    });
  } else {
    //Wrong guess, add to wrong guess count and switch hangman img
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }

  button.disabled = true;
  guessCount.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

//Creating keyboard buttons and adding eventlisteners
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyBoard.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
  //   console.log(String.fromCharCode(i));
  //Charcode 97 through 122 runs through the english alphabet
}

getRandomWord();
playAgian.addEventListener("click", getRandomWord);
