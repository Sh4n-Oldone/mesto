import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup{
  constructor(popupSelector, submitDoSomething) {
    super(popupSelector)
    this._submitDoSomething = submitDoSomething;
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._popupSelector.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitDoSomething();
      this.close();
    });
  }
}