import {loginFields} from './loginFields.js'
import {registerUserFields} from './registerUserFields.js'

export let FormType = {
    LOGIN: "LOGIN",
    USER_REGISTER: "USER_REGISTER",
    NEW_PASSWORD: "NEW_PASSWORD"
}

export let getForm = formType => {
    switch (formType) {
        case FormType.LOGIN:
            return loginFields;
        case FormType.USER_REGISTER:
            return registerUserFields;
    }
}