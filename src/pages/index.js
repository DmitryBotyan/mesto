import "./index.css";
import { configApi, validationConfig } from "../utils/constants";
import renderLoading from "../utils/utils.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { Card } from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import {
  buttonEditProfile,
  popupEditUserInform,
  popupAddNewCard,
  buttonAdd,
  nameInput,
  jobInput,
  profilePhoto,
  profileName,
  profileInfo,
  popupEditSubmitButton,
  popupAddSubmitButton,
  popupEditUserPhotoSubmitButton,
} from "../utils/constants.js";

let userId;

const api = new Api(configApi);

const userInfoList = new UserInfo({
  nameSelector: ".profile__title",
  infoSelector: ".profile__subtitle",
  photoSelector: ".profile__avatar",
});

function createCard({ data }) {
  const card = new Card(
    {
      data,
      handleCardClick: () => {
        popupWithImage.open(data.name, data.link);
      },
      handleLikeClick: (cardId) => {
        api
          .letLike(cardId)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => console.log(`Ошибка.....: ${err}`));
      },
      handleDeleteLikeClick: (cardId) => {
        api
          .deleteLike(cardId)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => console.log(`Ошибка.....: ${err}`));
      },
      handleDeleteIconClick: (cardId) => {
        popupWithConfirm.open();
        popupWithConfirm.setSubmitHandler(() => {
          api.deleteCard(cardId).then(() => {
            cardElement.remove();
            popupWithConfirm.close();
          });
        });
      },
    },
    '#card',
    userId
  );
  const cardElement = card.generateCard();
  return cardElement;
}

buttonEditProfile.addEventListener("click", () => {
  renderLoading(false, popupEditSubmitButton);
  popupEditProfile.open();
  const { userName, userInfo } = userInfoList.getUserInfo();
  nameInput.value = userName;
  jobInput.value = userInfo;
});

const popupEditProfile = new PopupWithForm(".popup_edit", {
  formSubmit: (data) => {
    renderLoading(true, popupEditSubmitButton);
    api
      .editUserInfo({ name: data.name, about: data.about })
      .then(() => {
        profileName.textContent = data.name;
        profileInfo.textContent = data.about;
        popupEditProfile.close();
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  },
});

popupEditProfile.setEventListeners();

const popupWithImage = new PopupWithImage(".popup_zoom");

popupWithImage.setEventListeners();

const validationPopupEdit = new FormValidator(
  validationConfig,
  popupEditUserInform
);
const validationPopupAdd = new FormValidator(validationConfig, popupAddNewCard);

validationPopupEdit.enableValidation();
validationPopupAdd.enableValidation();

const popupAddCard = new PopupWithForm(".popup_add", {
  formSubmit: (data) => {
    renderLoading(true, popupAddSubmitButton);
    api
      .addNewCard({ name: data.name, link: data.link })
      .then((data) => {
        const newUserCard = createCard({ data });
        popupAddCard.close();
        cardList.addItem(newUserCard);
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  },
});

popupAddCard.setEventListeners();

const popupWithConfirm = new PopupWithConfirmation(".popup_confirm");

popupWithConfirm.setEventListeners();

const cardList = new Section(
  {
    renderer: (data) => {
      const renderedCard = createCard({ data });
      cardList.addItem(renderedCard);
    },
  },
  ".elements"
);

Promise.all([api.getCardList(), api.getUserInform()])
  .then(([cards, info]) => {
    userId = info._id;
    userInfoList.setUserInfo({
      userName: info.name,
      userInfo: info.about,
      userPhoto: info.avatar,
    });
    cardList.renderItems(cards);
  })

  .catch((err) => {
    console.log(`Ошибка.....: ${err}`);
  });

buttonAdd.addEventListener("click", () => {
  popupAddCard.open();
  renderLoading(false, popupAddSubmitButton);
  validationPopupAdd.disableButton();
});

const photoEditPopup = new PopupWithForm(".popup_edit-photo", {
  formSubmit: (data) => {
    api
      .updateProfilePhoto(data)
      .then(() => {
        profilePhoto.src = data.avatar;
        photoEditPopup.close();
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
    renderLoading(true, popupEditUserPhotoSubmitButton);
  },
});

photoEditPopup.setEventListeners();

profilePhoto.addEventListener("click", () => {
  renderLoading(false, popupEditUserPhotoSubmitButton);
  photoEditPopup.open();
});
