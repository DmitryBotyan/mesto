export default class UserInfo {
    constructor({nameSelector, infoSelector}) {
        this._profileName = document.querySelector(nameSelector);
        this._profileInfo = document.querySelector(infoSelector);
        /*this._nameInput = document.querySelector('.popup__name')
        this._jobInput = document.querySelector('.popup__job')*/
    }
    
    getUserInfo() {
        const userInfoArray = {
            userName: this._profileName.textContent,
            userInfo: this._profileInfo.textContent
        }

        console.log(userInfoArray)

        return userInfoArray
    }

    setUserInfo({userName, userInfo}) {
        this._profileName.textContent = userName
        this._profileInfo.textContent = userInfo
    }
}