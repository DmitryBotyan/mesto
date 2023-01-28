export class Card {
    constructor({data, handleCardClick, handleLikeClick, handleDeleteIconClick}, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
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
      this._cardImage = this._element.querySelector('.elements__photo');
      this._cardImage.src = this._link;
      this._element.querySelector('.elements__title').textContent = this._name;
      this._cardImage.alt = this._name;
      this._setEventListeners();
      return this._element;
    }

    _letLike() {
      this._likeButton.classList.add('elements__like_active')
    }
    
    updateLikeView() {
      const likesCount = this._element.querySelector('.elements__likes-count')
      likesCount.textContent = this._likes.length
    }

    delete() {
      this._element.remove()
    }

    _setEventListeners() {
      this._likeButton = this._element.querySelector('.elements__like');
      const deleteButton = this._element.querySelector('.elements__delete');
      this.updateLikeView()

      this._likeButton.addEventListener('click', () => {
        this.updateLikeView()
        this._letLike()
        this._handleLikeClick(this._cardId)
      })
  
      deleteButton.addEventListener('click', () => {
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