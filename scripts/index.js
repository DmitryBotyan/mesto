import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initialCards.js";
import Section from "./Section.js";
import { Card } from "./Card.js"
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector('.popup_add');
const buttonAdd = document.querySelector('.profile__add-button');
export const zoomImage = document.querySelector('.popup__zoom-img');
export const imageCaption = document.querySelector('.popup__img-caption');

function createCard({data, handleCardClick}, templateSelector) {
  const card = new Card({data, handleCardClick}, templateSelector);
  const cardElement = card.generateCard();
  return cardElement;
}

buttonEditProfile.addEventListener('click', () => {
  popupEditProfile.handlePopupOpen()
  const getUserInfo = new UserInfo({userName: ".profile__title", userInfo: ".profile__subtitle"})
  getUserInfo.getUserInfo()
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
    const setUserInfo = new UserInfo({userName: ".profile__title", userInfo: ".profile__subtitle"})
    setUserInfo.setUserInfo({userName: item.name, userInfo: item.link})
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