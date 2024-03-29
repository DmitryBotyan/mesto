import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { formSubmit }) {
    super(popupSelector);
    this.formSubmit = formSubmit;
    this._form = document.querySelector(popupSelector);
    this._inputList = this._form.querySelectorAll(".input");
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", () => {
      event.preventDefault();
      const inputValues = this._getInputValues();
      this.formSubmit(inputValues);
    });
  }

  close() {
    super.close();
  }

  open() {
    super.open();
    this._inputList.forEach((input) => {
      input.value = "";
    });
  }
}
