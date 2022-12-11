export class FormValidator {
    constructor(settings, formElement) {
        this._element = formElement;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = formElement.querySelector(this._submitButtonSelector);
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

    _toggleInputErrorState(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement)
        }
        else {
            this._hideInputError(inputElement)
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid
        })
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this.toggleButtonDisable()
          } 
            else {
            this._toggleButtonActive()
          } 
    }

    toggleButtonDisable() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    _toggleButtonActive() {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.disabled = false;
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._toggleInputErrorState(inputElement);
                this._toggleButtonState(this._inputList);
            })
    })
    }

    enableValidation() {
        this._setEventListeners()
    }
};