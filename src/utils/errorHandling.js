import * as constants from "../redux/constants";
import { NotificationTypes } from "../components/alerts/notifications/NotificationTypes";

export let ERROR_CODES = {
  LOGIN_ERROR: { code: "LOGIN_FAILED", message: "Credenciales incorrectas" },
  REQUIRED_FIELDS: {
    code: "REQUIRED_FIELDS",
    message: "Ingrese la información de los campos marcados en rojo"
  },
  NO_RESULTS_FOUND: {
    code: "NO_RESULTS_FOUND",
    message: "No hay resultados para la búsqueda especificada"
  },
  NO_CARDS_FOUND: {
    code: "NO_CARDS_FOUND",
    message: "No se encontraron tarjetas para esta página"
  },
  CHECK_FIELDS: {
    code: "CHECK_FIELDS",
    message: "Verifique la información de los campos marcados en rojo"
  },
  WRONG_IMAGE: {
    code: "WRONG_IMAGE",
    message:
      "La imagen seleccionada no cumple con las características requeridas"
  },
  CANT_SAVE_IMAGE: {
    code: "CANT_SAVE_IMAGE",
    message: "No se pudo guardar la imagen"
  },
  REQUIRED_FIELDS_NEW_ART: {
    code: "REQUIRED_FIELDS_NEW_ART",
    message:
      "Seleccione la imagen de la obra e ingrese la información de los campos marcados en rojo (en los campos con catálogos asegurese de seleccionar una opción correcta)"
  }
};

let getErrorMessage = error => {
  switch (error.code) {
    case ERROR_CODES.LOGIN_ERROR.code:
      return ERROR_CODES.LOGIN_ERROR.message;
    case ERROR_CODES.REQUIRED_FIELDS.code:
      return ERROR_CODES.REQUIRED_FIELDS.message;
    case ERROR_CODES.NO_RESULTS_FOUND.code:
      return ERROR_CODES.NO_RESULTS_FOUND.message;
    case ERROR_CODES.NO_CARDS_FOUND.code:
      return ERROR_CODES.NO_CARDS_FOUND.message;
    case ERROR_CODES.CHECK_FIELDS.code:
      return ERROR_CODES.CHECK_FIELDS.message;
    case ERROR_CODES.WRONG_IMAGE.code:
      return ERROR_CODES.WRONG_IMAGE.message;
    case ERROR_CODES.CANT_SAVE_IMAGE.code:
      return ERROR_CODES.CANT_SAVE_IMAGE.message;
    case ERROR_CODES.REQUIRED_FIELDS_NEW_ART.code:
      return ERROR_CODES.REQUIRED_FIELDS_NEW_ART.message;
    default:
      return error.message;
  }
};

export let handleError = (dispatch, error, notificationType, contentType) => {
  let type = notificationType || NotificationTypes.DANGER;
  dispatch({
    type: constants.ADD_NOTIFICATION,
    notification: { type, contentType: "text", message: getErrorMessage(error) }
  });
};
