// Класс создаёт полностью заполненный элемент карточки
// принимает имя карточки, ссылку на картинку и темплейт из которого будет её создавать

export default class Card {
  constructor({name, link, likes, owner, _id}, template, handleCardClick, handleRemoveClick, handleLikeClick) {
    this.name = name;
    this.link = link;
    this.likes = likes;
    this.owner = owner;
    this._id = _id;
    this.template = template;
    this._handleCardClick = handleCardClick;
    this._handleRemoveClick = handleRemoveClick;
    this._handleLikeClick = handleLikeClick;
  }

  _likeButtonToggle(evt) {
    evt.target.classList.toggle('card__like-button_pressed');
  }

  _removeCard(evt) {
    evt.target.parentNode.remove(); // удаляем из дом родителя этого элемента
  }

  _setEventListeners(item) {
    // слушатель клика на лайк
    item.querySelector('.card__like-button').addEventListener('click', (evt) => {
      
      this._handleLikeClick(this.likes, this._id, evt.target);
      this._likeButtonToggle(evt);
            

    });

    // слушатель клика на кнопку удаления карточки
    item.querySelector('.card__remove-button').addEventListener('click', () => {
      
      this._handleRemoveClick.open(this._id);
      // this._removeCard(evt);
      
    });

    // слушатель клика на изображение карточки
    item.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick.open(this.name, this.link);
    });
  }

  createCard() {
    const card = this.template.cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    
    card.querySelector('.card__like-counter').textContent = this.likes.length;

    if(this.likes.find(item => item._id === 'ed99dd7809a559eac419471a')) {
      card.querySelector('.card__like-button').classList.add('card__like-button_pressed')
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
