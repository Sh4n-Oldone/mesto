import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitDoSomething) {
    super(popupSelector);
    this._submitDoSomething = submitDoSomething;
  }

  _getInputValues() {
    const inputs = this._popupSelector.querySelectorAll('.popup__input');
    this.obj = {};
    inputs.forEach(input => {
      this.obj[input.name] = input.value;
    });
    console.log(this.obj);
    return this.obj;

    // return {
    //   name: this._popupSelector.querySelector('.popup__input_name').value, 
    //   link: this._popupSelector.querySelector('.popup__input_title').value}
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._popupSelector.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitDoSomething(this._getInputValues());
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

    super.close();
  }
}
