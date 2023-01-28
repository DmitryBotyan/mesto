import Popup from "./Popup.js"

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, {formSubmit}) {
        super(popupSelector)
        this.formSubmit = formSubmit
        this._popup = document.querySelector(popupSelector)
        this._isConfirm = false
    }
    
    setEventListeners() {
        super.setEventListeners()

        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._isConfirm = true
            this.formSubmit(this._isConfirm)
            this.handlePopupClose()
        })
    }
    
    handlePopupOpen() {
        super.handlePopupOpen()
    }
}