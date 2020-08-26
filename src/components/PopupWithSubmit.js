import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup{
  constructor(popupSelector, submitDoSomething) {
    super(popupSelector)
    this._submitDoSomething = submitDoSomething;
  }

  open(callback) {
    this.callback = callback;
    this._popupSelector.classList.add('popup_opened');
    this._handleEscClose();
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._popupSelector.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitDoSomething(this.callback);
      this.close();
    });
  }
}