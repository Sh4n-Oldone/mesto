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
formElement.addEventListener('submit', popUpClose);
