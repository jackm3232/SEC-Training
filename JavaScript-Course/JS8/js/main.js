let player1 = "rock";
let player2 = "scissors";

switch (player1) {
  case player2:
    console.log("Tie game");
    break;
  case "rock":
    if (player2 === "paper") {
      console.log("Player 2 wins");
    }
    else {
      console.log("Player 1 wins");
    }
    break;
  case "paper":
    if (player2 === "scissors") {
      console.log("Player 2 wins");
    }
    else {
      console.log("Player 1 wins");
    }
    break;
  default:
    if (player2 === "rock") {
      console.log("Player 2 wins");
    }
    else {
      console.log("Player 1 wins");
    }
}
