import {getLoginFields} from './loginFields.js'
import {getRegisterUserFields} from './registerUserFields.js'
import {getNewPasswordFields} from './newPasswordFields.js'
import {getNewArtFields} from './newArtFields.js'
import {getNewArtistsFields} from './newArtistFields.js'
import {getCredentialFields} from './credentialFields.js'
import {getResetPasswordFields} from './resetPasswordFields.js'

export let FormType = {
    LOGIN: "LOGIN",
    USER_REGISTER: "USER_REGISTER",
    NEW_PASSWORD: "NEW_PASSWORD",
    NEW_ART: "NEW_ART",
    NEW_ARTIST: "NEW_ARTIST",
    USER_PROFILE: "USER_PROFILE",
    RESET_PASSWORD: 'RESET_PASSWORD'
}

export let getForm = formType => {
    switch (formType) {
        case FormType.LOGIN:
            return getLoginFields();
        case FormType.USER_REGISTER:
            return getRegisterUserFields();
        case FormType.NEW_PASSWORD:
            return getNewPasswordFields();
        case FormType.NEW_ART:
            return getNewArtFields();
        case FormType.NEW_ARTIST:
            return getNewArtistsFields();
        case FormType.USER_PROFILE:
            return getCredentialFields();
        case FormType.RESET_PASSWORD:
            return getResetPasswordFields();
        default:
            return [];
    }
}