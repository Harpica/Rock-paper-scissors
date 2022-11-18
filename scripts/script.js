import {generateStars} from './modules/stars.js';
import { randomBetween } from './modules/utils.js';

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

const root = document.querySelector('.root');

generateStars(root);

// Объект, хранящий информацию о выборе компьютера + зависимости для разных планет
let AIState = {
  counter: 0,
  nextChoice: '',
  computerSelection: '',
  algoStyle: '',
  // Обычный равновероятностный выбор, чем играть
  playFairOptions: function () {
    this.computerSelection = Math.floor(Math.random() * 3);
    this.computerSelection == 0
      ? (this.computerSelection = 'Rock')
      : this.computerSelection == 1
      ? (this.computerSelection = 'Paper')
      : (this.computerSelection = 'Scissors');
    return AIState;
  },
  // Планета, которая начинает с камня и выбирает каждый второй раз камень
  playGameRock: function () {
    if (this.counter === 0) {
      this.counter = 1;
      this.computerSelection = 'Rock';
      return AIState;
    } else if (this.counter === 1) {
      this.counter = 0;
      this.playFairOptions();
      return AIState;
    }
  },
  // Планета, которая не любит ножницы (никогда их не выбирает)
  playWithoutScissors: function () {
    this.computerSelection = Math.floor(Math.random() * 2);
    this.computerSelection == 0
      ? (this.computerSelection = 'Rock')
      : (this.computerSelection = 'Paper');
    return AIState;
  },
  // Планета, которая повторяет предыдущее значение игрока
  playMimic: function (playerSelection) {
    if (this.counter === 0) {
      this.playFairOptions();
      this.nextChoice = playerSelection;
      this.counter = 1;
      return AIState;
    } else {
      this.computerSelection = this.nextChoice;
      this.nextChoice = playerSelection;
      return AIState;
    }
  },
};

// Проверка победителя
function checkWinner(playerResult, oppResult) {
  if (playerResult === 3) {
    alert('Congratulations! You Win!');
  } else if (oppResult === 3) {
    alert('You Lose');
  }
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
    AIState.algoStyle === 'Rock'
    ? AIState.playGameRock(playerSelection)
      : AIState.algoStyle === 'HateScissors'
      ? AIState.playWithoutScissors(playerSelection)
      : AIState.playMimic(playerSelection);
    showOnScreen(oppImage, AIState.computerSelection);
    showOnScreen(playerImage, playerSelection);
    playRound(AIState, playerSelection);
    checkWinner(playerResult, oppResult);
  });
});

function playRound(AIState, playerSelection) {
  console.log(AIState.computerSelection);
  console.log(playerSelection);
  switch (playerSelection) {
    case AIState.computerSelection:
      roundResultNotification = 'Dead heat!';
      break;
    case 'Rock':
      if (AIState.computerSelection == 'Scissors') {
        roundResultNotification = 'You Win! Rock beats Scissors';
        playerResult += 1;
      } else if (AIState.computerSelection == 'Paper') {
        roundResultNotification = 'You Lose! Paper beats Rock';
        oppResult += 1;
      }
      break;
    case 'Paper':
      if (AIState.computerSelection == 'Scissors') {
        roundResultNotification = 'You Lose! Scissors beats Paper';
        oppResult += 1;
      } else if (AIState.computerSelection == 'Rock') {
        roundResultNotification = 'You Win! Paper beats Rock';
        playerResult += 1;
      }
      break;
    case 'Scissors':
      if (AIState.computerSelection == 'Paper') {
        roundResultNotification = 'You Win! Scissors beats Paper';
        playerResult += 1;
      } else if (AIState.computerSelection == 'Rock') {
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
  AIState.counter = 0;
  showOnScreen(playerImage);
  showOnScreen(oppImage);
}

newGameButton.addEventListener('click', startNewGame);

showOnScreen(playerImage);
showOnScreen(oppImage);

// анимация набора текста
const textContainer = document.querySelector('.content__title');
const text = textContainer.textContent;

function animateWritting(text) {
  const textArray = text.split('');
  textContainer.textContent = textArray[0];
  for (let i = 1; i < textArray.length; i++) {
    setTimeout(() => {
      textContainer.textContent = textContainer.textContent + textArray[i];
    }, i * 100);
  }
}

animateWritting(text);

setInterval(animateWritting, 10000, text);

// Drag'n'Drop для окошка
let content = root.querySelector('.content');
function onMouseDown(event) {
  let window = event.target.closest('.content');
  window.classList.add('content_moved');

  let shiftX = event.clientX - window.getBoundingClientRect().left;
  let shiftY = event.clientY - window.getBoundingClientRect().top;

  function onMouseMove(event) {
    window.style.left = event.pageX - shiftX + 'px';
    window.style.top = event.pageY - shiftY + 'px';
  }
  function onMouseUp() {
    window.removeEventListener('mousemove', onMouseMove);
  }

  window.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

content.addEventListener('mousedown', onMouseDown);

// попытка давать консольке цвет планеты
// зависимость h в hsl и угла вращения в hue-rotate для нарисованных кнопок - модуль(h - угол)
// генерации цвета планеты
let planets = Array.from(root.querySelectorAll('.planet'));
let planetsValues = [];
let closeButton = content.querySelector('.button__close');
let planetsAlgoStyles = ['Rock', 'HateScissors', 'Mimic'];

for (let i = 0; i < planets.length; i++) {
  let color = randomBetween(0, 360);
  planetsValues.push({
    mainHslColor: color,
    filterRotate: Math.abs(color - 180) + 'deg',
    algoStyle: planetsAlgoStyles[i],
  });
}

for (let i = 0; i < planetsValues.length; i++) {
  planets[
    i
  ].style.backgroundColor = `hsl(${planetsValues[i].mainHslColor}, 50%, 50%)`;
  planets[i].addEventListener('click', openContent);
  planets[i]['planet'] = planetsValues[i];
  console.log(planets[i].planet.algoStyle);
}

function openContent(evt) {
  openPopup(content);
  AIState.algoStyle = evt.target.planet.algoStyle;
  console.log(AIState.algoStyle);
  root.style.setProperty('--color-main', evt.target.planet.mainHslColor);
  root.style.setProperty('--hue-rotate', evt.target.planet.filterRotate);
  closeButton.addEventListener('click', closeButtonHandler);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function closeButtonHandler(evt) {
  let popup = evt.target.closest('.popup');
  startNewGame();
  closePopup(popup);
  closeButton.removeEventListener('click', closeButtonHandler);
  popup.classList.remove('content_moved');
  popup.removeAttribute('style');
}
