const editBtn = document.querySelector(".profile__edit-button");
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector('.popup_add');
const popupZoom = document.querySelector('.popup_zoom');
const closeBtn = popupEdit.querySelector(".popup__close-button");
const closeBtnPopupAdd = popupAdd.querySelector(".popup__close-button")
const closeBtnPopupZoom = popupZoom.querySelector('.popup__close-button');
const submitBtn = document.querySelector('.popup__button');
const submitBtnAdd = popupAdd.querySelector('.popup__button');
const formElement = document.querySelector(".popup__container");
const nameInput = formElement.querySelector(".popup__name");
const jobInput = formElement.querySelector(".popup__job");
const name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__subtitle");
const addBtn = document.querySelector('.profile__add-button');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  }
]; 

function popupEditOpen() {
  popupEdit.classList.add("popup_opened");
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
  evt.preventDefault();
  const name = document.querySelector(".profile__title");
  const job = document.querySelector(".profile__subtitle");
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
};
function createCard() {
  
  const linkInput = document.querySelector('.popup__link'); 
  const placeInput = document.querySelector('.popup__place');
  const place = placeInput.value;
  const template = document.querySelector('#card').content; 
  const card = template.cloneNode(true);
  const list = document.querySelector('.elements');
  const cardTitle = card.querySelector('.elements__title');
  const img = card.querySelector('.elements__photo');
  const deleteBtn = card.querySelector('.elements__delete');
  const like = card.querySelector('.elements__like');
  const zoomImg = popupZoom.querySelector('.popup__zoom-img');
  const imgCaption = popupZoom.querySelector('.popup__img-caption');
  
  link = linkInput.value;
  img.src = link;
  img.alt = place;
  cardTitle.textContent = place;  

  initialCards.push(place); 
  
  initialCards.push(link);
  
  list.append(card);
  
  function deleteCard(event) {
    const eventTarget = event.target;
    const cardItem = eventTarget.closest('.elements__element');
    cardItem.remove();
  } 
  deleteBtn.addEventListener('click', deleteCard);
  
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
};

editBtn.addEventListener("click", popupEditOpen);
closeBtn.addEventListener("click", popupEditClose);
submitBtn.addEventListener("click", popupEditClose);
addBtn.addEventListener("click", popupAddOpen);
closeBtnPopupAdd.addEventListener("click", popupAddClose);
closeBtnPopupZoom.addEventListener('click', popupZoomClose);
submitBtnAdd.addEventListener("click", popupAddClose);
formElement.addEventListener("submit", formSubmitHandler);
submitBtnAdd.addEventListener('click', createCard);

nameInput.value = name.textContent;
jobInput.value = job.textContent;