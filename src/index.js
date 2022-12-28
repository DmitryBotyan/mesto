import "./pages/index.css"
import { FormValidator } from "./scripts/FormValidator.js";
import { initialCards } from "./scripts/initialCards.js";
import Section from "./scripts/Section.js";
import { Card } from "./scripts/Card.js"
import PopupWithImage from "./scripts/PopupWithImage.js";
import UserInfo from "./scripts/UserInfo.js";
import PopupWithForm from "./scripts/PopupWithForm.js";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector('.popup_add');
const buttonAdd = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__job')
export const zoomImage = document.querySelector('.popup__zoom-img');
export const imageCaption = document.querySelector('.popup__img-caption');

function createCard({data, handleCardClick}, templateSelector) {
  const card = new Card({data, handleCardClick}, templateSelector);
  const cardElement = card.generateCard();
  return cardElement;
}

function userInfo({userName, userInfo}, {nameSelector, infoSelector}) {
  const getUserInfo = new UserInfo({nameSelector, infoSelector})
  getUserInfo.setUserInfo({userName, userInfo})
}

buttonEditProfile.addEventListener('click', () => {
  popupEditProfile.handlePopupOpen()
  const setUserInfo = new UserInfo({nameSelector: ".profile__title", infoSelector: ".profile__subtitle"})
  const userArray = setUserInfo.getUserInfo()
  nameInput.value = userArray.userName;
  jobInput.value = userArray.userInfo;
  setUserInfo.setUserInfo({userName: userArray.userName, userInfo: userArray.userInfo})
})

const cardList = new Section({
  items: initialCards,
  renderer: (data) => {
    const renderedCard = createCard({data,
      handleCardClick: () => {
        popupWithImage.imageZoom(data.name, data.link)
        popupWithImage.setEventListeners()
      }
    }, '#card')
    cardList.addItem(renderedCard)
  }
},
'.elements'
)

cardList.renderer()

const popupAddCard = new PopupWithForm('.popup_add', {
  formSubmit: (data) => {
    const newUserCard = createCard({data, 
      handleCardClick: () => {
        popupWithImage.imageZoom(data.name, data.link)
        popupWithImage.setEventListeners()
      }
    }, '#card')
    cardList.addItem(newUserCard)
  }
})

popupAddCard.setEventListeners()

const popupEditProfile = new PopupWithForm('.popup_edit', {
  formSubmit: (item) => {
    userInfo({userName: item.name, userInfo: item.link}, {nameSelector: ".profile__title", infoSelector: ".profile__subtitle"})
  }
})

popupEditProfile.setEventListeners()

buttonAdd.addEventListener('click', () => {
  popupAddCard.handlePopupOpen()
  validationPopupAdd.toggleButtonDisable()
})

const popupWithImage = new PopupWithImage('.popup_zoom');

const settings = {
    inputSelector: '.input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'input_type_error',
    errorClass: 'popup__error-text_visible'
};

const validationPopupEdit = new FormValidator(settings, popupEdit);
const validationPopupAdd = new FormValidator(settings, popupAdd);

validationPopupEdit.enableValidation();
validationPopupAdd.enableValidation();