import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {formSubmit}) {
        super(popupSelector)
        this.formSubmit = formSubmit
        this._form = document.querySelector(popupSelector)
        this._inputList = this._form.querySelectorAll('.input')
    }
    
    _getInputValues() {
        this._nameInput = this._inputList[0]
        this._aboutInput = this._inputList[1]
        const values = {
            name: this._nameInput.value,
            about: this._aboutInput.value
        }
        return values
    }
    
    setEventListeners() {
        super.setEventListeners()

        this._form.addEventListener('submit', () => {
            const inputValues = this._getInputValues()
            this.formSubmit(inputValues)
        })
    }

    handlePopupClose() {
        super.handlePopupClose()
    }
}