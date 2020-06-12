// Открытие/закрытие попапа

const popUp = document.querySelector(".popup");
let popUpClasses = popUp.classList;
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");

function popUpOpen() {
  popUpClasses.add("popup_opened");
};

editButton.addEventListener("click", popUpOpen);

function popUpClose() {
  popUpClasses.remove("popup_opened");
};

closeButton.addEventListener("click", popUpClose);

// Кнопка сохранения

// Находим форму в DOM
const formElement = document.querySelector(".popup__form");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    const nameInput = document.querySelector(".popup__input-name");// Воспользуйтесь инструментом .querySelector()
    const jobInput = document.querySelector(".popup__input-title");// Воспользуйтесь инструментом .querySelector()
    // Получите значение полей из свойства value
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const profileName = document.querySelector(".profile__name");
    const profileTitle = document.querySelector(".profile__title");
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInputValue;
    profileTitle.textContent = jobInputValue;
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', popUpClose);
