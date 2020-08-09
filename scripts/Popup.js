export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
  }

  _handleEscClose() {
    document.querySelector('.page').addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      };
    })
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close-button').addEventListener('click', () => {this.close()});
    this._handleEscClose();
  }

}