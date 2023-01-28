class Api {
    constructor({id, headers}) {
        this._id = id
        this._headers = headers
    }
    getCardList() {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._id}/cards`, {
            headers: this._headers
            })
            .then((res) => {
                return res.json()
            })
            .catch((err) => {
                console.log(err)
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
            .catch((err) => {
                console.log(err)
            })
        }
    deleteCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._id}/cards/${cardId}`, {
            headers: this._headers,
            method: 'DELETE'
            })
            .catch((err) => {
                console.log(err)
            })
    }
    letLike(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._id}/cards/${cardId}/likes`, {
            headers: this._headers,
            method: 'PUT',
            })
            .catch((err) => {
                console.log(err)
            })
    }
    deleteLike(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._id}/cards/${cardId}/likes`, {
            headers: this._headers,
            method: 'DELETE',
            })
            .catch((err) => {
                console.log(err)
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
            .catch((err) => {
                console.log(err)
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
            .catch((err) => {
                console.log(err)
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
            .catch((err) => {
                console.log(err)
            })
    }
    }
export default Api