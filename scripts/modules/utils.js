export function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function capitalize(someString) {
  return (someString =
    someString[0].toUpperCase() + someString.slice(1).toLowerCase());
}

export function animateWritting(text, textContainer) {
  const textArray = text.split('');
  textContainer.textContent = textArray[0];
  for (let i = 1; i < textArray.length; i++) {
    setTimeout(() => {
      textContainer.textContent = textContainer.textContent + textArray[i];
    }, i * 100);
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEsc);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEsc);
}

// Закрывает попапы по клику на Esc
export function closePopupWithEsc(evt) {
  console.log(evt.key);
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// Drag'n'Drop для окошка
export function dragOnMouseDown(event) {
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
    document.removeEventListener('mouseup', onMouseUp);
  }

  window.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}
