// Поп-ап профиля

const popUpUser = document.querySelector(".popup");
const editButtonUser = document.querySelector(".profile__edit-button");
const closeButtonUser = popUpUser.querySelector(".popup__close-button");

function profilePopUp() {
  popUpUser.classList.toggle("popup_opened");
};

editButtonUser.addEventListener("click", profilePopUp);
closeButtonUser.addEventListener("click", profilePopUp);

// Кнопка сохранения
const formUserElement = popUpUser.querySelector(".popup__form");
// обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault();
    const nameInput = popUpUser.querySelector(".popup__input-name");
    const jobInput = popUpUser.querySelector(".popup__input-title");
    
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    
    const profileName = document.querySelector(".profile__name");
    const profileTitle = document.querySelector(".profile__title");
    
    profileName.textContent = nameInputValue;
    profileTitle.textContent = jobInputValue;
};

formUserElement.addEventListener('submit', formSubmitHandler);
formUserElement.addEventListener('submit', profilePopUp);


// Добавление первых шести карточек

const cardsList = document.querySelector(".cards__list"); // записываем в переменную список карточек
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

const initialCardsNames = initialCards.map(item => item.name); // достаём массив имён из массива объектов исходных карточек
const initialCardsLinks = initialCards.map(item => item.link); // достаём оттуда же ссылки

// функция переключения отображения лайка
function likeButtonToggle(item) {
    item.querySelector(".card__like-button").addEventListener("click", function (evt) {
        const likeButtonEvent = evt.target;
        likeButtonEvent.classList.toggle("card__like-button_pressed");
    });
};

// функция создания карточек из массива
function appendCardList(names, links) {
    for (let i = 0; i < initialCards.length; i++) { // счётчик относительно длины массива карточек
        const cardTemplate = document.querySelector("#card__template").content; // забираем скелет карточки
        const card = cardTemplate.cloneNode(true); // клонируем скелет карточки. Эти переменные внутри цикла потому что нам нужно создавать каждый раз новую карточку

        card.querySelector('.card__title').textContent = names[i]; // ищем элемент в карточке и в его текстовое поле заносим  i по счёту элемент от переданного массива
        card.querySelector('.card__image').src = links[i]; // ещё раз, только не текст, а в ссылку элемента

        likeButtonToggle(card);

        cardsList.append(card); //  закидываем карточку в DOM, в конец грида
  };
};
appendCardList(initialCardsNames, initialCardsLinks); // вызываем функцию и отдаём ей два массива

// Работа с поп-апом для добавления карточек

// Скрыть/отобразить поп-ап
const popUpCard = document.querySelectorAll(".popup")[1]; // запись в переменную второго элемента из псевдомассива объектов с классом .popup
const addButtonCard = document.querySelector(".profile__add-button");
const closeButtonCard = popUpCard.querySelector(".popup__close-button");

function cardExpandPopUp() {
    popUpCard.classList.toggle("popup_opened");
};

// Добавление карточки
function addNewCard(evt) {
    evt.preventDefault(); // отключает обновление страницы после выполнения функции
    const cardTemplate = document.querySelector("#card__template").content;
    const card = cardTemplate.cloneNode(true);

    const newCardName = popUpCard.querySelector(".popup__input-name");
    const newCardLink = popUpCard.querySelector(".popup__input-title");
    
    let newCardNameValue = newCardName.value;
    let newCardLinkValue = newCardLink.value;

    card.querySelector('.card__title').textContent = newCardNameValue; // записывает значение из инпута в имя картчоки
    card.querySelector('.card__image').src = newCardLinkValue; // записывает из инпута ссылку карточки

    likeButtonToggle(card);

    cardsList.prepend(card);
}

const formCardElement = popUpCard.querySelector(".popup__form");

addButtonCard.addEventListener("click", cardExpandPopUp);
formCardElement.addEventListener("submit", addNewCard);
formCardElement.addEventListener("submit", cardExpandPopUp);
closeButtonCard.addEventListener("click", cardExpandPopUp);

// Удаление карточки

