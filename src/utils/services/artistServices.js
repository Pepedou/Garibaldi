import apiRoutes from "./apiRoutes";

const baseUrl = `${apiRoutes.getServiceUrl()}/api`;

class ArtistServices {
  getAll() {
    return fetch(`${baseUrl}/Artists`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (!res.ok) {
        throw new Error(
          "No se puede consultar la información de los artistas por el momento"
        );
      } else {
        return res.json();
      }
    });
  }

  getDetail(id) {
    return fetch(`${baseUrl}/Artists/${id}/getArtistDetail`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (!res.ok) {
        throw new Error(
          "El detalle del artista no se puede consultar en este momento"
        );
      } else {
        return res.json();
      }
    });
  }

  update(id, artist) {
    return fetch(`${baseUrl}/Artists/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(artist)
    }).then(res => {
      if (!res.ok) {
        throw new Error("El artista no se pudo editar");
      }
    });
  }

  destroy(id) {
    return fetch(`${baseUrl}/Artists/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (!res.ok) {
        throw new Error("El artista no se pudo eliminar");
      }
    });
  }

  create(artist) {
    return fetch(`${baseUrl}/Artists`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(artist)
    }).then(res => {
      if (!res.ok) {
        throw new Error("El artista no se pudo crear");
      }
    });
  }

  destroyMany(ids) {
    const toEliminate = {
      ids: ids
    };

    return fetch(`${baseUrl}/Artists/eliminate`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(toEliminate)
    }).then(res => {
      if (!res.ok) {
        throw new Error("Los artistas no se pudieron eliminar");
      }
    });
  }

  detailFor(ids) {
    const jsonIds = JSON.stringify(ids);

    return fetch(`${baseUrl}/Artists/detailFor?artistsIds=${jsonIds}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (!res.ok) {
        throw new Error("Los artistas no se pudieron obtener");
      } else {
        return res.json();
      }
    });
  }
}

export default new ArtistServices();
