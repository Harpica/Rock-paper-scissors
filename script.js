let computerSelection = '';
let playerSelection = '';
let roundResult = 0;
let roundResultNotification = '';

const svgSelections = {
  rock: './images/rock.svg',
  paper: './images/paper.svg',
  scissors: './images/scissors.svg',
  none: './images/question.svg',
};

// Star generation
const root = document.querySelector('.root');

const starParam = {
  amount: 200,
  size: {
    min: 2,
    max: 5,
    giant: 10,
  },
  duration: {
    min: 2,
    max: 10,
  },
};

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateStars() {
  for (let i = 0; i < starParam.amount; i++) {
    const star = document.createElement('div');
    star.setAttribute('class', 'star');

    const getSize = function () {
      if (Math.random() === 0) {
        return starParam.size.giant;
      } else {
        return randomBetween(starParam.size.min, starParam.size.max);
      }
    };
    const size = getSize();
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDuration = `${randomBetween(
      starParam.duration.min,
      starParam.duration.max
    )}s`;
    root.append(star);
  }
}

generateStars();

function computerPlay() {
  computerSelection = Math.floor(Math.random() * 3);
  computerSelection == 0
    ? (computerSelection = 'Rock')
    : computerSelection == 1
    ? (computerSelection = 'Paper')
    : (computerSelection = 'Scissors');
  console.log(computerSelection);
  return computerSelection;
}

// Проверка победителя
function checkWinner(playerResult, oppResult) {
  if (playerResult === 3) {
    alert('Congratulations! You Win!');
  } else if (oppResult === 3) {
    alert('You Lose');
  }
}

function capitalize(someString) {
  return (someString =
    someString[0].toUpperCase() + someString.slice(1).toLowerCase());
}

// Если игрок нажал ножницы - присвоить значение playerSelection - scissors + вызвать функцию игры
const counterPlayer = document.querySelector('.counter__you');
const counterOpp = document.querySelector('.counter__opp');

let playerResult = 0;
let oppResult = 0;

const playerImage = document.querySelector('.player-image');
const oppImage = document.querySelector('.opponent-image');

// Высветить выбранное оружие на экране
function showOnScreen(screen, selection) {
  switch (selection) {
    case 'Rock':
      screen.src = svgSelections.rock;
      break;
    case 'Paper':
      screen.src = svgSelections.paper;
      break;
    case 'Scissors':
      screen.src = svgSelections.scissors;
      break;
    default:
      screen.src = svgSelections.none;
  }
}

const playButtons = Array.from(document.querySelectorAll('.button__play'));

playButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    playerSelection = event.target.value;
    computerPlay();
    showOnScreen(oppImage, computerSelection);
    showOnScreen(playerImage, playerSelection);
    playRound(computerSelection, playerSelection);
    checkWinner(playerResult, oppResult);
  });
});

function playRound(computerSelection, playerSelection) {
  switch (playerSelection) {
    case computerSelection:
      roundResultNotification = 'Dead heat!';

      break;
    case 'Rock':
      if ((computerSelection = 'Scissors')) {
        roundResultNotification = 'You Win! Rock beats Scissors';
        playerResult += 1;
        console.log(playerResult);
      } else if ((computerSelection = 'Paper')) {
        roundResultNotification = 'You Lose! Paper beats Rock';
        oppResult += 1;
      }
      break;
    case 'Paper':
      if ((computerSelection = 'Scissors')) {
        roundResultNotification = 'You Lose! Scissors beats Paper';
        oppResult += 1;
      } else if ((computerSelection = 'Rock')) {
        roundResultNotification = 'You Win! Paper beats Rock';
        playerResult += 1;
      }
      break;
    case 'Scissors':
      if ((computerSelection = 'Paper')) {
        roundResultNotification = 'You Win! Scissors beats Paper';
        playerResult += 1;
      } else if ((computerSelection = 'Rock')) {
        roundResultNotification = 'You Lose! Rock beats Scissors';
        oppResult += 1;
      }
      break;
  }
  counterPlayer.textContent = playerResult;
  counterOpp.textContent = oppResult;
  console.log(roundResultNotification);
  return playerResult, oppResult;
}

// Новая игра
const newGameButton = document.querySelector('.button__new-game');

function startNewGame() {
  counterPlayer.textContent = 0;
  counterOpp.textContent = 0;
  playerResult = 0;
  oppResult = 0;
  showOnScreen(playerImage);
  showOnScreen(oppImage);
}

newGameButton.addEventListener('click', startNewGame);

showOnScreen(playerImage);
showOnScreen(oppImage);

// анимация набора текста
const textContainer = document.querySelector('.content__title');
text = textContainer.textContent;

function animateWritting(text) {
  textArray = text.split('');
  textContainer.textContent = textArray[0];
  for (let i = 1; i < textArray.length; i++) {
    setTimeout(() => {
      textContainer.textContent = textContainer.textContent + textArray[i];
    }, i * 100);
  }
}

animateWritting(text);

setInterval(animateWritting, 10000, text);
