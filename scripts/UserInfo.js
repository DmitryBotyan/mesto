export default class UserInfo {
    constructor({userName, userInfo}) {
        this._profileName = document.querySelector(userName);
        this._profileInfo = document.querySelector(userInfo);
        this._nameInput = document.querySelector('.popup__name')
        this._jobInput = document.querySelector('.popup__job')
    }
    
    getUserInfo() {
        const getInfo = {
            userName: this._profileName.textContent,
            userInfo: this._profileInfo.textContent
        }

        this._nameInput.value = getInfo.userName
        this._jobInput.value = getInfo.userInfo
    }

    setUserInfo({userName, userInfo}) {
        this._profileName.textContent = userName
        this._profileInfo.textContent = userInfo
    }
}