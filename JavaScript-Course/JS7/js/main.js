let player1 = "rock";
let player2 = "scissors";
let winner;

if (player1 === player2) {
  winner = "tie game";
}
else if (player1 === "rock") {
  if (player2 === "paper") {
    winner = "Player 2";
  }
  else {
    winner = "Player 1";
  }
}
else if (player1 === "paper") {
  if (player2 === "scissors") {
    winner = "Player 2";
  }
  else {
    winner = "Player 1";
  }
}
else {
  if (player2 === "rock") {
    winner = "Player 2";
  }
  else {
    winner = "Player 1";
  }
}

console.log(`Winner: ${winner}`);
