function valueValidation(form, inputSelector, inputErrorClass) {
  const inputs = form.querySelectorAll(inputSelector);

  inputs.forEach((input) => {
    if (input.value === '') {
      const errorMessage = input.previousElementSibling;
      input.classList.add(inputErrorClass);
      errorMessage.textContent = 'Вы пропустили это поле';
    } else {
      const errorMessage = input.previousElementSibling;
      input.classList.remove(inputErrorClass);
      errorMessage.textContent = '';
    };
  });
};

function submitDisable(form, submitButtonSelector, inactiveButtonClass) {
  const submitButton = form.querySelector(submitButtonSelector);

  if (!form.checkValidity()) {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add(inactiveButtonClass);
  } else {
    submitButton.removeAttribute('disabled', true);
    submitButton.classList.remove(inactiveButtonClass);
  };
};

function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass}) {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach((form) => {
    form.addEventListener('input', () => {
      valueValidation(form, inputSelector, inputErrorClass);
      submitDisable(form, submitButtonSelector, inactiveButtonClass);
    });
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_error',
  // errorClass: 'popup__error_visible'
});