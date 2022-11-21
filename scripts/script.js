import {
  content,
  root,
  svgSelections,
  currentState,
  text,
  textContainer,
  interval,
  setTimerId,
} from './modules/constants.js';
import { generateStars } from './modules/stars.js';
import {
  randomBetween,
  animateWritting,
  openPopup,
  dragOnMouseDown,
} from './modules/utils.js';
import {
  startNewGame,
  showOnScreen,
  playerImage,
  oppImage,
  counterOpp,
  counterPlayer,
  playRound,
  checkWinner,
  roundResultNotification,
  playerResult,
  oppResult,
  openContent,
} from './modules/play-game.js';
import {
  PlanetRock,
  PlanetHateScissors,
  PlanetMimic,
} from './modules/planets.js';

// генерация звездочек на фон
generateStars(root);

// поиск элементов планет, нажатие на планету начинает игру
const planetElements = Array.from(root.querySelectorAll('.planet'));
planetElements.forEach((planet) => {
  planet.addEventListener('click', () => {
    openContent();
    // анимация набора текста
    animateWritting(text, textContainer);
    setTimerId(setInterval(animateWritting, 10000, text, textContainer));
  });
});
const planets = {};
planets.rock = new PlanetRock(planetElements[0], currentState, content);
planets.hateScissors = new PlanetHateScissors(
  planetElements[1],
  currentState,
  content
);
planets.mimic = new PlanetMimic(planetElements[2], currentState, content);

// кнопки, запускающие игру
const playButtons = Array.from(document.querySelectorAll('.button__play'));
playButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    let playerSelection = event.target.value;
    let computerSelection = currentState.planet.play(playerSelection);
    console.log(computerSelection);

    showOnScreen(oppImage, computerSelection);
    showOnScreen(playerImage, playerSelection);
    playRound(computerSelection, playerSelection);
    checkWinner(playerResult, oppResult);
  });
});

// новая игра
const newGameButton = document.querySelector('.button__new-game');
newGameButton.addEventListener('click', startNewGame);

// Drag'n'Drop для окошка
content.addEventListener('mousedown', dragOnMouseDown);
