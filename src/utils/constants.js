export const validationConfig = {
  inputSelector: ".input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "input_type_error",
  errorClass: "popup__error-text_visible",
};

export const configApi = {
  id: "cohort-58",
  headers: {
    "Content-Type": "application/json",
    authorization: "0570ef48-f4e2-4392-b90c-178e3b6f8dfe",
  },
};

export const buttonEditProfile = document.querySelector(
  ".profile__edit-button"
);
export const popupEditUserInform = document.querySelector(".popup_edit");
export const popupAddNewCard = document.querySelector(".popup_add");
export const buttonAdd = document.querySelector(".profile__add-button");
export const nameInput = document.querySelector(".popup__name");
export const jobInput = document.querySelector(".popup__job");
export const profilePhoto = document.querySelector(".profile__avatar");
export const profileName = document.querySelector(".profile__title");
export const profileInfo = document.querySelector(".profile__subtitle");
export const popupEditUserPhoto = document.querySelector(".popup_edit-photo");
export const popupEditSubmitButton = popupEditUserInform.querySelector(".popup__button");
export const popupAddSubmitButton = popupAddNewCard.querySelector(".popup__button");
export const popupEditUserPhotoSubmitButton = popupEditUserPhoto.querySelector(".popup__button");