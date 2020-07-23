// Объявление переменных

const page = document.querySelector('.page');
const pageContainer = document.querySelector('.page__container');
const popUpUser = document.querySelector(".popup-profile");
const popUpCard = document.querySelector(".popup-card");
const popUpImg = document.querySelector(".popup-image");

const editButtonUser = document.querySelector(".profile__edit-button");
const addButtonCard = document.querySelector(".profile__add-button");

const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");

const cardsList = document.querySelector(".cards__list"); // список карточек

const cardTemplate = document.querySelector("#card-template").content; // забираем скелет карточки

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
    
];

const formUserElement = popUpUser.querySelector(".popup__form");
const formCardElement = popUpCard.querySelector(".popup__form");

const closeButtonUser = popUpUser.querySelector(".popup__close-button");
const closeButtonCard = popUpCard.querySelector(".popup__close-button");
const closeButtonImg = popUpImg.querySelector(".popup__close-button");

// Импорты

import { Card } from './Card.js';

import { FormValidator } from './FormValidator.js';

// Функции

// открытие/закрытие поп-апов
function popUp(item) {
    item.classList.toggle("popup_opened"); // (popUpUser)(popUpCard)(popUpImg) - параметры для открытия попапа редактирования профиля, карточки, изображения
}

// запись в профиль новых данных
function formSubmitHandler () {
    const nameInput = popUpUser.querySelector(".popup__input_name");
    const jobInput = popUpUser.querySelector(".popup__input_title");
    
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    
    profileName.textContent = nameInputValue;
    profileTitle.textContent = jobInputValue;
}

// внесение в DOM созданной карточки
function renderCard(name, link) {
    cardsList.prepend(new Card(name, link, cardTemplate).createCard());
}

// добавляет в выбранную форму событие валидации по сабмиту
function addValidationToListener(form) {
  form.addEventListener('submit', new FormValidator({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_error'
  }, form).enableValidation());
}

// Вызовы функций и ивенты

editButtonUser.addEventListener("click", () => {
    popUp(popUpUser);
});
formUserElement.addEventListener("submit", (evt) => { // можно разделить на два сабмита. formSubmitHandler вызывать тогда без параметров.
    evt.preventDefault();
    popUp(popUpUser);
    formSubmitHandler(evt);
});
closeButtonUser.addEventListener("click", () => {popUp(popUpUser)});

addButtonCard.addEventListener("click", () => {
    popUpCard.querySelector('.popup__save-button').classList.add('popup__save-button_disabled'); // обнуляет класс кнопки
    popUpCard.querySelector('.popup__save-button').setAttribute('disabled', true); // обнуляет состояние кнопки
    popUp(popUpCard);
});
formCardElement.addEventListener("submit", (evt) => { // можно разделить обратно на три слушателя сабмита
    evt.preventDefault();
    popUp(popUpCard);
    renderCard(popUpCard.querySelector(".popup__input_name").value, popUpCard.querySelector(".popup__input_title").value);
    formCardElement.reset(); // ресетит инпуты поп-апа
});
closeButtonCard.addEventListener("click", () => {popUp(popUpCard)});

closeButtonImg.addEventListener("click", () => {popUp(popUpImg)});

// внесение в DOM карточек, создающихся из массива
initialCards.forEach(element => {
    renderCard(element.name, element.link);
});

pageContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup-profile')) {
        popUp(popUpUser);
    };

    if (evt.target.classList.contains('popup-card')) {
        popUp(popUpCard);
    };
    
    if (evt.target.classList.contains('popup-image')) {
        popUp(popUpImg);
    };
});

page.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        popUp(document.querySelector('.popup_opened'));
    };
});

addValidationToListener(formUserElement);
addValidationToListener(formCardElement);
