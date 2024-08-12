let play_game = confirm("Shall we play rock, paper, scissors?");

//If user clicked "Ok" on initial confirm and wants to play the game
if (play_game) {
  while (play_game) {
    const player_choice = prompt("Please enter rock, paper, or scissors.");
    if (player_choice || player_choice === "") {
      const player1 = player_choice.trim().toLowerCase();

      //If user entered a valid choice
      if (player1 === "rock" || player1 === "paper" || player1 === "scissors") {
        const computer_choice = Math.floor(Math.random() * 3);
        const rps_arr = ["rock", "paper", "scissors"];
        const computer = rps_arr[computer_choice];

        const result =
          player1 === computer
          ? "Tie game!"
          : player1 === "rock" && computer === "paper"
          ? `Player 1: ${player1}\nComputer: ${computer}\nComputer wins!`
          : player1 === "paper" && computer === "scissors"
          ? `Player 1: ${player1}\nComputer: ${computer}\nComputer wins!`
          : player1 === "scissors" && computer === "rock"
          ? `Player 1: ${player1}\nComputer: ${computer}\nComputer wins!`
          : `Player 1: ${player1}\nComputer: ${computer}\nPlayer 1 wins!`;

          alert(result);
          play_game = confirm("Play Again?");
          if (!play_game) {
            alert("Ok, thanks for playing.");
          }
      }
      //User entered text (or no text) but did not enter a valid choice
      else {
        alert("You didn't enter rock, paper. or scissors.");
      }
    }
    //If user clicked "Cancel" when asked to input rock, paper, or scissors
    else {
      alert("I guess you changed your mind. Maybe next time.");
      break;
    }
  }
}
//If user clicked "Cancel" on the initial confirm asking to play the game
else {
  alert("Ok, maybe next time.");
}
