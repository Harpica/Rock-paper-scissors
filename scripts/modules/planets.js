import { randomBetween, openPopup } from './utils.js';
import { content, root, closeButton } from './constants.js';

class Planet {
  constructor(planetElement, currentState, content) {
    this._planetElement = planetElement;
    this._mainHslColor = randomBetween(0, 360);
    this._filterRotate = Math.abs(this._mainHslColor - 180) + 'deg';
    this.algoStyle;
    this.defeated = false;
    this._content = content;
    this._setStyle();
    this._setEventListeners(currentState);
  }
  _setStyle() {
    this._planetElement.style.setProperty(
      'background-color',
      `hsl(${this._mainHslColor}, 50%, 50%)`
    );
  }
  _setEventListeners(currentState) {
    this._planetElement.addEventListener('click', () => {
      this._choosePlanet(currentState);
    });
  }
  _choosePlanet(currentState) {
    root.style.setProperty('--color-main', this._mainHslColor);
    // зависимость h в hsl и угла вращения в hue-rotate для нарисованных кнопок - модуль(h - угол)
    root.style.setProperty('--hue-rotate', this._filterRotate);
    currentState.planet = this;
  }
  _playFairOptions() {
    this._computerSelection = Math.floor(Math.random() * 3);
    this._computerSelection == 0
      ? (this._computerSelection = 'Rock')
      : this._computerSelection == 1
      ? (this._computerSelection = 'Paper')
      : (this._computerSelection = 'Scissors');
    return this._computerSelection;
  }
  _changeState() {
    !this.defeated;
  }
}

// Планета, которая начинает с камня и выбирает каждый второй раз камень
export class PlanetRock extends Planet {
  constructor(planetElement, currentState, content) {
    super(planetElement, currentState, content);
    this._counter = 0;
    this.algoStyle = 'Rock';
    this._computerSelection = '';
  }
  play() {
    if (this.counter === 0) {
      this._counter = 1;
      this._computerSelection = 'Rock';
      return this._computerSelection;
    } else if (this.counter === 1) {
      this._counter = 0;
      this._playFairOptions();
      return this._computerSelection;
    }
  }
}

// Планета, которая не любит ножницы (никогда их не выбирает)
export class PlanetHateScissors extends Planet {
  constructor(planetElement, currentState, content) {
    super(planetElement, currentState, content);
    this.algoStyle = 'HateScissors';
    this._computerSelection = '';
  }
  play() {
    this._computerSelection = Math.floor(Math.random() * 2);
    this._computerSelection == 0
      ? (this._computerSelection = 'Rock')
      : (this._computerSelection = 'Paper');
    return this._computerSelection;
  }
  reload() {
    this._counter = 0;
  }
}

// Планета, которая повторяет предыдущее значение игрока
export class PlanetMimic extends Planet {
  constructor(planetElement, currentState, content) {
    super(planetElement, currentState, content);
    this._counter = 0;
    this._nextChoice = '';
    this.algoStyle = 'Mimic';
    this._computerSelection = '';
  }
  play(playerSelection) {
    if (this._counter === 0) {
      this._playFairOptions();
      this._nextChoice = playerSelection;
      this._counter = 1;
      return this._computerSelection;
    } else {
      this._computerSelection = this._nextChoice;
      this._nextChoice = playerSelection;
      return this._computerSelection;
    }
  }
  reload() {
    this._counter = 0;
  }
}
