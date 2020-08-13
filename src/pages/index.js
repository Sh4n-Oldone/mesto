// Импорты
import './index.css';

import Card from '../components/Card.js'; // класс создания карточки
import FormValidator from '../components/FormValidator.js'; // класс валидации инпутов в форме
import { initialCards } from '../utils/initial-сards.js'; // массив исходных карточек
import Section from '../components/Section.js';

import {
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
  jobInput,
  validationSelectors
} from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// Сохранение объекстов из классов

const popupWithImage = new PopupWithImage(popUpImg);
popupWithImage.setEventListeners();

const section = new Section({
  items: initialCards,
  renderer: function renderIt(item) {
    this.addItem(new Card(item, cardTemplate, popupWithImage).createCard())}
}, cardsList);
section.render();
console.log('Это section: ' + section);

const user = new UserInfo({nameSelector: nameInput, jobSelector: jobInput});

const popupForProfile = new PopupWithForm(
  popUpUser,
  () => {new user.setUserInfo(user.getUserInfo())}
);
popupForProfile.setEventListeners();

const popupForCards = new PopupWithForm(
  popUpCard, 
  (data) => {
    section.addItem(new Card(data, cardTemplate, popupWithImage).createCard())
  }
);

popupForCards.setEventListeners();

console.log('Это popupForCards: ' + popupForCards);
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

// Валидация форм

formUserElement.addEventListener('submit', new FormValidator(validationSelectors, formUserElement).enableValidation());
formCardElement.addEventListener('submit', new FormValidator(validationSelectors, formCardElement).enableValidation());