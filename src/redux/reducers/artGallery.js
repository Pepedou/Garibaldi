import * as constants from "../constants";

export let artGalleryReducer = (state = [], action) => {
  let { type, artGallery } = action;

  switch (type) {
    case constants.ART_GALLERY_RECIEVED:
      return artGallery;

    default:
      return state;
  }
};

export const updatingArtGalleryReducer = (
  state = false,
  { type, updatingArtGallery }
) => {
  switch (type) {
    case constants.UPDATING_ART_GALLERY:
      return updatingArtGallery;
    default:
      return state;
  }
};
