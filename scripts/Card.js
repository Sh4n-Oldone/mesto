import { popUpImg, popUpImgImage, popUpImgTitle } from './index.js';

// Класс создаёт полностью заполненный элемент карточки
// принимает имя карточки, ссылку на картинку и темплейт из которого будет её создавать

class Card {
  constructor(name, link, template) {
    this.name = name;
    this.link = link;
    this.template = template;
  }

  _likeButtonToggle(evt) {
    evt.target.classList.toggle('card__like-button_pressed');
  }

  _removeCard(evt) {
    evt.target.parentNode.remove(); // удаляем из дом родителя этого элемента
  }

  _imgOpenPopUp(evt) {
    popUpImg.classList.toggle('popup_opened');

    const imgTarget = evt.target;  // записываем в переменную кликнутый объект
    const cardTextTarget = imgTarget.nextElementSibling.querySelector('.card__title').textContent; // текст карточки через соседа, в котором ищем объект

    popUpImgImage.src = imgTarget.src; // передаём  картинку в поп-ап
    popUpImgImage.alt = cardTextTarget; // передаём текст в альт
    popUpImgTitle.textContent = cardTextTarget; // передаём этот же текст в параграф
  }

  _setEventListeners(item) {
    item.querySelector('.card__like-button').addEventListener('click', this._likeButtonToggle);
    item.querySelector('.card__remove-button').addEventListener('click', this._removeCard);
    item.querySelector('.card__image').addEventListener('click', this._imgOpenPopUp);
  }

  createCard() {
    const card = this.template.cloneNode(true);
    const cardImage = card.querySelector('.card__image');

    card.querySelector('.card__title').textContent = this.name;
    cardImage.src = this.link;
    cardImage.alt = this.name;
    this._setEventListeners(card);
    return card;
  }
}

export { Card };