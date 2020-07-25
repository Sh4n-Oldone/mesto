// Импорты

import { Card } from './Card.js'; // класс создания карточки
import { FormValidator } from './FormValidator.js'; // класс валидации инпутов в форме
import { initialCards } from './initial-сards.js'; // массив исходных карточек
import { validationSelectors } from './utils.js'; // параметры для валидации

// Объявление переменных

const page = document.querySelector('.page');
const pageContainer = document.querySelector('.page__container');
const popUpUser = document.querySelector('.popup-profile');
const popUpCard = document.querySelector('.popup-card');

const popUpImg = document.querySelector('.popup-image');
const popUpImgImage = document.querySelector('.popup-image__image');// выбираем картинку поп-апа
const popUpImgTitle = document.querySelector('.popup-image__title');

const editButtonUser = document.querySelector('.profile__edit-button');
const addButtonCard = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');

const cardsList = document.querySelector('.cards__list'); // список карточек

const cardTemplate = document.querySelector('#card-template').content; // забираем скелет карточки

const formUserElement = popUpUser.querySelector('.popup__form');
const formCardElement = popUpCard.querySelector('.popup__form');

const closeButtonUser = popUpUser.querySelector('.popup__close-button');
const closeButtonCard = popUpCard.querySelector('.popup__close-button');
const closeButtonImg = popUpImg.querySelector('.popup__close-button');
const cardFormInputs = formCardElement.querySelectorAll('.popup__input');
const cardFormErrorElements = formCardElement.querySelectorAll('.popup__input_type_error');

export { popUpImg, popUpImgImage, popUpImgTitle };

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
  const nameInput = popUpUser.querySelector('.popup__input_name');
  const jobInput = popUpUser.querySelector('.popup__input_title');
  
  profileName.textContent = nameInput.value;
  profileTitle.textContent = jobInput.value;
}

// внесение в DOM созданной карточки
function renderCard(name, link) {
    cardsList.prepend(new Card(name, link, cardTemplate).createCard());
}

// добавляет в выбранную форму событие валидации по сабмиту
function addValidationToListener(form) {
  form.addEventListener('submit', new FormValidator(validationSelectors, form).enableValidation());
}

// Вызовы функций и ивенты

editButtonUser.addEventListener('click', () => {
  togglePopUp(popUpUser);
});
formUserElement.addEventListener('submit', (evt) => { // можно разделить на два сабмита. formSubmitHandler вызывать тогда без параметров.
  evt.preventDefault();
  togglePopUp(popUpUser);
  formSubmitHandler(evt);
});
closeButtonUser.addEventListener('click', () => {togglePopUp(popUpUser)});

addButtonCard.addEventListener('click', () => {
  popUpCard.querySelector('.popup__save-button').classList.add('popup__save-button_disabled'); // обнуляет класс кнопки
  popUpCard.querySelector('.popup__save-button').setAttribute('disabled', true); // обнуляет состояние кнопки
  togglePopUp(popUpCard);
});
formCardElement.addEventListener('submit', (evt) => { // можно разделить обратно на три слушателя сабмита
  evt.preventDefault();
  togglePopUp(popUpCard);
  renderCard(popUpCard.querySelector('.popup__input_name').value, popUpCard.querySelector('.popup__input_title').value);
  formCardElement.reset(); // ресетит инпуты поп-апа
});
closeButtonCard.addEventListener('click', () => {
  resetForm(cardFormErrorElements, cardFormInputs, formCardElement);;
  togglePopUp(popUpCard);
});

closeButtonImg.addEventListener('click', () => {togglePopUp(popUpImg)});

// внесение в DOM карточек, создающихся из массива
initialCards.forEach(element => {
    renderCard(element.name, element.link);
});

pageContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup-profile')) {
    togglePopUp(popUpUser);
  };
  if (evt.target.classList.contains('popup-card')) {
    resetForm(cardFormErrorElements, cardFormInputs, formCardElement);;
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
