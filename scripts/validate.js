// Объявление функций

// функция проверяет инпут на
// 1. ненулевую строку, 2. на соответствие типу данных, 3. на минимальную длину
function checkInputValidity(input) {
    if (input.validity.valueMissing) {
      return input.validationMessage;
    };

    if (input.validity.typeMismatch) {
      return input.validationMessage;
    };

    if (input.validity.tooShort) {
      return input.validationMessage;
    };
}

function showInputError(input, inputErrorClass, errorMessage) {
    input.classList.add(inputErrorClass);
    input.previousElementSibling.textContent = errorMessage;
}

function hideInputError(input, inputErrorClass) {
    input.classList.remove(inputErrorClass);
    input.previousElementSibling.textContent = '';
}

// функция переключателя активности кнопки по валидности её формы
function toggleButtonState(form, submitButtonSelector, inactiveButtonClass) {
  const submitButton = form.querySelector(submitButtonSelector);

  if (!form.checkValidity()) {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add(inactiveButtonClass);
  } else {
    submitButton.removeAttribute('disabled', true);
    submitButton.classList.remove(inactiveButtonClass);
  };
}

function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass}) {
  const forms = document.querySelectorAll(formSelector); // Берём все формы...

  forms.forEach((form) => { // ... для каждой из них ...
    form.addEventListener('input', () => { // ... добавляем слушатель ввода, который ...
      const inputs = form.querySelectorAll(inputSelector); // ... берёт все инпуты формы ...

      inputs.forEach((input) => { // ... для каждого из которых ... 
        if (input.validity.valueMissing && input.validity.typeMismatch && input.validity.tooShort) { // проверяет валидность параметров
          showInputError(input, inputErrorClass, checkInputValidity(input));
        } else {
          hideInputError(input, inputErrorClass);
        };
      });

      toggleButtonState(form, submitButtonSelector, inactiveButtonClass); // И отдельный переключатель активности сабмита
    });
  });
}

// Вызовы функций и ивенты

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_error',
  // errorClass: 'popup__error_visible'
});