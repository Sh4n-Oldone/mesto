// Открытие/закрытие попапа

const popUp = document.querySelector(".popup");
let popUpClasses = popUp.classList;
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");

function popUp() {
  popUpClasses.toggle("popup_opened");
};

editButton.addEventListener("click", popUp);
closeButton.addEventListener("click", popUp);

// Кнопка сохранения
const formElement = document.querySelector(".popup__form");

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
formElement.addEventListener('submit', popUpClose);
