// Открытие/закрытие попапа

const popUp = document.querySelector(".popup");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");

function popUpUse() {
  popUp.classList.toggle("popup_opened");
};

editButton.addEventListener("click", popUpUse);
closeButton.addEventListener("click", popUpUse);

// Кнопка сохранения
const formElement = document.querySelector(".popup__form");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault();
    const nameInput = document.querySelector(".popup__input-name");
    const jobInput = document.querySelector(".popup__input-title");
    
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    
    const profileName = document.querySelector(".profile__name");
    const profileTitle = document.querySelector(".profile__title");
    
    profileName.textContent = nameInputValue;
    profileTitle.textContent = jobInputValue;
};

formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', popUpUse);

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

function appendCardList(names, links) {
    for (let i = 0; i < initialCards.length; i++) { // счётчик относительно длины массива карточек
        const cardTemplate = document.querySelector("#card__template").content; // забираем скелет карточки
        const card = cardTemplate.cloneNode(true); // клонируем скелет карточки. Эти переменные внутри цикла потому что нам нужно создавать каждый раз новую карточку
        card.querySelector('.card__title').textContent = names[i]; // ищем элемент в карточке и в его текстовое поле заносим  i по счёту элемент от переданного массива
        card.querySelector('.card__image').src = links[i]; // ещё раз, только не текст, а в ссылку элемента
        cardsList.append(card); //  закидываем карточку в DOM, в конец грида
  };
};
appendCardList(initialCardsNames, initialCardsLinks); // вызываем функцию и отдаём ей два массива
