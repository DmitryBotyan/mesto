export default class FormValidator {
    constructor(settings, formElement) {
        this._element = formElement;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
    }

    _showInputError(inputElement) {
        const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
    }

    _checkValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement)
        }
        else {
            this._hideInputError(inputElement)
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid
        })
    }

    _toggleButtonState(inputList) {
        const buttonElement = this._element.querySelector(this._submitButtonSelector)
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
          } 
            else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
          } 
    }

    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkValidity(inputElement);
                this._toggleButtonState(inputList);
            })
    })
    }

    enableValidation() {
        this._setEventListeners(this._element)
    }
};