// Импорты

import { Card } from './Card.js'; // класс создания карточки
import { FormValidator } from './FormValidator.js'; // класс валидации инпутов в форме
import { initialCards } from './initial-сards.js'; // массив исходных карточек
import { validationSelectors } from './utils.js'; // параметры для валидации
import Section from './Section.js';

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
  jobInput,
  closeButtonUser,
  closeButtonCard,
  closeButtonImg,
  profileFormInputs,
  profileFormErrorElements,
  cardFormInputs,
  cardFormErrorElements
} from './constants.js';
import PopupWithImage from './PopupWithImage.js';


const popedupImage = new PopupWithImage(popUpImg);
popedupImage.setEventListeners();
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

formCardElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  togglePopUp(popUpCard);
  new Section({}, cardsList)
  .addItem((new Card({
    name: popUpCard.querySelector('.popup__input_name').value,
    link: popUpCard.querySelector('.popup__input_title').value
  }, cardTemplate, {handleCardClick: popedupImage}).createCard()));
});

closeButtonCard.addEventListener('click', () => {
  resetForm(cardFormErrorElements, cardFormInputs, formCardElement);

  togglePopUp(popUpCard);
});

// внесение в DOM карточек, создающихся из массива
initialCards.forEach(element => {
    new Section({}, cardsList)
    .addItem((new Card(element, cardTemplate, {handleCardClick: popedupImage}).createCard()));
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

// Валидация форм
formUserElement.addEventListener('submit', new FormValidator(validationSelectors, formUserElement).enableValidation());
formCardElement.addEventListener('submit', new FormValidator(validationSelectors, formCardElement).enableValidation());
