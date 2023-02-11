class Api {
    constructor({id, headers}) {
        this._id = id
        this._headers = headers
    }

    _getResponseData(res) {
    if (res.ok) {
        return res.json()
    }
    else {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    
}
    
    getCardList() {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._id}/cards`, {
            headers: this._headers
            })
           .then((res) => {
                return res.json()
            })
        }
    
    addNewCard({name, link}) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._id}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                name, link
            })
            })
        }
    deleteCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._id}/cards/${cardId}`, {
            headers: this._headers,
            method: 'DELETE'
            })
    }
    letLike(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._id}/cards/${cardId}/likes`, {
            headers: this._headers,
            method: 'PUT',
            })
    }
    deleteLike(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._id}/cards/${cardId}/likes`, {
            headers: this._headers,
            method: 'DELETE',
            })
    }
    getUserInform() {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._id}/users/me`, {
            headers: this._headers
            })
            .then((res) => {
                if (res.ok) {
                  return res.json()  
                }               
            })
        }
    editUserInfo({name, about}) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._id}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name, about
            })
            })
        }
    updateProfilePhoto({avatar}) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._id}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar
            })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
            })
    }
    }
export default Api