import {UserTypes} from '../utils/constants/UserTypes'
import {PageTypes} from '../utils/constants/PageTypes'

let getArtGalleryFilterOptions = user => {
    let defaultOptions = [
      {value:"1", filter: "Todo"},
      {value:"2", filter: "Nombre de la pieza"},
      {value:"3", filter: "Año"}
    ]

    if(UserTypes.GESTOR_CULTURAL){
      defaultOptions.push({value:"4", filter: "Artista"})
    }

    return defaultOptions
}

let getArtistsFilterOptions= user => [
  {value:"1", filter: "Todo"},
  {value:"2", filter: "Nombre del artista"},
  {value:"3", filter: "Corriente"}
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

export let getFilterService = () => {
  let currentLocation = window.location.href
  if(currentLocation.includes("home")) {
    return "https://lagunilla.herokuapp.com/api/" //TODO: Poner servicio
  } else if(currentLocation.includes("artists")) {
    return "https://lagunilla.herokuapp.com/api/" //TODO: Poner servicio
  } else {
    return ""
  }
}