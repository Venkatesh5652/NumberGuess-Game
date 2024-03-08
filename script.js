let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;

function checkGuess() {
  const userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = "Previous guesses: ";
  }

  if (userGuess > 100 || userGuess < 0) {
    window.alert("Pls input 1-100 numbers only");
  }

  guesses.textContent += userGuess + " ";

  if (userGuess === randomNumber) {
    lastResult.textContent = "Congratulations!";
    lastResult.style.backgroundColor = "green";
    lowOrHi.textContent = "";
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = "!!!GAME OVER!!!";
    lowOrHi.textContent = "";
    setGameOver();
  } else {
    lastResult.textContent = "Wrong!";
    lastResult.style.backgroundColor = "red";
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "Last guess was too low!";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "Last guess was too high!";
    }
  }

  guessCount++;
  guessField.value = "";
  guessField.focus();
}

guessSubmit.addEventListener("click", checkGuess);

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement("button");
  resetButton.style.display = "block";
  resetButton.style.fontSize = "20px";
  resetButton.style.border = "none";
  resetButton.style.cursor = "pointer";
  resetButton.style.margin = "0 auto";
  resetButton.style.padding = "10px 20px";
  resetButton.style.backgroundColor = "#e3c710";
  resetButton.style.borderRadius = "6px";
  resetButton.style.textTransform = "upperCase";
  resetButton.textContent = "Start new game";
  document.body.appendChild(resetButton);
  resetButton.addEventListener("click", resetGame);
}

function resetGame() {
  guessCount = 1;
  const resetParas = document.querySelectorAll(".resultParas p");
  for (const resetPara of resetParas) {
    resetPara.textContent = "";
  }

  resetButton.parentNode.removeChild(resetButton);
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();
  lastResult.style.backgroundColor = "white";
  randomNumber = Math.floor(Math.random() * 100) + 1;
}

// Function to check if a media query matches
function checkMediaQuery() {
  if (window.matchMedia("(max-width: 600px)").matches) {
    // Apply styles or behaviors for screens smaller than 600px
    guesses.style.fontSize = "25px";
    lastResult.style.margin = "auto";
    lowOrHi.style.fontSize = "25px";
  } else {
    // Apply default styles or behaviors
  }
}

// Add event listener to check media query on window resize
window.addEventListener("resize", checkMediaQuery);

// Initial check when the script is first loaded
checkMediaQuery();
