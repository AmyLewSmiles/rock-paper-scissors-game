const playerScoreEl = document.getElementById('player_score');
const computerScoreEl = document.getElementById('computer_score');
const buttons = document.querySelectorAll('button[id$="_button"]'); // selects all choice buttons


let playerScore = 0;
let computerScore = 0;

// Create restart button (hidden by default)
const restartBtn = document.createElement('button');
restartBtn.textContent = 'Restart Game';
restartBtn.style.display = 'none';
restartBtn.id = 'restart_button';
document.body.appendChild(restartBtn);

restartBtn.addEventListener('click', function() {
  playerScore = 0;
  computerScore = 0;
  updateScores();
  document.getElementById('result_message').innerHTML = '';
  restartBtn.style.display = 'none';
});
function getWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return "It's a tie!";
  if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    return "Player wins!";
  }
  return "Computer wins!";
}

buttons.forEach(button => {
  button.addEventListener('click', function() {
    if (playerScore >= 5 || computerScore >= 5) return; // Prevent play after game ends
    const playerChoice = button.value;
    console.log("Player chose:", playerChoice);
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    // Update scores
    if (winner === "Player wins!") {
      playerScore++;
    } else if (winner === "Computer wins!") {
      computerScore++;
    }
    updateScores();
    // Show result message
    const resultMessageEl = document.getElementById('result_message');
    let color = '';
    if (winner === "Player wins!") {
      color = 'green';
    } else if (winner === "Computer wins!") {
      color = 'red';
    } else {
      color = 'gray';
    }
    resultMessageEl.innerHTML =
      `Player chose: ${playerChoice}<br>Computer chose: ${computerChoice}<br><span style="color:${color}">${winner}</span>`;

    // Show restart button and confetti if someone reaches 5
    if (playerScore >= 5 || computerScore >= 5) {
      restartBtn.style.display = 'inline-block';
      // Confetti shower
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      // Show winner in green and bold
      let winnerText = '';
      if (playerScore >= 5) {
        winnerText = '<span style="color:green;font-weight:bold;">Player wins the game!</span>';
      } else {
        winnerText = '<span style="color:green;font-weight:bold;">Computer wins the game!</span>';
      }
      resultMessageEl.innerHTML += `<br>${winnerText}`;
    }
  });
});

function updateScores() {
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function showComputerChoice() {
  const computerChoice = getComputerChoice();
  document.getElementById('result_message').textContent = computerChoice;
}

// Call updateScores() whenever scores change