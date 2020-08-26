// Объявление переменных

export const page = document.querySelector('.page');
export const popUpUser = document.querySelector('.popup-profile');
export const popUpCard = document.querySelector('.popup-card');
export const popUpImg = document.querySelector('.popup-image');
export const popUpSubmit = document.querySelector('.popup-submit');
export const popUpAvatar = document.querySelector('.popup-avatar');

export const editButtonUser = document.querySelector('.profile__edit-button');
export const addButtonCard = document.querySelector('.profile__add-button');
// export const changeAvatarButton = document.querySelector('.');

export const profileName = document.querySelector('.profile__name');
export const profileTitle = document.querySelector('.profile__title');
export const profileAvatar = document.querySelector('.profile__pic');

export const cardsList = document.querySelector('.cards__list'); // список карточек

export const cardTemplate = document.querySelector('#card-template').content; // забираем скелет карточки

export const formUserElement = popUpUser.querySelector('.popup__form');
export const formCardElement = popUpCard.querySelector('.popup__form');
export const formAvatarElement = popUpAvatar.querySelector('.popup__form');

export const saveButtonCard = popUpCard.querySelector('.popup__save-button');

export const profileSaveButton = popUpUser.querySelector('.popup__save-button');

export const nameInput = popUpUser.querySelector('.popup__input_name');
export const jobInput = popUpUser.querySelector('.popup__input_title');

export const validationSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_error'
}