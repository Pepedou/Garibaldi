import * as constants from "../constants";

export let checkCardsReducer = (state = [], action) => {
  let { type, cardId } = action;
  switch (type) {
    case constants.ADD_CHECK_CARD:
      return [...state, cardId];

    case constants.DELETE_CHECK_CARD:
      let index = state.indexOf(cardId);
      return [...state.slice(0, index), ...state.slice(index + 1)];

    case constants.CLEAR_CHECK_CARDS:
      return [];

    default:
      return state;
  }
};
