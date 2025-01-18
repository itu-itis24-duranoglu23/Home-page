
const wordDisplay = document.getElementById("word-display");
const guessInput = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-button");
const resetButton = document.getElementById("reset-button");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const svgMap = {
    A: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="30" height="40">
            <text x="50" y="305" font-family="Onyx" font-size="400" fill="#630335">A</text>
        </svg>`,
    D: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="30" height="40">
            <text x="50" y="300" font-family="Onyx" font-size="380" fill="#630335">D</text>
        </svg>`,
    E: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="30" height="40">
            <text x="50" y="305" font-family="Onyx" font-size="370" fill="#630335">E</text>
        </svg>`,
    I: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="30" height="40">
           <text x="50" y="305" font-family="Onyx" font-size="370" fill="#630335">I</text>
        </svg>`,
    U: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="30" height="40">
            <text x="50" y="305" font-family="Onyx" font-size="370" fill="#630335">U</text>
        </svg>`
     };



const word = "ADIEU"; 
let maskedWord = "_ ".repeat(word.length).trim(); 
let score = 0; 
let lives = 3; 
let gameOver = false; 
let guessedLetters = new Set(); 


function updateDisplay() {
    wordDisplay.innerHTML = ""; 
    maskedWord.split(" ").forEach((char) => {
        const box = document.createElement("span");
        box.classList.add("box");
        if (char !== "_") {
            
            box.innerHTML = svgMap[char] || ""; 
        }
        wordDisplay.appendChild(box);
    });
    scoreDisplay.textContent = score; 
    livesDisplay.textContent = lives; 
    }


function resetGame() {
    maskedWord = "_ ".repeat(word.length).trim(); 
    score = 0; 
    lives = 3; 
    gameOver = false; 
    guessInput.value = ""; 
    guessedLetters.clear();
    updateDisplay(); 
}


function checkGuess() {
    if (gameOver) {
        alert("Game Over! Press the reset button to restart.");
        return;
    }

    const guess = guessInput.value.toUpperCase().trim(); 
    guessInput.value = ""; 

    if (!guess) {
        alert("Please enter a letter or word.");
        return;
    }
    if (guessedLetters.has(guess)) {
        alert(`You already guessed "${guess}". Try a different letter or word.`);
        return;
    }
    if (guess.length !== 1 && guess.length !== 5) {
        alert("Invalid input! Please enter either a single letter or a 5-letter word.");
        return;
    }
    

    guessedLetters.add(guess); 


    if (guess.length === 1) {
        let correctGuess = false;
        const updatedWord = maskedWord.split(" ");
        for (let i = 0; i < word.length; i++) {
            if (word[i] === guess) {
                updatedWord[i] = guess;
                correctGuess = true;
            }
        }
        maskedWord = updatedWord.join(" ");

        if (correctGuess) {
            score += 20; 
        } else {
            lives--; 
        }
    } else if (guess === word) {
        maskedWord = word.split("").join(" ");
        updateDisplay();
        setTimeout(function() { 
            alert("Congratulations! You guessed the correct word.");
        },100);
        score = 100;
        gameOver = true;
    } else {
        lives = 0; 
        alert("Wrong word! You lost the game.");
        gameOver = true;
    }

    updateDisplay(); 
    if (lives <= 0 && !gameOver) {
        alert("No lives left! You lost the game.");
        gameOver = true;
    }

   
    if (!maskedWord.includes("_") && !gameOver) {
        updateDisplay();
        setTimeout(function() { 
        alert("Congratulations! You won the game.");
        },100);
        gameOver = true;
    }
}


submitButton.addEventListener("click", checkGuess);


resetButton.addEventListener("click", resetGame);

resetGame();