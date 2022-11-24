import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initialCards.js";
import { Card } from "./Card.js"

const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector('.popup_add');
const popupZoom = document.querySelector('.popup_zoom');
const buttonClosePopupEdit = popupEdit.querySelector(".popup__close-button");
const buttonClosePopupAdd = popupAdd.querySelector(".popup__close-button");
const buttonClosePopupZoom = popupZoom.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__job');
const userName = document.querySelector(".profile__title");
const userjob = document.querySelector(".profile__subtitle");
const buttonAdd = document.querySelector('.profile__add-button');
const placeInput = document.querySelector('.popup__place');
const linkInput = document.querySelector('.popup__link');
const popupEditForm = popupEdit.querySelector('.popup__container');
const popups = document.querySelectorAll('.popup');
const zoomImage = document.querySelector('.popup__zoom-img');
const imageCaption = document.querySelector('.popup__img-caption');

function closePopupByEscKeyPress(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup)
  }
};

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEscKeyPress);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscKeyPress);
}

function overlayClickCloseInitialization(popup) {
  popup.addEventListener('click', (event) => {
    const popupContainer = event.currentTarget
    if (event.target === popupContainer) {
      closePopup(popup)
    }
  })
};

function createCard(name, link, templateSelector, handleOpenPopup) {
  const card = new Card(name, link, templateSelector, handleOpenPopup);
  const cardElement = card.generateCard();
  return cardElement;
}

popups.forEach((popup) => {
  overlayClickCloseInitialization(popup);
});

buttonEditProfile.addEventListener('click', (event) => {
  openPopup(popupEdit);
  nameInput.value = userName.textContent; 
  jobInput.value = userjob.textContent; 
});

buttonClosePopupEdit.addEventListener("click", (event) => {
  closePopup(popupEdit);
});

popupEditForm.addEventListener('submit', (event) => {
  event.preventDefault();
  userName.textContent = nameInput.value;
  userjob.textContent = jobInput.value;
  closePopup(popupEdit);
});

buttonAdd.addEventListener("click", (event) => {
  validationPopupAdd.toggleButtonDisable()
  placeInput.value = '';
  linkInput.value = '';
  openPopup(popupAdd);
});

buttonClosePopupAdd.addEventListener("click", (event) => {
  closePopup(popupAdd);
});

buttonClosePopupZoom.addEventListener("click", (event) => {
  closePopup(popupZoom);
});

const handleOpenPopup = (name, link) => {
    zoomImage.src = link; 
    imageCaption.textContent = name; 
    zoomImage.alt = name; 
   openPopup(popupZoom)
}

initialCards.forEach((item) => {
  const renderedCard = createCard(item.name, item.link, '#card', handleOpenPopup);
  document.querySelector('.elements').append(renderedCard);
});

function addCard() {
  const placeInput = document.querySelector('.popup__place');
  const linkInput = document.querySelector('.popup__link');
  const renderedCard = createCard(placeInput.value, linkInput.value, '#card', handleOpenPopup);
  document.querySelector('.elements').prepend(renderedCard);
};

popupAdd.addEventListener('submit', (event) => {
  event.preventDefault();
  closePopup(popupAdd)
  addCard()
});

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