// Импорты

import { Card } from './Card.js'; // класс создания карточки
import { FormValidator } from './FormValidator.js'; // класс валидации инпутов в форме
import { initialCards } from './initial-сards.js'; // массив исходных карточек
import { validationSelectors } from './utils.js'; // параметры для валидации

// Объявление переменных

const page = document.querySelector('.page');
const popUpUser = document.querySelector('.popup-profile');
const popUpCard = document.querySelector('.popup-card');

const popUpImg = document.querySelector('.popup-image');

const editButtonUser = document.querySelector('.profile__edit-button');
const addButtonCard = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');

const cardsList = document.querySelector('.cards__list'); // список карточек

const cardTemplate = document.querySelector('#card-template').content; // забираем скелет карточки

const formUserElement = popUpUser.querySelector('.popup__form');
const formCardElement = popUpCard.querySelector('.popup__form');

const saveButtonCard = popUpCard.querySelector('.popup__save-button');

const nameInput = popUpUser.querySelector('.popup__input_name');
const jobInput = popUpUser.querySelector('.popup__input_title');

const closeButtonUser = popUpUser.querySelector('.popup__close-button');
const closeButtonCard = popUpCard.querySelector('.popup__close-button');
const closeButtonImg = popUpImg.querySelector('.popup__close-button');

const profileFormInputs = formUserElement.querySelectorAll('.popup__input');
const profileFormErrorElements = formUserElement.querySelectorAll('.popup__input_type_error');

const cardFormInputs = formCardElement.querySelectorAll('.popup__input');
const cardFormErrorElements = formCardElement.querySelectorAll('.popup__input_type_error');

// Функции

// открытие/закрытие поп-апов
function togglePopUp(item) {
  item.classList.toggle('popup_opened'); // (popUpUser)(popUpCard)(popUpImg) - параметры для открытия попапа редактирования профиля, карточки, изображения
}

function resetForm(errorElementsArr, inputsArr, form) {
  errorElementsArr.forEach(e => {
    e.textContent = '';
  });
  inputsArr.forEach(e => {
    e.classList.remove('popup__input_error');
  });
  form.reset();
}

// запись в профиль новых данных
function formSubmitHandler () {
  profileName.textContent = nameInput.value;
  profileTitle.textContent = jobInput.value;
}

// внесение в DOM созданной карточки
function renderCard(data) {
    cardsList.prepend(new Card(data, cardTemplate).createCard());
}

// добавляет в выбранную форму событие валидации по сабмиту
function addValidationToListener(form) {
  form.addEventListener('submit', new FormValidator(validationSelectors, form).enableValidation());
}

// Вызовы функций и ивенты

editButtonUser.addEventListener('click', () => {
  resetForm(profileFormErrorElements, profileFormInputs, formUserElement);
  nameInput.value = profileName.textContent;
  jobInput.value = profileTitle.textContent;
  togglePopUp(popUpUser);
});

formUserElement.addEventListener('submit', (evt) => { // можно разделить на два сабмита. formSubmitHandler вызывать тогда без параметров.
  evt.preventDefault();
  togglePopUp(popUpUser);
  formSubmitHandler(evt);
});

closeButtonUser.addEventListener('click', () => {
  resetForm(profileFormErrorElements, profileFormInputs, formUserElement);
  togglePopUp(popUpUser);
});

addButtonCard.addEventListener('click', () => {
  saveButtonCard.classList.add('popup__save-button_disabled'); // обнуляет класс кнопки
  saveButtonCard.setAttribute('disabled', true); // обнуляет состояние кнопки
  resetForm(cardFormErrorElements, cardFormInputs, formCardElement);
  togglePopUp(popUpCard);
});

formCardElement.addEventListener('submit', (evt) => { // можно разделить обратно на три слушателя сабмита
  evt.preventDefault();
  togglePopUp(popUpCard);
  renderCard({name: popUpCard.querySelector('.popup__input_name').value, link: popUpCard.querySelector('.popup__input_title').value});
});

closeButtonCard.addEventListener('click', () => {
  resetForm(cardFormErrorElements, cardFormInputs, formCardElement);

  togglePopUp(popUpCard);
});

closeButtonImg.addEventListener('click', () => {togglePopUp(popUpImg)});

// внесение в DOM карточек, создающихся из массива
initialCards.forEach(element => {
    renderCard(element);
});

page.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup-profile')) {
    resetForm(profileFormErrorElements, cardFormInputs, formCardElement);
    nameInput.value = profileName.textContent;
    jobInput.value = profileTitle.textContent;
    togglePopUp(popUpUser);
  };
  if (evt.target.classList.contains('popup-card')) {
    resetForm(cardFormErrorElements, cardFormInputs, formCardElement);
    togglePopUp(popUpCard);
  };
  
  if (evt.target.classList.contains('popup-image')) {
    togglePopUp(popUpImg);
  };
});

page.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    togglePopUp(document.querySelector('.popup_opened'));
  };
});

addValidationToListener(formUserElement);
addValidationToListener(formCardElement);
