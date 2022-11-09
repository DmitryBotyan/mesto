import openPopup from "./index.js";
import { popupZoom } from "./index.js";

export default class Card {
    constructor(name, link) {
      this._name = name;
      this._link = link;
    }
  
    _getTemplate() {
      const cardElement = document
      .querySelector('#card')
      .content
      .querySelector('.elements__element')
      .cloneNode(true)
      return cardElement
    }
    
    generateCard() {
      this._element = this._getTemplate();
      this._element.querySelector('.elements__photo').src = this._link;
      this._element.querySelector('.elements__title').textContent = this._name;
      this._setEventListeners();
      return this._element;
    }
  
    _letLike() {
      this._element.querySelector('.elements__like').classList.toggle('elements__like_active');
    }
  
    _deleteCard() {
      this._element.remove()
    }
  
    _imageZoom(popup) {
      openPopup(popup)
    }
  
    _setEventListeners() {
      const likeButton = this._element.querySelector('.elements__like');
      const deleteButton = this._element.querySelector('.elements__delete');
      const cardImage = this._element.querySelector('.elements__photo');
      const zoomImage = document.querySelector('.popup__zoom-img');
      const imageCaption = document.querySelector('.popup__img-caption');
  
      likeButton.addEventListener('click', () => {
        this._letLike()
      })
  
      deleteButton.addEventListener('click', () => {
        this._deleteCard()
      })
  
      cardImage.addEventListener('click', () => {
        zoomImage.src = this._link;
        imageCaption.textContent = this._name;
        this._imageZoom(popupZoom)
      })
    }
  };