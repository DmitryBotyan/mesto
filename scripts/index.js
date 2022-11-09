const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector('.popup_add');
export const popupZoom = document.querySelector('.popup_zoom');
const buttonClosePopup = popupEdit.querySelector(".popup__close-button");
const buttonClosePopupAdd = popupAdd.querySelector(".popup__close-button");
const buttonClosePopupZoom = popupZoom.querySelector('.popup__close-button');
const buttonSubmitPopupAdd = popupAdd.querySelector('.popup__button');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__job');
const userName = document.querySelector(".profile__title");
const userjob = document.querySelector(".profile__subtitle");
const buttonAdd = document.querySelector('.profile__add-button');
const placeInput = document.querySelector('.popup__place');
const linkInput = document.querySelector('.popup__link');
const popupEditForm = popupEdit.querySelector('.popup__container');
const popupNodeList = document.querySelectorAll('.popup');
const popupArray = Array.from(popupNodeList);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function keyFind(event) {
  if (event.key === 'Escape') {
    const popupIsOpened = document.querySelector('.popup_opened');
    popupIsOpened.classList.remove('popup_opened');
  }
};

export default function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", keyFind);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", keyFind);
}

function overlayClickClose(popup) {
  popup.addEventListener('click', (event) => {
    const popupContainer = event.currentTarget
    if (event.target === popupContainer) {
      closePopup(popup)
    }
  })
};

popupArray.forEach((popup) => {
  overlayClickClose(popup);
});

buttonEditProfile.addEventListener('click', (event) => {
  openPopup(popupEdit);
  nameInput.value = userName.textContent; 
  jobInput.value = userjob.textContent; 
});

buttonClosePopup.addEventListener("click", (event) => {
  closePopup(popupEdit);
});

popupEditForm.addEventListener('submit', (event) => {
  event.preventDefault();
  userName.textContent = nameInput.value;
  userjob.textContent = jobInput.value;
  closePopup(popupEdit);
});

buttonAdd.addEventListener("click", (event) => {
  buttonSubmitPopupAdd.classList.add('popup__button_disabled');
  placeInput.value = '';
  linkInput.value = '';
  buttonSubmitPopupAdd.disabled = true;
  openPopup(popupAdd);
});

buttonClosePopupAdd.addEventListener("click", (event) => {
  closePopup(popupAdd);
});

buttonClosePopupZoom.addEventListener("click", (event) => {
  closePopup(popupZoom);
});

import Card from "./Card.js"

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  const cardElement = card.generateCard();
  document.querySelector('.elements').append(cardElement);
});

function addCard() {
  const placeInput = document.querySelector('.popup__place');
  const linkInput = document.querySelector('.popup__link');
  const newCard = new Card(placeInput.value, linkInput.value);
  const newCardElement = newCard.generateCard();
  document.querySelector('.elements').prepend(newCardElement);
};

popupAdd.addEventListener('submit', (event) => {
  event.preventDefault();
  closePopup(popupAdd)
  addCard()
});

import FormValidator from "./FormValidator.js";

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