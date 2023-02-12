export class Card {
    constructor({data, handleCardClick, handleLikeClick, handleDeleteLikeClick, handleDeleteIconClick}, templateSelector, userId) {
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this._userId = userId;
      this._ownerId = data.owner._id;
      this._cardId = data._id;
      this._cardElement = templateSelector;
      this.handleCardClick = handleCardClick;
      this._handleLikeClick = handleLikeClick;
      this._handleDeleteLikeClick = handleDeleteLikeClick;
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

      if (this._userId === this._ownerId) {
        this._buttonDelete.classList.remove('button_invisible')
      }
      else{
        this._buttonDelete.classList.add('button_invisible')
      }
      this._likesCount.textContent = this._likes.length
      
      return this._element;
    }

    _isLiked() { 
      return Boolean(this._likes.find(like => like._id === this._userId))
    }

    updateLikeView() {
      const isLiked = this._isLiked()
      if (isLiked) {
        this._handleDeleteLikeClick(this._cardId);
        this._likesCount.textContent = this._likes.length - 1;
      }
      else {
        this._handleLikeClick(this._cardId)
        this._likeButton.classList.add('elements__like_active');
        this._likesCount.textContent = this._likes.length + 1;
      }
      }

    _setEventListeners() {
      this._likeButton = this._element.querySelector('.elements__like');

      this._likeButton.addEventListener('click', () => {
        this.updateLikeView();
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