export default class Popup {
    constructor(popupSelector) {
        this._element = document.querySelector(popupSelector);
        this._closeButton = this._element.querySelector('.popup__close-button');
        this._handleEscCloseRef = this._handleEscClose.bind(this);
    }

    handlePopupOpen() {
        this._element.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEscCloseRef)
    }

    handlePopupClose() {
        this._element.classList.remove('popup_opened')
        document.removeEventListener('keydown', this._handleEscCloseRef)
    }

    _handleOverlayClose(event) {
        this._popupContainer = event.currentTarget
        if (event.target === this._popupContainer) {
            this.handlePopupClose()
            }
        }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.handlePopupClose()
          }
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => {
            this.handlePopupClose()
        })

        this._element.addEventListener('submit', (event) => {
            event.preventDefault();
            this.handlePopupClose()
        })

        this._element.addEventListener('click', () => {
            this._handleOverlayClose(event)
        })
    }
}