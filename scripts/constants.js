// Объявление переменных

export const page = document.querySelector('.page');
export const popUpUser = document.querySelector('.popup-profile');
export const popUpCard = document.querySelector('.popup-card');

export const popUpImg = document.querySelector('.popup-image');

export const editButtonUser = document.querySelector('.profile__edit-button');
export const addButtonCard = document.querySelector('.profile__add-button');

export const profileName = document.querySelector('.profile__name');
export const profileTitle = document.querySelector('.profile__title');

export const cardsList = document.querySelector('.cards__list'); // список карточек

export const cardTemplate = document.querySelector('#card-template').content; // забираем скелет карточки

export const formUserElement = popUpUser.querySelector('.popup__form');
export const formCardElement = popUpCard.querySelector('.popup__form');

export const saveButtonCard = popUpCard.querySelector('.popup__save-button');

export const nameInput = popUpUser.querySelector('.popup__input_name');
export const jobInput = popUpUser.querySelector('.popup__input_title');
