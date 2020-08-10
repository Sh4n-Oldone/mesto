import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitDoSomething) {
    super(popupSelector);
    this._submitDoSomething = submitDoSomething;
  }

  _getInputValues() {
    return {
      name: this._popupSelector.querySelector('.popup__input_name').value, 
      link: this._popupSelector.querySelector('.popup__input_title').value}
  }

  setEventListeners() {
    this._handleEscClose();
    this._popupSelector.querySelector('.popup__close-button').addEventListener('click', () => {this.close()});

    this._popupSelector.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitDoSomething();
      this.close();
    });
  }

  close() {
    this._popupSelector.querySelectorAll('.popup__input_type_error').forEach(e => {
      e.textContent = '';
    });
    this._popupSelector.querySelectorAll('.popup__input').forEach(e => {
      e.classList.remove('popup__input_error');
    });

    this._popupSelector.querySelector('.popup__form').reset();

    this._popupSelector.classList.remove('popup_opened');
  }
}
