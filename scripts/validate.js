// Переменные

const profile = document.querySelector('.popup-profile');
const profileForm = profile.querySelector('.popup__form');

const card = document.querySelector('.popup-card');
const cardForm = card.querySelector('.popup__form');

// Функции

function valueValidation(form) {
  const nameInput = form.querySelector('.popup__input_name');
  const jobInput = form.querySelector('.popup__input_title');
  const submitButton = form.querySelector('.popup__save-button');
  const nameErrorMessage = form.querySelector('.input_name_error-message');
  const titleErrorMessage = form.querySelector('.input_title_error-message');

  if (nameInput.value === '' || jobInput.value === '') {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('popup__save-button_disabled');
  } else {
    submitButton.removeAttribute('disabled', true);
    submitButton.classList.remove('popup__save-button_disabled');
  };

  if (nameInput.value === '') {
    nameInput.classList.add('popup__input_error');
    nameErrorMessage.textContent = 'Вы пропустили это поле';
  } else {
    nameInput.classList.remove('popup__input_error');
    nameErrorMessage.textContent = '';
  };

  if (jobInput.value === '') {
    jobInput.classList.add('popup__input_error');
    titleErrorMessage.textContent = 'Вы пропустили это поле';
  } else {
    jobInput.classList.remove('popup__input_error');
    titleErrorMessage.textContent = '';
  };
};





// Вызовы

profileForm.addEventListener('input', (evt) => {
  evt.preventDefault();

  valueValidation(profileForm);
});

cardForm.addEventListener('input', (evt) => {
  evt.preventDefault();

  valueValidation(cardForm);
});



// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__save-button',
//   inactiveButtonClass: 'popup__save-button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });