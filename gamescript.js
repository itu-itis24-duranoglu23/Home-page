// HTML öğelerini seç
const wordDisplay = document.getElementById("word-display");
const guessInput = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-button");
const resetButton = document.getElementById("reset-button");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");

// Oyun değişkenleri
const word = "ADIEU"; // Tahmin edilecek kelime
let maskedWord = "_ ".repeat(word.length).trim(); // Maskelenmiş kelime
let score = 0; // Başlangıç skoru
let lives = 3; // Başlangıç hakları
let gameOver = false; // Oyun durumu

// Ekranı güncelle
function updateDisplay() {
    wordDisplay.textContent = maskedWord; // Maskelenmiş kelimeyi göster
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
