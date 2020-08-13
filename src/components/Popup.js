export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    this._handleEscClose();
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    this._removeEscListener();
  }

  _handleEscClose() {
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      };
    })
  }

  _removeEscListener() {
    document.removeEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      };
    })
  }

  setEventListeners() {
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup_opened')) {
        this.close();
      };
    });
  }

}