import "./pages/index.css"
import { FormValidator } from "./scripts/FormValidator.js";
import Section from "./scripts/Section.js";
import { Card } from "./scripts/Card.js"
import PopupWithImage from "./scripts/PopupWithImage.js";
import UserInfo from "./scripts/UserInfo.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import Api from "./scripts/Api.js"
import PopupWithConfirmation from "./scripts/PopupWithConfirmation";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector('.popup_add');
const buttonAdd = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__job')
export const zoomImage = document.querySelector('.popup__zoom-img');
export const imageCaption = document.querySelector('.popup__img-caption');
const userUnfoList = new UserInfo({nameSelector: ".profile__title", infoSelector: ".profile__subtitle"})
const profilePhoto = document.querySelector('.profile__avatar')
const cardsSection = document.querySelector('.elements')
const profileName = document.querySelector('.profile__title')
const profileInfo = document.querySelector('.profile__subtitle')


function createCard({data, handleCardClick, handleLikeClick, handleDeleteIconClick}, templateSelector) {
  const card = new Card({data, handleCardClick, handleLikeClick, handleDeleteIconClick}, templateSelector);
  const cardElement = card.generateCard();
  return cardElement
}

const popupSubmitButton = document.querySelector('.popup__button')

function loading(isLoading) {
  if (isLoading) {
    popupSubmitButton.textContent = 'Сохранение...'
  }
  else {
    popupSubmitButton.textContent = 'Сохранить'
  }
}

buttonEditProfile.addEventListener('click', () => {
  loading(false)
  popupEditProfile.handlePopupOpen()
  const userArray = userUnfoList.getUserInfo()
  nameInput.value = userArray.userName;
  jobInput.value = userArray.userInfo;
})

const popupEditProfile = new PopupWithForm('.popup_edit', {
  formSubmit: (data) => {
    loading(true)
    api.editUserInfo({name: data.name, about: data.about})
    profileName.textContent = data.name
    profileInfo.textContent = data.about
  }
})

popupEditProfile.setEventListeners()

const popupWithImage = new PopupWithImage('.popup_zoom');

popupWithImage.setEventListeners()

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

const configApi = {
  id: 'cohort-58',
  headers: {
    'Content-Type': 'application/json',
    authorization: '0570ef48-f4e2-4392-b90c-178e3b6f8dfe'
  }
}

const api = new Api(configApi)

const popupAddCard = new PopupWithForm('.popup_add', {
  formSubmit: (data) => {
    const newUserCard = createCard({data, 
      handleCardClick: () => {
        popupWithImage.imageZoom(data.name, data.link)
      },
      handleLikeClick: (cardId) => {
          api.letLike(cardId)
      },
      handleDeleteIconClick: (cardId) => {
        const popupWithConfirm = new PopupWithConfirmation('.popup_confirm', {
          formSubmit: (isConfirm) => {
            if (isConfirm) {
              newUserCard.remove()
              api.deleteCard(cardId)
            }
          }
        })
        popupWithConfirm.handlePopupOpen()
        popupWithConfirm.setEventListeners()
      }
    },'#card')
    api.addNewCard({name: data.name, link: data.link})
    cardsSection.prepend(newUserCard)
  }})

popupAddCard.setEventListeners()

api.getCardList().then((data) => {
  const cardList = new Section({
    items: data,
    renderer: (data) => {
      const renderedCard = createCard({data,
        handleCardClick: () => {
          popupWithImage.imageZoom(data.name, data.link)
        },
        handleLikeClick: (cardId) => {
          api.letLike(cardId)
        },
        handleDeleteIconClick: (cardId) => {
          const popupWithConfirm = new PopupWithConfirmation('.popup_confirm', {
            formSubmit: (isConfirm) => {
              if (isConfirm) {
                renderedCard.remove()
                api.deleteCard(cardId)
              }
            }
          })
          
          popupWithConfirm.handlePopupOpen()
          popupWithConfirm.setEventListeners()
        }
      },
      '#card')
      cardList.addItem(renderedCard)
    }
  },
  '.elements'
  )
  cardList.renderer()
})
.catch((err) => {
  console.log(err)
})

buttonAdd.addEventListener('click', () => {
    popupAddCard.handlePopupOpen()
    validationPopupAdd.toggleButtonDisable()
  })

const photoEditPopup = new PopupWithForm('.popup_edit-photo', {
  formSubmit: (data) => {
    api.updateProfilePhoto(data)
    profilePhoto.src = data.avatar
  }
})

photoEditPopup.setEventListeners()

profilePhoto.addEventListener('click', () => {
  photoEditPopup.handlePopupOpen()
})

api.getUserInform().then((data) => {
  userUnfoList.setUserInfo({userName: data.name, userInfo: data.about})
  profilePhoto.src = data.avatar
})
.catch((err) => {
  console.log(err)
})