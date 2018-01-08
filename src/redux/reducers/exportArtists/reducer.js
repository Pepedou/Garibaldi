import * as actionTypes from "./actionTypes";

// This is a lookup table
export const initialState = {};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.EXPORT_ARTISTS_LOAD_ARTISTS:
      return Object.assign({}, state, action.payload);
    case actionTypes.EXPORT_ARTISTS_RESET:
      return initialState;
    default:
      return state;
  }
}

// SELECTORS
export function getExportArtists(state) {
  return Object.keys(state.exportArtists).map(p => state.exportArtists[p]);
}

export function getExportArtistById(state, id) {
  return state.exportArtists[id];
}
