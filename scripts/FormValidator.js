class FormValidator {
  constructor({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass}, form) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._form = form;
  }

  // функция проверяет инпут на
  // 1. ненулевую строку, 2. на соответствие типу данных, 3. на минимальную длину
  _checkInputValidity(input) {
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

  _showInputError(input, errorMessage) {
    input.classList.add(this._inputErrorClass);
    input.previousElementSibling.textContent = errorMessage;
  }

  _hideInputError(input) {
    input.classList.remove(this._inputErrorClass);
    input.previousElementSibling.textContent = '';
  }

  // функция переключателя активности кнопки по валидности её формы
  _toggleButtonState(input) {
    const submitButton = this._form.querySelector(this._submitButtonSelector);

    if (!this._form.checkValidity(input)) {
      submitButton.setAttribute('disabled', true);
      submitButton.classList.add(this._inactiveButtonClass);
    } else {
      submitButton.removeAttribute('disabled', true);
      submitButton.classList.remove(this._inactiveButtonClass);
    };
  }

  enableValidation() {
    const forms = document.querySelectorAll(this._formSelector); // Берём все формы...
  
    forms.forEach((form) => { // ... для каждой из них ...
      form.addEventListener('input', () => { // ... добавляем слушатель ввода, который ...
        const inputs = form.querySelectorAll(this._inputSelector); // ... берёт все инпуты формы ...
  
        inputs.forEach((input) => { // ... для каждого из которых ... 
          if (this._checkInputValidity(input)) { // проверяет валидность параметров (если хоть один невалиден, то...)
            this._showInputError(input, this._checkInputValidity(input));
          } else {
            this._hideInputError(input);
          };
        });
  
        this._toggleButtonState();  // И отдельный переключатель активности сабмита
      });
    });
  }

}

export { FormValidator };
