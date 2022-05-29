let editBtn = document.querySelector(".profile__edit-button");

console.log(editBtn);

let popup = document.querySelector(".popup");

editBtn.addEventListener("click", function popupOpen() {
  popup.classList.add("popup_opened");
});

let closeBtn = document.querySelector(".popup__close-button");

closeBtn.addEventListener("click", function popupClose() {
  popup.classList.remove("popup_opened");
});

let formElement = document.querySelector(".popup__container");

let nameInput = formElement.querySelector(".popup__name");

let jobInput = formElement.querySelector(".popup__job");

let name = document.querySelector(".profile__title");

let job = document.querySelector(".profile__subtitle");

nameInput.value = name.textContent;
jobInput.value = job.textContent;

function formSubmitHandler(evt) {
  evt.preventDefault();
  let name = document.querySelector(".profile__title");
  let job = document.querySelector(".profile__subtitle");
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
}

formElement.addEventListener("submit", formSubmitHandler);
