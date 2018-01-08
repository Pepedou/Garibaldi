import { loginFields } from "./loginFields.js";
import { registerUserFields } from "./registerUserFields.js";
import { newPasswordFields } from "./newPasswordFields.js";
import { newArtFields } from "./newArtFields.js";
import { newArtistFields } from "./newArtistFields.js";
import { credentialFields } from "./credentialFields.js";
import { resetPasswordFields } from "./resetPasswordFields.js";

export let FormType = {
  LOGIN: "LOGIN",
  USER_REGISTER: "USER_REGISTER",
  NEW_PASSWORD: "NEW_PASSWORD",
  NEW_ART: "NEW_ART",
  NEW_ARTIST: "NEW_ARTIST",
  USER_PROFILE: "USER_PROFILE",
  RESET_PASSWORD: "RESET_PASSWORD"
};

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
    case FormType.NEW_ARTIST:
      return newArtistFields;
    case FormType.USER_PROFILE:
      return credentialFields;
    case FormType.RESET_PASSWORD:
      return resetPasswordFields;
    default:
      return [];
  }
};
