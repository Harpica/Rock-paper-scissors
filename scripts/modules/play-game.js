import { content, root, svgSelections, currentState, closeButton, interval} from './constants.js';
import { closePopup, openPopup } from './utils.js';


export const counterPlayer = content.querySelector('.counter__you');
export const counterOpp = content.querySelector('.counter__opp');

export const playerImage = content.querySelector('.player-image');
export const oppImage = content.querySelector('.opponent-image');

export let playerResult = 0;
export let oppResult = 0;

export let roundResultNotification = '';


export function openContent() {
  openPopup(content);
  // показывает дефолтные изображения "?" на экранчиках
  showOnScreen(playerImage);
  showOnScreen(oppImage);
  closeButton.addEventListener('click', closeButtonHandler);
}

export function closeButtonHandler(evt) {
  let popup = evt.target.closest('.popup');
  startNewGame();
  closePopup(popup);
  closeButton.removeEventListener('click', closeButtonHandler);
  popup.classList.remove('content_moved');
  popup.removeAttribute('style');
  clearInterval(interval);
}

export function startNewGame() {
  counterPlayer.textContent = 0;
  counterOpp.textContent = 0;
  playerResult = 0;
  oppResult = 0;
  if (currentState.planet.reload) {
    currentState.planet.reload();
  }
  showOnScreen(playerImage);
  showOnScreen(oppImage);
}

// Высветить выбранное оружие на экране
export function showOnScreen(screen, selection) {
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

// Один раунд игры
export function playRound(computerSelection, playerSelection) {
  switch (playerSelection) {
    case computerSelection:
      roundResultNotification = 'Dead heat!';
      break;
    case 'Rock':
      if (computerSelection == 'Scissors') {
        roundResultNotification = 'You Win! Rock beats Scissors';
        playerResult += 1;
      } else if (computerSelection == 'Paper') {
        roundResultNotification = 'You Lose! Paper beats Rock';
        oppResult += 1;
      }
      break;
    case 'Paper':
      if (computerSelection == 'Scissors') {
        roundResultNotification = 'You Lose! Scissors beats Paper';
        oppResult += 1;
      } else if (computerSelection == 'Rock') {
        roundResultNotification = 'You Win! Paper beats Rock';
        playerResult += 1;
      }
      break;
    case 'Scissors':
      if (computerSelection == 'Paper') {
        roundResultNotification = 'You Win! Scissors beats Paper';
        playerResult += 1;
      } else if (computerSelection == 'Rock') {
        roundResultNotification = 'You Lose! Rock beats Scissors';
        oppResult += 1;
      }
      break;
  }
  counterPlayer.textContent = playerResult;
  counterOpp.textContent = oppResult;
  return playerResult, oppResult;
}

// Проверка победителя
export function checkWinner(playerResult, oppResult) {
  if (playerResult === 3) {
    alert('Congratulations! You Win!');
  } else if (oppResult === 3) {
    alert('You Lose');
  }
}
