import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._image = document.querySelector('.popup__zoom-img')
        this._caption = document.querySelector('.popup__img-caption')
    }

    imageZoom(title, image) {  
        this._caption.textContent = title
        this._image.src = image
        this._image.alt = title
        super.handlePopupOpen()
    }
}