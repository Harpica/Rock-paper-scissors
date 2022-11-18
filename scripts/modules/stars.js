import { randomBetween } from './utils.js';

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

class Star {
  constructor () {
    this._starElement = this._createElement();
    this._size = this._getSize() + 'px';
    this._left = `${Math.random() * 100}%`;
    this._top = `${Math.random() * 100}%`;
    this._animationDuration = `${randomBetween(
      starParam.duration.min,
      starParam.duration.max
    )}s`;
  }
  _getSize () {
    if (Math.random() === 0) {
      return starParam.size.giant;
    } else {
      return randomBetween(starParam.size.min, starParam.size.max);
    }
  }
  _createElement () {
    return this._starElement = document.createElement('div');
  }
  _setAttributes () {
    this._starElement.setAttribute('class', 'star');
    this._starElement.style.setProperty('width', this._size);
    this._starElement.style.setProperty('height', this._size);
    this._starElement.style.setProperty('left', this._left);
    this._starElement.style.setProperty('top', this._top);
    this._starElement.style.setProperty('animation-duration', this._animationDuration);
  }
  getElement() {
    this._setAttributes();
    return this._starElement
  }
}


export function generateStars(parentElement, amount = starParam.amount) {
  for (let i = 0; i < amount; i++) {
    const star = new Star();
    parentElement.append(star.getElement());
  }
}
