let computerSelection = "";
let playerSelection = "";
let roundResult = "";

function computerPlay() {
  computerSelection = Math.floor(Math.random() * 3);
  computerSelection == 0
    ? (computerSelection = "Rock")
    : computerSelection == 1
    ? (computerSelection = "Paper")
    : (computerSelection = "Scissors");
  console.log(computerSelection);
  return computerSelection;
}


function playRound(computerSelection, playerSelection) {
  playerSelection = prompt(
    "Please choose Rock/Paper/Scissors (write down what have you chosen)",
    "Rock"
  );
  if (!playerSelection) {
    alert("Please try again");
    return;
  } else {
    playerSelection = capitalize(playerSelection);

    if (
      playerSelection !== "Rock" &&
      playerSelection !== "Paper" &&
      playerSelection !== "Scissors"
    ) {
      alert("Please enter valid value: rock, paper or scissors");
      return;
    } else {
      computerPlay();
      switch (playerSelection) {
        case computerSelection:
          roundResult = "Dead heat!";

          break;
        case "Rock":
          if ((computerSelection = "Scissors")) {
            roundResult = "You Win! Rock beats Scissors";
          } else if ((computerSelection = "Paper")) {
            roundResult = "You Lose! Paper beats Rock";
          }
          break;
        case "Paper":
          if ((computerSelection = "Scissors")) {
            roundResult = "You Lose! Scissors beats Paper";
          } else if ((computerSelection = "Rock")) {
            roundResult = "You Win! Paper beats Rock";
          }
          break;
        case "Scissors":
          if ((computerSelection = "Paper")) {
            roundResult = "You Win! Scissors beats Paper";
          } else if ((computerSelection = "Rock")) {
            roundResult = "You Lose! Rock beats Scissors";
          }
          break;
        default:
          console.log("default");
      }
      console.log(roundResult);
    }
  }
}

function game() {
    for (let i =0; i < 5; i++) {
    playRound(computerSelection, playerSelection);


}
}

function capitalize(someString) {
  return (someString =
    someString[0].toUpperCase() + someString.slice(1).toLowerCase());
}
