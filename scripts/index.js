// Объявление переменных

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

// Функции

// открытие/закрытие поп-апов
function popUp(item) {
    item.classList.toggle("popup_opened"); // (popUpUser)(popUpCard)(popUpImg) - параметры для открытия попапа редактирования профиля, карточки, изображения
};

// переключатель стилей кнопки лайка
function likeButtonToggle(item) {
    item.querySelector(".card__like-button").addEventListener("click", function (evt) {
        const likeButtonEvent = evt.target;
        likeButtonEvent.classList.toggle("card__like-button_pressed");
    });
};

// удаление карточки
function removeCard(item) {
    item.querySelector(".card__remove-button").addEventListener("click", function(evt) { // слушаем клик конкретной кнопки из всех с нужным классом
        const removeButtonTarget = evt.target; // записываем в переменную кликнутый объект
        removeButtonTarget.parentNode.remove(); // удаляем из дом родителя этого элемента
    });
};

// открытие картинки как поп-апа
function imgOpenPopUp(item) {
    item.querySelector(".card__image").addEventListener("click", function(evt) { // слушаем клик конкретной кнопки из всех с нужным классом
        popUp(popUpImg); // открываем поп-ап
        const imgTarget = evt.target;  // записываем в переменную кликнутый объект
        const cardTextTarget = imgTarget.nextElementSibling.querySelector(".card__title").textContent; // текст карточки через соседа, в котором ищем объект

        document.querySelector(".popup-image__image").src = imgTarget.src; // передаём  картинку в поп-ап
        document.querySelector(".popup-image__image").alt = cardTextTarget; // передаём текст в альт
        document.querySelector(".popup-image__title").textContent = cardTextTarget; // передаём этот же текст в параграф
    });
};

// запись в профиль новых данных
function formSubmitHandler (evt) {
    evt.preventDefault();
    const nameInput = popUpUser.querySelector(".popup__input-name");
    const jobInput = popUpUser.querySelector(".popup__input-title");
    
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    
    profileName.textContent = nameInputValue;
    profileTitle.textContent = jobInputValue;
};

// функция, обнуляющая поведение браузера
// (используется для сабмита чтобы страница не обновлялась)
function prevent(evt) {
    evt.preventDefault();
};

// создание шаблона карточек
// принимает название и ссылку
function createCard(name, link) {
    const card = cardTemplate.cloneNode(true);
    card.querySelector(".card__title").textContent = name;
    card.querySelector(".card__image").src = link;
    likeButtonToggle(card);
    removeCard(card);
    imgOpenPopUp(card);
    return card;
};

// внесение в DOM созданной карточки
function addCard(name, link) {
    cardsList.prepend(createCard(name, link));
};

// внесение в DOM карточек, создающихся из массива
function appendCardList() {
    initialCards.forEach(element => {
        addCard(element.name, element.link);
    });
}

// Вызовы функций и ивенты

editButtonUser.addEventListener("click", () => {popUp(popUpUser)});
closeButtonUser.addEventListener("click", () => {popUp(popUpUser)});
formUserElement.addEventListener("submit", () => {popUp(popUpUser)});

addButtonCard.addEventListener("click", () => {popUp(popUpCard)});
formCardElement.addEventListener("submit", () => {popUp(popUpCard)});
closeButtonCard.addEventListener("click", () => {popUp(popUpCard)});

appendCardList();

formCardElement.addEventListener("submit", () => {addCard(popUpCard.querySelector(".popup__input-name").value, popUpCard.querySelector(".popup__input-title").value)});
formCardElement.addEventListener("submit", prevent);
formUserElement.addEventListener("submit", formSubmitHandler);

closeButtonImg.addEventListener("click", () => {popUp(popUpImg)});
