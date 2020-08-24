// Класс создаёт полностью заполненный элемент карточки
// принимает имя карточки, ссылку на картинку и темплейт из которого будет её создавать

export default class Card {
  constructor({name, link, likes, owner}, template, handleCardClick, handleRemoveClick) {
    this.name = name;
    this.link = link;
    this.likes = likes;
    this.owner = owner;
    this.template = template;
    this._imgMethod = handleCardClick;
    this._handleRemoveClick = handleRemoveClick;
  }

  _likeButtonToggle(evt) {
    evt.target.classList.toggle('card__like-button_pressed');
  }

  _removeCard() {
    // evt.target.parentNode.remove(); // удаляем из дом родителя этого элемента

    this._handleRemoveClick();
  }

  _setEventListeners(item) {
    item.querySelector('.card__like-button').addEventListener('click', this._likeButtonToggle);
    item.querySelector('.card__remove-button').addEventListener('click', () => {
      this._handleRemoveClick.open();
    });
    item.querySelector('.card__image').addEventListener('click', () => {
      this._imgMethod.open(this.name, this.link);
    });
  }

  createCard() {
    const card = this.template.cloneNode(true);
    const cardImage = card.querySelector('.card__image');

    if(Array.isArray(this.likes)) {
      card.querySelector('.card__like-counter').textContent = this.likes.length;
    } else {
      card.querySelector('.card__like-counter').textContent = 0;
    }

    if(this.owner._id !== 'ed99dd7809a559eac419471a') {
      card.querySelector('.card__remove-button').classList.add('card__remove-button_hide');
    }

    card.querySelector('.card__title').textContent = this.name;
    cardImage.src = this.link;
    cardImage.alt = this.name;
    this._setEventListeners(card);
    return card;
  }

}


