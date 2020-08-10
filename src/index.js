// Импорты
import './pages/index.css';

import Card from './scripts/Card.js'; // класс создания карточки
import FormValidator from './scripts/FormValidator.js'; // класс валидации инпутов в форме
import { initialCards } from './scripts/initial-сards.js'; // массив исходных карточек
import { validationSelectors } from './scripts/utils.js'; // параметры для валидации
import Section from './scripts/Section.js';

import {
  page,
  popUpUser,
  popUpCard,
  popUpImg,
  editButtonUser,
  addButtonCard,
  profileName,
  profileTitle,
  cardsList,
  cardTemplate,
  formUserElement,
  formCardElement,
  saveButtonCard,
  nameInput,
  jobInput
} from './scripts/constants.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import UserInfo from './scripts/UserInfo.js';

// Сохранение объекстов из классов

const section = new Section({}, cardsList);

const popedupImage = new PopupWithImage(popUpImg);
popedupImage.setEventListeners();

const popupForProfile = new PopupWithForm(
  popUpUser,
  () => {
    new UserInfo({nameSelector: nameInput, jobSelector: jobInput}).setUserInfo(new UserInfo({nameSelector: nameInput, jobSelector: jobInput}).getUserInfo())  
  }
);
popupForProfile.setEventListeners();

const popupForCards = new PopupWithForm(
  popUpCard, 
  () => {section.addItem((new Card(popupForCards._getInputValues(), cardTemplate, {handleCardClick: popedupImage}).createCard()))}
);
popupForCards.setEventListeners();

// Ивенты

editButtonUser.addEventListener('click', () => {
  nameInput.value = profileName.textContent; // вносит в инпуты исходные значения
  jobInput.value = profileTitle.textContent;
  popupForProfile.open();
});

addButtonCard.addEventListener('click', () => {
  saveButtonCard.classList.add('popup__save-button_disabled'); // обнуляет класс кнопки
  saveButtonCard.setAttribute('disabled', true); // обнуляет состояние кнопки
  popupForCards.open();
});

// внесение в DOM карточек, создающихся из массива
initialCards.forEach(element => {
  section.addItem((new Card(element, cardTemplate, {handleCardClick: popedupImage}).createCard()));
});

page.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup-profile')) {
    popupForProfile.close();
  } else if (evt.target.classList.contains('popup-card')) {
    popupForCards.close();
  } else if (evt.target.classList.contains('popup-image')) {
    popedupImage.close();
  };
});

// Валидация форм
formUserElement.addEventListener('submit', new FormValidator(validationSelectors, formUserElement).enableValidation());
formCardElement.addEventListener('submit', new FormValidator(validationSelectors, formCardElement).enableValidation());