import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector)
  }

  open(name, url) {
    super.open();

    const img = this._popupSelector.querySelector('.popup-image__image');
    const subtitle = this._popupSelector.querySelector('.popup-image__title');

    img.src = url;
    subtitle.textContent = name;
    img.alt = name;
  }
}