export default class UserInfo {
    constructor({nameSelector, infoSelector, photoSelector}) {
        this._profileName = document.querySelector(nameSelector);
        this._profileInfo = document.querySelector(infoSelector);
        this._profilePhoto = document.querySelector(photoSelector);
    }
    
    getUserInfo() {
        const userInfoArray = {
            userName: this._profileName.textContent,
            userInfo: this._profileInfo.textContent,
            userPhoto: this._profilePhoto.src
        }

        return userInfoArray
    }

    setUserInfo({userName, userInfo, userPhoto}) {
        this._profileName.textContent = userName
        this._profileInfo.textContent = userInfo
        this._profilePhoto.src = userPhoto
    }
}