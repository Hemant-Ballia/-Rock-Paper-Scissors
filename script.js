const choices = ["Rock", "Paper", "Scissors"];
const btns = {
  Rock: document.getElementById("rock"),
  Paper: document.getElementById("paper"),
  Scissors: document.getElementById("scissors"),
};
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const playerChoiceEl = document.getElementById("player-choice");
const computerChoiceEl = document.getElementById("computer-choice");
const winnerEl = document.getElementById("winner");
const resetBtn = document.getElementById("reset-btn");
const historyEl = document.getElementById("history");
const themeToggle = document.getElementById("theme-toggle");

let playerScore = 0,
  computerScore = 0,
  rounds = 0;

function resetActive() {
  Object.values(btns).forEach((b) => b.classList.remove("winner"));
}

function playGame(playerChoice) {
  resetActive();
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  playerChoiceEl.textContent = `Your choice: ${playerChoice}`;
  computerChoiceEl.textContent = `Computer choice: ${computerChoice}`;

  let result;
  if (playerChoice === computerChoice) {
    result = "Draw! 😐";
  } else if (
    (playerChoice === "Rock" && computerChoice === "Scissors") ||
    (playerChoice === "Paper" && computerChoice === "Rock") ||
    (playerChoice === "Scissors" && computerChoice === "Paper")
  ) {
    result = "You win! 🎉";
    playerScore++;
    btns[playerChoice].classList.add("winner");
  } else {
    result = "Computer wins! 🤖";
    computerScore++;
    btns[computerChoice].classList.add("winner");
  }

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  winnerEl.textContent = `Winner: ${result}`;

  // Save history
  const li = document.createElement("li");
  li.textContent = `Round ${++rounds}: You - ${playerChoice}, Computer - ${computerChoice} → ${result}`;
  historyEl.prepend(li);
  if (historyEl.childNodes.length > 5)
    historyEl.removeChild(historyEl.lastChild);

  // Best of 5 → show modal instead of alert
  if (playerScore === 3 || computerScore === 3) {
    setTimeout(() => {
      showWinnerModal(
        playerScore > computerScore
          ? "🎉 You win the match!"
          : "🤖 Computer wins the match!"
      );
    }, 300);
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  rounds = 0;
  playerScoreEl.textContent = "0";
  computerScoreEl.textContent = "0";
  playerChoiceEl.textContent = "Your choice: -";
  computerChoiceEl.textContent = "Computer choice: -";
  winnerEl.textContent = "Winner: -";
  historyEl.innerHTML = "";
  resetActive();
}

// Modal popup for winner
function showWinnerModal(message) {
  const modal = document.getElementById("winnerModal");
  const modalMsg = document.getElementById("modalMessage");
  modalMsg.textContent = message;
  modal.style.display = "flex";

  document.getElementById("closeModal").onclick = () => {
    modal.style.display = "none";
    resetGame();
  };

  document.getElementById("playAgainBtn").onclick = () => {
    modal.style.display = "none";
    resetGame();
  };
}

btns.Rock.onclick = () => playGame("Rock");
btns.Paper.onclick = () => playGame("Paper");
btns.Scissors.onclick = () => playGame("Scissors");
resetBtn.onclick = resetGame;

// Dark mode toggle
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
};
