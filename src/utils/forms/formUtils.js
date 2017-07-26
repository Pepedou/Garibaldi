import {loginFields} from './loginFields.js'
import {registerUserFields} from './registerUserFields.js'
import {newPasswordFields} from './newPasswordFields.js'
import {newArtFields} from './newArtFields.js'

export let FormType = {
    LOGIN: "LOGIN",
    USER_REGISTER: "USER_REGISTER",
    NEW_PASSWORD: "NEW_PASSWORD",
    NEW_ART: "NEW_ART"
}

export let getForm = formType => {
    switch (formType) {
        case FormType.LOGIN:
            return loginFields;
        case FormType.USER_REGISTER:
            return registerUserFields;
        case FormType.NEW_PASSWORD:
            return newPasswordFields;
        case FormType.NEW_ART:
            return newArtFields;
        default:
            return [];
    }
}