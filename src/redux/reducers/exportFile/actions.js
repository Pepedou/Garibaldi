import * as types from "./actionTypes";
// YOU MAY IMPORT ACTIONS COMING FROM OTHER REDUCERS

// HERE YOU LIST ANY ACTION FUNCTIONS

// Simple dispatch actions examples:

export const updateExportFile = exportFile => {
  return { type: types.EXPORT_FILE_UPDATE_FILE, payload: exportFile };
};

export const resetExportFile = () => {
  return { type: types.EXPORT_FILE_RESET };
};
