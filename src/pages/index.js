// Импорты
import './index.css';

import Card from '../components/Card.js'; // класс создания карточки
import FormValidator from '../components/FormValidator.js'; // класс валидации инпутов в форме
import Section from '../components/Section.js';

import {
  popUpUser,
  popUpCard,
  popUpImg,
  popUpSubmit,
  popUpAvatar,
  editButtonUser,
  addButtonCard,
  profileName,
  profileTitle,
  profileAvatar,
  cardsList,
  cardTemplate,
  formUserElement,
  formCardElement,
  formAvatarElement,
  saveButtonCard,
  profileSaveButton,
  avatarSaveButton,
  removeSubmitButton,
  nameInput,
  jobInput,
  validationSelectors
} from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

// Копия Api с нашими ссылками и авторизацией
const api = new Api({
  userUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/users/me',
  cardsUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/cards',
  headers: {
      authorization: '14950384-2a2e-482b-8250-dfb0e0c885f3', 
      'Content-Type': 'application/json'
    }
});


//Применение данных с сервера при загрузки страницы
api.getUserData().then((res) => {
  profileName.textContent = res.name;
  profileTitle.textContent = res.about;
  profileAvatar.src = res.avatar;
}).catch((error) => {console.log('Я получал данные. Я сломался. Ошибка: ' + error)});



function createNewCard(data) {return new Card(data, cardTemplate, popupWithImage, popupWithDelSubmit, likeClick).createCard()}; //возвращает готовую карточку, принимает объект с данными

const popupWithImage = new PopupWithImage(popUpImg);
popupWithImage.setEventListeners();

// загрузка с сервера и отображение карточек
let section = ''; // получение карточек с сервера и их отображение 
api.getCardsData()
  .then((res) => {
    section = new Section({
      items: res,
      renderer: (item) => {
        section.addItem(createNewCard(item))}
    }, cardsList);
    section.render();
  })
  .catch((error) => {console.log('Я создавал карточки. Я сломался. Ошибка: ' + error)});

const user = new UserInfo({nameSelector: nameInput, jobSelector: jobInput});

// данные профиля
const popupForProfile = new PopupWithForm(
  popUpUser,
  () => {
    profileSaveButton.textContent = 'Сохранение...'
    user.setUserInfo(user.getUserInfo());
    api.getUserData()
    .then((res) => {
      profileName.textContent = res.name;
      profileTitle.textContent = res.about;
      popupForProfile.close();
    })
    .catch((error) => {console.log('Я менял данные пользователя. Я сломался. Ошибка: ' + error)})
    .finally(() => {
      profileSaveButton.textContent = 'Сохранить';
    });
  }
);
popupForProfile.setEventListeners();

// отправка данных карточки
const popupForCards = new PopupWithForm(
  popUpCard, 
  (data) => {
    saveButtonCard.textContent = 'Сохранение...';
    api.setCardsData(data)
    .then((res) => {
      section.addItemReverse(createNewCard(res));
      popupForCards.close();
    })
    .catch((error) => {console.log('Я отправлял карточку на сервер. Я сломался. Ошибка: ' + error)})
    .finally(() => {
      saveButtonCard.textContent = 'Создать';
    })
  }
);
popupForCards.setEventListeners();

// коллбэк подтверждения удаления карточки
const popupWithDelSubmit = new PopupWithSubmit(
  popUpSubmit,
  (data, item) => {
    removeSubmitButton.textContent = 'Удаление...';
    api.removeCard(data)
    .then(() => {
      item.parentNode.remove();
      popupWithDelSubmit.close();
    })
    .catch((error) => {
      console.log('Что-то пошло не так при удалении карточки: ' + error)
    })
    .finally(() => {
      removeSubmitButton.textContent = 'Да';
    })
});
popupWithDelSubmit.setEventListeners();

// коллбэк условия для лайка
const likeClick = (id, item) => {
  if(item.classList.contains('card__like-button_pressed')) {
    api.removeLike(id)
    .then(() => {
      item.classList.remove('card__like-button_pressed');
      item.nextElementSibling.textContent = parseInt(item.nextElementSibling.textContent) - 1;
    })
    .catch((error) => {console.log('Я убирал лайк. Я сломался. Ошибка: ' + error)});
  } else {
    api.putLike(id)
    .then(() => {
      item.classList.add('card__like-button_pressed');
      item.nextElementSibling.textContent = parseInt(item.nextElementSibling.textContent) + 1;
    })
    .catch((error) => {console.log('Я ставил лайк. Я сломался. Ошибка: ' + error)});
  }
}

// замена аватарки
const avatarReplacement = new PopupWithForm(
  popUpAvatar,
  (data) => {
    avatarSaveButton.textContent = 'Сохранение...';
    api.setNewAvatar(data)
    .then((data) => {
      profileAvatar.src = data.avatar
      avatarReplacement.close();
    })
    .catch((error) => {console.log('Я менял аватар. Я сломался. Ошибка: ' + error)})
    .finally(() => {
      avatarSaveButton.textContent = 'Изменить';
    })
  }
)
avatarReplacement.setEventListeners();


// Ивенты
profileAvatar.addEventListener('click', () => {
  avatarReplacement.open();
})

editButtonUser.addEventListener('click', () => {
  nameInput.value = profileName.textContent; // вносит в инпуты исходные значения
  jobInput.value = profileTitle.textContent;
  popupForProfile.open();
});

addButtonCard.addEventListener('click', () => {
  saveButtonCard.classList.add('popup__save-button_disabled'); // обнуляет класс кнопки
  saveButtonCard.setAttribute('disabled', true); // обнуляет состояние кнопки
  popupForCards.open();
});

// Валидация форм
formAvatarElement.addEventListener('submit', new FormValidator(validationSelectors, formAvatarElement).enableValidation());
formUserElement.addEventListener('submit', new FormValidator(validationSelectors, formUserElement).enableValidation());
formCardElement.addEventListener('submit', new FormValidator(validationSelectors, formCardElement).enableValidation());