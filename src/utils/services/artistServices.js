import apiRoutes from './apiRoutes'

const baseUrl = `${apiRoutes.getServiceUrl()}/api`

class ArtistServices {
    update(id, artist) {
        return fetch(`${baseUrl}/Artists/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artist)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('El artista no se pudo editar');
            }
        })
    }

    destroy(id) {
        return fetch(`${baseUrl}/Artists/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('El artista no se pudo eliminar');
            }
        })
    }

    destroyMany(ids) {
        const toEliminate = {
            ids: ids
        }

        return fetch(`${baseUrl}/Artists/eliminate`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toEliminate)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Los artistas no se pudieron eliminar');
            }
        })
    }
}

export default new ArtistServices()