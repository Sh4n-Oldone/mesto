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
  nameInput,
  jobInput,
  profileSaveButton,
  validationSelectors
} from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

// Апи профиля
const apiUserData = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/users/me',
  headers: {
      authorization: '14950384-2a2e-482b-8250-dfb0e0c885f3', 
      'Content-Type': 'application/json'
    }
});
apiUserData.getData().then((res) => {profileName.textContent = res.name});
apiUserData.getData().then((res) => {profileTitle.textContent = res.about});
apiUserData.getData().then((res) => {profileAvatar.src = res.avatar});

//Апи карточек
const apiCardsData = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/cards',
  headers: {
      authorization: '14950384-2a2e-482b-8250-dfb0e0c885f3', 
      'Content-Type': 'application/json'
    }
});

function createNewCard(data) {return new Card(data, cardTemplate, popupWithImage, popupWithDelSubmit, likeClick).createCard()}; //возвращает готовую карточку, принимает объект с данными

const popupWithImage = new PopupWithImage(popUpImg);
popupWithImage.setEventListeners();

let section = ''; // получение карточек с сервера и их отображение 
apiCardsData.getData()
  .then((res) => {
    section = new Section({
      items: res,
      renderer: (item) => {
        section.addItem(createNewCard(item))}
    }, cardsList);
    section.render();
  });

const user = new UserInfo({nameSelector: nameInput, jobSelector: jobInput});

const popupForProfile = new PopupWithForm(
  popUpUser,
  () => {
    // profileSaveButton.textContent = 'Сохранение...'
    user.setUserInfo(user.getUserInfo());
    apiUserData.getData()
    .then((res) => {
      profileName.textContent = res.name;
      profileTitle.textContent = res.about})
    // .finally(profileSaveButton.textContent = 'Сохранить');
  }
);
popupForProfile.setEventListeners();

// отправка данных карточки
const popupForCards = new PopupWithForm(
  popUpCard, 
  (data) => {
    apiCardsData.setData(data)
    .then((res) => {section.addItemReverse(createNewCard(res))})
  }
);
popupForCards.setEventListeners();

const popupWithDelSubmit = new PopupWithSubmit(
  popUpSubmit,
  (data) => {
    apiCardsData.removeCard(data)
});
popupWithDelSubmit.setEventListeners();

const likeClick = (id) => {
  // if() {
  //   apiCardsData.putLike(id)
  // } else {
  //   apiCardsData.removeLike(id)
  // }
}
// Ивенты

const avatarReplacement = new PopupWithForm(
  popUpAvatar,
  (data) => {
    apiUserData.setNewAvatar(data)
    .then((data) => {
      profileAvatar.src = data.avatar
    });
  }
)
avatarReplacement.setEventListeners();

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