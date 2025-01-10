// HTML öğelerini seç
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


// Oyun değişkenleri
const word = "ADIEU"; // Tahmin edilecek kelime
let maskedWord = "_ ".repeat(word.length).trim(); // Maskelenmiş kelime
let score = 0; // Başlangıç skoru
let lives = 3; // Başlangıç hakları
let gameOver = false; // Oyun durumu
let guessedLetters = new Set(); // Daha önce tahmin edilen harfler

// Ekranı güncelle
// Ekranı güncelle
function updateDisplay() {
    wordDisplay.innerHTML = ""; // Kutuları temizle
    maskedWord.split(" ").forEach((char) => {
        const box = document.createElement("span");
        box.classList.add("box");
        if (char !== "_") {
            // SVG kodunu kutuya ekle
            box.innerHTML = svgMap[char] || ""; // Harf için SVG'yi getir
        }
        wordDisplay.appendChild(box);
    });
    scoreDisplay.textContent = score; // Skoru güncelle
    livesDisplay.textContent = lives; // Hakları güncelle
    }

// Oyunu sıfırla
function resetGame() {
    maskedWord = "_ ".repeat(word.length).trim(); // Kelimeyi sıfırla
    score = 0; // Skoru sıfırla
    lives = 3; // Hakları sıfırla
    gameOver = false; // Oyun durumunu sıfırla
    guessInput.value = ""; // Giriş alanını temizle
    guessedLetters.clear();
    updateDisplay(); // Ekranı güncelle
}

// Tahmini kontrol et
function checkGuess() {
    if (gameOver) {
        alert("Game Over! Press the reset button to restart.");
        return;
    }

    const guess = guessInput.value.toUpperCase().trim(); // Kullanıcıdan tahmini al
    guessInput.value = ""; // Giriş alanını temizle

    if (!guess) {
        alert("Please enter a letter or word.");
        return;
    }
    if (guessedLetters.has(guess)) {
        alert(`You already guessed "${guess}". Try a different letter or word.`);
        return;
    }

    guessedLetters.add(guess); // Yeni tahmini kaydet


    if (guess.length === 1) {
        // Harf tahmini
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
            score += 20; // Doğru tahmin puan kazandırır
        } else {
            lives--; // Yanlış tahmin hak azaltır
        }
    } else if (guess === word) {
        // Kelime tahmini doğruysa
        maskedWord = word.split("").join(" ");
        score = 100; // Tüm kelimeyi doğru tahmin edince maksimum puan
        alert("Congratulations! You guessed the correct word.");
        gameOver = true;
    } else {
        // Kelime tahmini yanlışsa
        lives = 0; // Haklar sıfırlanır
        alert("Wrong word! You lost the game.");
        gameOver = true;
    }

    updateDisplay(); // Ekranı güncelle

    // Haklar sıfırlandığında oyun biter
    if (lives <= 0 && !gameOver) {
        alert("No lives left! You lost the game.");
        gameOver = true;
    }

    // Oyunu kazandığında kontrol et
    if (!maskedWord.includes("_") && !gameOver) {
        alert("Congratulations! You won the game.");
        gameOver = true;
    }
}

// "Tahmin Et" butonu için olay dinleyici
submitButton.addEventListener("click", checkGuess);

// "Reset" butonu için olay dinleyici
resetButton.addEventListener("click", resetGame);

// Oyunu başlat
resetGame();
