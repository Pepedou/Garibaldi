import {UserTypes} from '../utils/constants/UserTypes'
import {PageTypes} from '../utils/constants/PageTypes'

let getArtGalleryFilterOptions = user => {
    let defaultOptions = [
      {value:"1", text: "Nombre de la pieza"},
      {value:"2", text: "Año"}
    ]

    if(UserTypes.GESTOR_CULTURAL){
      defaultOptions.push({value:"3", text: "Artista"})
    }

    return defaultOptions
}

export let getFilterOptions = (user, page) => {
  if(page === PageTypes.ART_GALLERY) {
    return getArtGalleryFilterOptions(user)
  } else if(page === PageTypes.ARTISTS){
    return getArtistsFilterOptions(user)
  } else {
    return []
  }
}

let getArtistsFilterOptions= user => []