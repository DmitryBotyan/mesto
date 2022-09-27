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
const name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__subtitle");
const buttonAdd = document.querySelector('.profile__add-button');
const imgCaption = popupZoom.querySelector('.popup__img-caption');
const zoomImg = popupZoom.querySelector('.popup__zoom-img');
const list = document.querySelector('.elements');

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
}

function popupClose(popup) {
  popup.classList.remove("popup_opened");
}

function popupEditSaveValue() {
  nameInput.value = name.textContent; 
  jobInput.value = job.textContent; 
}

function formSubmitHandler(event) {
  event.preventDefault();

  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
};


const placeInput = document.querySelector('.popup__place')
const place = placeInput.value;

const linkInput = document.querySelector('.popup__link');
const link = linkInput.value

function createCard(place, link) {
  event.preventDefault();
  const template = document.querySelector('#card').content;
  const card = template.cloneNode(true);
  const cardTitle = card.querySelector('.elements__title');
  const img = card.querySelector('.elements__photo');
  const buttonDelete = card.querySelector('.elements__delete');
  const like = card.querySelector('.elements__like');
  
  img.src = link;
  img.alt = place;
  cardTitle.textContent = place;

  function addEventListeners() {
    buttonDelete.addEventListener('click', (event) => {
      const eventTarget = event.target;
      const cardItem = eventTarget.closest('.elements__element');
      cardItem.remove();
    })
  
    like.addEventListener('click', (event) => {
      like.classList.toggle('elements__like_active')
    });
  
    img.addEventListener('click', (event) => {
      zoomImg.src = event.target.src;
      zoomImg.alt = event.target.alt;
      imgCaption.textContent = event.target.alt;
      popupOpen(popupZoom)
    });
  }

  addEventListeners()

  return card
};

function renderCard() {
  const renderedCard = createCard(placeInput.value, linkInput.value);
  list.prepend(renderedCard)
}

initialCards.forEach(function(element) {
  const template = document.querySelector('#card').content;
  const card = template.cloneNode(true);
  const buttonDelete = card.querySelector('.elements__delete');
  const like = card.querySelector('.elements__like');
  const img = card.querySelector('.elements__photo');

  card.querySelector('.elements__title').textContent = element.name;
  card.querySelector('.elements__photo').src = element.link;
  card.querySelector('.elements__photo').alt = element.name;
  
  function addEventListeners() {
    buttonDelete.addEventListener('click', (event) => {
      const eventTarget = event.target;
      const cardItem = eventTarget.closest('.elements__element');
      cardItem.remove();
    })
  
    like.addEventListener('click', (event) => {
      like.classList.toggle('elements__like_active')
    });
  
    img.addEventListener('click', (event) => {
      zoomImg.src = event.target.src;
      zoomImg.alt = event.target.alt;
      imgCaption.textContent = event.target.alt;
      popupOpen(popupZoom)
    });
  }

  addEventListeners()

  list.append(card)
})

buttonEditProfile.addEventListener('click', (event) => {
  popupOpen(popupEdit)
  popupEditSaveValue()
})

buttonClosePopup.addEventListener("click", (event) => {
  popupClose(popupEdit)
});

buttonSubmit.addEventListener("submit", (event) => {
  popupClose(popupEdit)
});

buttonAdd.addEventListener("click", (event) => {
  popupOpen(popupAdd)
});

buttonClosePopupAdd.addEventListener("click", (event) => {
  popupClose(popupAdd)
});

buttonSubmitPopupAdd.addEventListener("submit", (event) => {
  popupClose(popupAdd)
  renderCard()
});

buttonClosePopupZoom.addEventListener("click", (event) => {
  popupClose(popupZoom)
});

formElement.addEventListener("click", formSubmitHandler);