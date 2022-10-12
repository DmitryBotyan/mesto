const buttonEditProfile = document.querySelector(".profile__edit-button");
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector('.popup_add');
const popupZoom = document.querySelector('.popup_zoom');
const buttonClosePopup = popupEdit.querySelector(".popup__close-button");
const buttonClosePopupAdd = popupAdd.querySelector(".popup__close-button")
const buttonClosePopupZoom = popupZoom.querySelector('.popup__close-button');
const buttonSubmit = document.querySelector('.popup__button');
const buttonSubmitPopupAdd = popupAdd.querySelector('.popup__button');
const formElement = document.querySelector(".popup__container");
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__job');
const userName = document.querySelector(".profile__title");
const userjob = document.querySelector(".profile__subtitle");
const buttonAdd = document.querySelector('.profile__add-button');
const imgCaption = popupZoom.querySelector('.popup__img-caption');
const zoomImg = popupZoom.querySelector('.popup__zoom-img');
const list = document.querySelector('.elements');
const placeInput = document.querySelector('.popup__place')
const linkInput = document.querySelector('.popup__link');
const popupEditForm = popupEdit.querySelector('.popup__container');
const overlay = popup.querySelector('.popup__overlay');
const popupAddOverlay = popupAdd.querySelector('.popup__overlay_add');
const popupEditOverlay = popupEdit.querySelector('.popup__overlay_edit');
const popupZoomOverlay = popupZoom.querySelector('.popup__overlay_zoom');

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

function popupOpen(popup) {
  popup.classList.add("popup_opened");
};

function popupClose(popup) {
  popup.classList.remove("popup_opened");
};

function popupCloseEscapeButton(popup) {
  popupClose(popup)
}

function keyFind(event, popup) {
  if (event.key === 'Escape') {
    popupCloseEscapeButton(popup)
  }
}

function popupEditSaveValue() {
  nameInput.value = userName.textContent; 
  jobInput.value = userjob.textContent; 
};

function formSubmitHandler(event) {
  event.preventDefault();
  userName.textContent = nameInput.value;
  userjob.textContent = jobInput.value;
};

function overlayClickClose(overlay, popup) {
  overlay.addEventListener('click', (event) => {
    popupClose(popup)
  })
};

function createCard(data) {
  const template = document.querySelector('#card').content;
  const card = template.cloneNode(true);
  const cardTitle = card.querySelector('.elements__title');
  const img = card.querySelector('.elements__photo');
  const buttonDelete = card.querySelector('.elements__delete');

  const like = card.querySelector('.elements__like');

  img.src = data.link;
  img.alt = data.name;
  cardTitle.textContent = data.name;

  function addEventListeners() {
    buttonDelete.addEventListener('click', (event) => {
      list.remove(card)
    });
  
    like.addEventListener('click', (event) => {
      like.classList.toggle('elements__like_active')
    });
  
    img.addEventListener('click', (event) => {
      zoomImg.src = event.target.src;
      zoomImg.alt = event.target.alt;
      imgCaption.textContent = event.target.alt;
      popupOpen(popupZoom)
    });
  };

  addEventListeners()

  return card
};

function renderCard(data) {  
  placeInput.value = '';
  linkInput.value = '';
  const newCard = createCard(data);
  list.prepend(newCard);
};

initialCards.forEach(renderCard);

popupAdd.addEventListener('submit', (event) => {
  event.preventDefault()
  renderCard({
    name: placeInput.value,
    link: linkInput.value
  })
});

buttonEditProfile.addEventListener('click', (event) => {
  popupOpen(popupEdit)
  popupEditSaveValue()
});

buttonClosePopup.addEventListener("click", (event) => {
  popupClose(popupEdit)
});

buttonSubmit.addEventListener('click', (event) => {
  popupClose(popupEdit)
})

popupEditForm.addEventListener('submit', (event) => {
  event.preventDefault()
  popupClose(popupEdit)
})

buttonAdd.addEventListener("click", (event) => {
  popupOpen(popupAdd)
});

buttonClosePopupAdd.addEventListener("click", (event) => {
  popupClose(popupAdd)
});

buttonSubmitPopupAdd.addEventListener("click", (event) => {
  popupClose(popupAdd)
});

buttonClosePopupZoom.addEventListener("click", (event) => {
  popupClose(popupZoom)
});

formElement.addEventListener("click", formSubmitHandler);

overlayClickClose(popupAddOverlay, popupAdd);

overlayClickClose(popupEditOverlay, popupEdit);

overlayClickClose(popupZoomOverlay, popupZoom);

document.addEventListener("keydown", (event) => {
  keyFind(event, popupAdd);
  keyFind(event, popupEdit);
  keyFind(event, popupZoom);
});