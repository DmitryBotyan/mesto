export default class Popup {
    constructor(popupSelector) {
        this._element = document.querySelector(popupSelector);
        this._buttonClose = this._element.querySelector('.popup__close-button');
        this._handleEscCloseRef = this._handleEscClose.bind(this);
    }

    open() {
        this._element.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEscCloseRef)
    }

    close() {
        this._element.classList.remove('popup_opened')
        document.removeEventListener('keydown', this._handleEscCloseRef)
    }

    _handleOverlayClose(event) {
        this._popupContainer = event.currentTarget
        if (event.target === this._popupContainer) {
            this.close()
            }
        }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close()
          }
    }

    setEventListeners() {
        this._buttonClose.addEventListener('click', () => {
            this.close()
        })

        this._element.addEventListener('click', () => {
            this._handleOverlayClose(event)
        })
    }
}