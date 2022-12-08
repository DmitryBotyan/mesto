export class Card {
    constructor({data, handleCardClick}, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._cardElement = templateSelector;
      this.handleCardClick = handleCardClick;
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
      this._cardImage = this._element.querySelector('.elements__photo');
      this._cardImage.src = this._link;
      this._element.querySelector('.elements__title').textContent = this._name;
      this._cardImage.alt = this._name;
      this._setEventListeners();
      return this._element;
    }

    _letLike() {
      this._likeButton.classList.toggle('elements__like_active');
    }
  
    _deleteCard() {
      this._element.remove()
    }

    _setEventListeners() {
      this._likeButton = this._element.querySelector('.elements__like');
      const deleteButton = this._element.querySelector('.elements__delete');
  
      this._likeButton.addEventListener('click', () => {
        this._letLike()
      })
  
      deleteButton.addEventListener('click', () => {
        this._deleteCard()
      })
  
      this._cardImage.addEventListener('click', () => {
        this.handleCardClick({
          name: this._name, 
          link: this._link
        });
      })
    }
  };