import {UserTypes} from '../utils/constants/UserTypes'
import {PageTypes} from '../utils/constants/PageTypes'
import ApiRoutes from '../utils/services/apiRoutes'

let getArtGalleryFilterOptions = user => {
    let defaultOptions = [
      {value:"title", filter: "Nombre de la pieza"},
      {value:"year", filter: "Año"}
    ]

    if(UserTypes.GESTOR_CULTURAL){
      defaultOptions.push({value:"author", filter: "Artista"})
    }

    return defaultOptions
}

let getArtistsFilterOptions= user => [
  {value:"name", filter: "Nombre del artista"},
  {value:"lastName", filter: "Apellido del artista"}
]

export let getFilterOptions = (user, page) => {
  if(page === PageTypes.ART_GALLERY) {
    return getArtGalleryFilterOptions(user)
  } else if(page === PageTypes.ARTISTS){
    return getArtistsFilterOptions(user)
  } else {
    return []
  }
}