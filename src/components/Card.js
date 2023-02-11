export class Card {
    constructor({data, handleCardClick, handleLikeClick, handleDeleteIconClick}, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this._owner = data.owner;
      this._cardId = data._id;
      this._cardElement = templateSelector;
      this.handleCardClick = handleCardClick;
      this._handleLikeClick = handleLikeClick;
      this._handleDeleteIconClick = handleDeleteIconClick;
    }

    _getTemplate() {
      const cardElement = document
      .querySelector(this._cardElement)
      .content
      .querySelector('.elements__element')
      .cloneNode(true)
      return cardElement
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._buttonDelete = this._element.querySelector('.elements__delete');
      this._likesCount = this._element.querySelector('.elements__likes-count')
      this._cardImage = this._element.querySelector('.elements__photo');
      this._cardImage.src = this._link;
      this._element.querySelector('.elements__title').textContent = this._name;
      this._cardImage.alt = this._name;
      this._setEventListeners();
      return this._element;
    }

    _isLiked(isLiked) {
      if (isLiked) {
        this._likeButton.classList.add('elements__like_active')
        this._likesCount.textContent = this._likes.length + 1
      }
      else {
        this._likeButton.classList.remove('elements__like_active')
      }
    }

    _addDeleteIcon(isUserCard) {
      if (isUserCard) {
        this._buttonDelete.classList.remove('button_invisible')
      }
      else {
        this._buttonDelete.classList.add('button_invisible')
      }
    }

    _isUserCard() {
      if (this._ownerId = this._cardId) {
        this._addDeleteIcon(false)
      }
      else {
        this._addDeleteIcon(true)
      }
    }

    updateLikeView() {
      this._likesId =  this._likes.find((like) => {
        return like._id
      })
      if (this._ownerId = this._likesId) {
        this._isLiked(true)
      } else {
        this._isLiked(false)
      }
      }

    _setEventListeners() {
      this._likeButton = this._element.querySelector('.elements__like');

      this._isUserCard()

      this._likeButton.addEventListener('click', () => {
        this.updateLikeView()
        this._handleLikeClick(this._cardId)
      })
  
      this._buttonDelete.addEventListener('click', () => {
        this._handleDeleteIconClick(this._cardId)
      })
  
      this._cardImage.addEventListener('click', () => {
        this.handleCardClick({
          name: this._name, 
          link: this._link
        });
      })
    }
  };