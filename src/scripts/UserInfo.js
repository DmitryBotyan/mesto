export default class UserInfo {
    constructor({nameSelector, infoSelector}) {
        this._profileName = document.querySelector(nameSelector);
        this._profileInfo = document.querySelector(infoSelector);
    }
    
    getUserInfo() {
        const userInfoArray = {
            userName: this._profileName.textContent,
            userInfo: this._profileInfo.textContent
        }

        return userInfoArray
    }

    setUserInfo({userName, userInfo}) {
        this._profileName.textContent = userName
        this._profileInfo.textContent = userInfo
    }
}