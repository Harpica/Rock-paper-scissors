export const svgSelections = {
  rock: './images/rock.svg',
  paper: './images/paper.svg',
  scissors: './images/scissors.svg',
  none: './images/question.svg',
};

// объект, содержащий глобальную информацию об игре
export const currentState = {
  planet: null,
  numberOfVictories: 0,
};

export const root = document.querySelector('.root');
export let content = root.querySelector('.content');
export let closeButton = content.querySelector('.button__close');

// переменные для анимации набора текста
export const textContainer = document.querySelector('.content__title');
export const text = textContainer.textContent;
