let play_game = confirm("Shall we play rock, paper, scissors?");

//If user clicked "Ok" on initial confirm and wants to play the game
if (play_game) {
  let player_choice = prompt("Please enter rock, paper, or scissors.");

  if (player_choice) {
    let player1 = player_choice.trim().toLowerCase();

    //If user entered a valid choice
    if (player1 === "rock" || player1 === "paper" || player1 === "scissors") {
      let computer_choice = Math.floor(Math.random() * 3 + 1);
      let computer =
        computer_choice === 1 ? "rock"
        : computer_choice === 2 ? "paper"
        : "scissors";

      let result =
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
        let play_again = confirm("Play Again?");
        play_again ? location.reload() : alert("Ok, thanks for playing.");
    }
    //User entered text but did not enter a valid choice
    else {
      alert("You didn't enter rock, paper. or scissors.");
    }
  }
  //If user clicked "Cancel" or clicked "Ok" without typing anything on prompt
  else {
    alert("I guess you changed your mind. Maybe next time.");
  }
}
//If user clicked "Cancel" on the initial confirm
else {
  alert("Ok, maybe next time.");
}
