export let UserTypes = {
  GESTOR_CULTURAL: "CulturalHelper",
  ARTISTA: "Artist"
};

export let getTypeName = type => {
  switch (type) {
    case UserTypes.GESTOR_CULTURAL:
      return "Gestor Cultural";
    case UserTypes.ARTISTA:
      return "Artista";
    default:
      return "";
  }
};
