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
const nameInput = formElement.querySelector(".popup__name");
const jobInput = formElement.querySelector(".popup__job");
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


function popupEditOpen() {
  popupEdit.classList.add("popup_opened");
  nameInput.value = name.textContent; 
  jobInput.value = job.textContent; 
};
function popupEditClose() {
  popupEdit.classList.remove("popup_opened");
};
function popupAddOpen() {
  popupAdd.classList.add("popup_opened");
};
function popupAddClose() {
  popupAdd.classList.remove("popup_opened");
};
function popupZoomOpen() {
  popupZoom.classList.add('popup_opened');
};
function popupZoomClose() {
  popupZoom.classList.remove('popup_opened');
}

function formSubmitHandler(event) {
  event.preventDefault();

  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
};


function createCard() {
  const linkInput = document.querySelector('.popup__link'); 
  const placeInput = document.querySelector('.popup__place');
  const place = placeInput.value;
  const template = document.querySelector('#card').content; 
  const card = template.cloneNode(true);

  const cardTitle = card.querySelector('.elements__title');
  const img = card.querySelector('.elements__photo');
  const buttonDelete = card.querySelector('.elements__delete');
  const like = card.querySelector('.elements__like');
 
  
  link = linkInput.value;
  img.src = link;
  img.alt = place;
  cardTitle.textContent = place;

  function deleteCard(event) {
    const eventTarget = event.target;
    const cardItem = eventTarget.closest('.elements__element');
    cardItem.remove();
  } 
  buttonDelete.addEventListener('click', deleteCard);
  
  function letlike() {
    like.classList.toggle('elements__like_active')
  }; 
  like.addEventListener('click', letlike); 

  function imageZoom(event) {
    zoomImg.src = event.target.src;
    zoomImg.alt = event.target.alt;
    imgCaption.textContent = event.target.alt;
    popupZoomOpen()
  };
  
  img.addEventListener('click', imageZoom);

  return card
};

function renderCard() {
  const renderedCard = createCard();
  list.prepend(renderedCard)
}

buttonEditProfile.addEventListener("click", popupEditOpen);
buttonClosePopup.addEventListener("click", popupEditClose);
buttonSubmit.addEventListener("click", popupEditClose);
buttonAdd.addEventListener("click", popupAddOpen);
buttonClosePopupAdd.addEventListener("click", popupAddClose);
buttonClosePopupZoom.addEventListener('click', popupZoomClose);
buttonSubmitPopupAdd.addEventListener("click", popupAddClose);
formElement.addEventListener("submit", formSubmitHandler);
buttonSubmitPopupAdd.addEventListener('click', renderCard);
