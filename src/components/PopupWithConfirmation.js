import Popup from "./Popup.js"

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector,  {formSubmit}) {
        super(popupSelector)
        this.formSubmit = formSubmit
        this._popup = document.querySelector(popupSelector)
    }

    setEventListeners() {
        super.setEventListeners()
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handler();
            this.formSubmit();
        })
    }
    setSubmitHandler(handler) {
        this._handler = handler;
    }
}