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

const userUnfoList = new UserInfo({nameSelector: ".profile__title", infoSelector: ".profile__subtitle", photoSelector: '.profile__avatar'})

function createCard({data, handleCardClick, handleLikeClick, handleDeleteIconClick}, templateSelector) {
  const card = new Card({data, handleCardClick, handleLikeClick, handleDeleteIconClick}, templateSelector);
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
    api.editUserInfo({name: data.name, about: data.about}).then((res) => {
      if (res.ok) {
        popupEditProfile.close()
      }
    }).catch(err => console.log(`Ошибка.....: ${err}`))
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

const api = new Api(configApi)

const popupAddCard = new PopupWithForm('.popup_add', {
  formSubmit: (data) => {
    const newUserCard = createCard({data, 
      handleCardClick: () => {
        popupWithImage.open(data.name, data.link)
      },
      handleLikeClick: (cardId) => {
          api.letLike(cardId).catch(err => console.log(`Ошибка.....: ${err}`))
      },
      handleDeleteIconClick: (cardId) => {
        const popupWithConfirm = new PopupWithConfirmation('.popup_confirm', {
          formSubmit: (isConfirm) => {
            if (isConfirm) {
              newUserCard.remove()
              api.deleteCard(cardId).catch(err => console.log(`Ошибка.....: ${err}`))
            }
          }
        })
        popupWithConfirm.open()
        popupWithConfirm.setEventListeners()
      }
    },'#card')
    api.addNewCard({name: data.name, link: data.link}).then((res) => {
      if (res.ok) {
        popupAddCard.close()
      }
    }).catch(err => console.log(`Ошибка.....: ${err}`))
    cardList.addItem(newUserCard)
  }})

popupAddCard.setEventListeners()

const popupWithConfirm = new PopupWithConfirmation('.popup_confirm', {
  formSubmit: (isConfirm) => {
    if (isConfirm) {
      popupWithConfirm.close()
    }
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
        handleDeleteIconClick: (cardId) => {
          popupWithConfirm.open()

          renderedCard.remove()
          api.deleteCard(cardId)

        }
      },
      '#card')
      cardList.addItem(renderedCard)
    }
  },
  '.elements'
  )

api.getCardList().then((data) => {

  cardList.renderItems(data)

}).catch(err => console.log(`Ошибка.....: ${err}`))

buttonAdd.addEventListener('click', () => {
    popupAddCard.open()
    validationPopupAdd.disableButton()
  })

const photoEditPopup = new PopupWithForm('.popup_edit-photo', {
  formSubmit: (data) => {
    api.updateProfilePhoto(data).then((res) => {
      if (res.ok) {
        photoEditPopup.close()
      }
    })
    renderLoading(true, '.popup_edit-photo')
    profilePhoto.src = data.avatar
  }
})

photoEditPopup.setEventListeners()

profilePhoto.addEventListener('click', () => {
  renderLoading(false, '.popup_edit-photo')
  photoEditPopup.open()
})

api.getUserInform().then((data) => {
  userUnfoList.setUserInfo({userName: data.name, userInfo: data.about, userPhoto: data.avatar})
})