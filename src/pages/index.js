import "./index.css"
import { configApi, validationConfig } from "../utils/constants";
import renderLoading from "../utils/utils.js"
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { Card } from "../components/Card.js"
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js"
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import { buttonEditProfile, popupEditUserInform, popupAddNewCard, buttonAdd, nameInput, jobInput, profilePhoto, profileName, profileInfo } from "../utils/constants.js"

const api = new Api(configApi)

const userUnfoList = new UserInfo({nameSelector: ".profile__title", infoSelector: ".profile__subtitle", photoSelector: '.profile__avatar'})

let userId;

api.getUserInform().then((data) => {
  userUnfoList.setUserInfo({userName: data.name, userInfo: data.about, userPhoto: data.avatar})
  return userId = data._id
})


function createCard({data, handleCardClick, handleLikeClick, handleDeleteLikeClick, handleDeleteIconClick}, templateSelector, userId) {
    const card = new Card({data, handleCardClick, handleLikeClick, handleDeleteLikeClick, handleDeleteIconClick}, templateSelector, userId);
    const cardElement = card.generateCard();
    return cardElement
  }

buttonEditProfile.addEventListener('click', () => {
  renderLoading(false, '.popup_edit')
  popupEditProfile.open()
  const userArray = userUnfoList.getUserInfo()
  nameInput.value = userArray.userName;
  jobInput.value = userArray.userInfo;
})

const popupEditProfile = new PopupWithForm('.popup_edit', {
  formSubmit: (data) => {
    renderLoading(true, '.popup_edit')
    api.editUserInfo({name: data.name, about: data.about}).then(() => {
        popupEditProfile.close()
    })
    profileName.textContent = data.name
    profileInfo.textContent = data.about
  }
})

popupEditProfile.setEventListeners()

const popupWithImage = new PopupWithImage('.popup_zoom');

popupWithImage.setEventListeners()

const validationPopupEdit = new FormValidator(validationConfig, popupEditUserInform);
const validationPopupAdd = new FormValidator(validationConfig, popupAddNewCard);

validationPopupEdit.enableValidation();
validationPopupAdd.enableValidation();

const popupAddCard = new PopupWithForm('.popup_add', {
  formSubmit: (data) => {
    api.addNewCard({name: data.name, link: data.link}).then((res) => {
      return res.json()
    }).then((data) => {
      const newUserCard = createCard({data, 
        handleCardClick: () => {
          popupWithImage.open(data.name, data.link)
        },
        handleLikeClick: (cardId) => {
            api.letLike(cardId)
        },
        handleDeleteLikeClick: (cardId) => {
          api.deleteLike(cardId)
        },
        handleDeleteIconClick: (cardId) => {
          popupWithConfirm.open()
          popupWithConfirm.setSubmitHandler(() => {
            api.deleteCard(cardId);
            newUserCard.remove()
          })
        }
      },'#card', userId)
      popupAddCard.close()
      cardList.addItem(newUserCard)
    })
  }})

popupAddCard.setEventListeners()

const popupWithConfirm = new PopupWithConfirmation('.popup_confirm', {
  formSubmit: () => {
    
    popupWithConfirm.close();
  }
})

popupWithConfirm.setEventListeners()

const cardList = new Section({
    renderer: (data) => {
      const renderedCard = createCard({data,
        handleCardClick: () => {
          popupWithImage.open(data.name, data.link)
        },
        handleLikeClick: (cardId) => {
          api.letLike(cardId)
        },
        handleDeleteLikeClick: (cardId) => {
          api.deleteLike(cardId)
        },
        handleDeleteIconClick: (cardId) => {
          popupWithConfirm.open()
          popupWithConfirm.setSubmitHandler(() => {
            api.deleteCard(cardId);
            renderedCard.remove()
          })
        }
      },
      '#card', userId)
      cardList.addItem(renderedCard)
    }
  },
  '.elements'
  )

api.getCardList().then((data) => {

  cardList.renderItems(data)

})

buttonAdd.addEventListener('click', () => {
    popupAddCard.open()
    validationPopupAdd.disableButton()
  })

const photoEditPopup = new PopupWithForm('.popup_edit-photo', {
  formSubmit: (data) => {
    api.updateProfilePhoto(data)
    profilePhoto.src = data.avatar
    photoEditPopup.close()
    renderLoading(true, '.popup_edit-photo')
  }
})

photoEditPopup.setEventListeners()

profilePhoto.addEventListener('click', () => {
  renderLoading(false, '.popup_edit-photo')
  photoEditPopup.open()
})