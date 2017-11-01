import apiRoutes from './apiRoutes'

const baseUrl = `${apiRoutes.getServiceUrl()}/api`

class ArtPieceServices {
    getAll() {
        return fetch(`${baseUrl}/ArtPieces`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('La información de las obras no se puede consultar en este momento');
            } else {
                return res.json()
            }
        })
    }

    getById(id) {
        return fetch(`${baseUrl}/ArtPieces/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('No se puede consultar la información de la obra en este momento');
            } else {
                return res.json()
            }
        })
    }

    getDetail(id) {
        return fetch(`${baseUrl}/ArtPieces/${id}/getArtPieceDetail`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('No se puede consultar la información de la obra en este momento');
            } else {
                return res.json()
            }
        })
    }

    create(artPiece) {
        return fetch(`${baseUrl}/ArtPieces`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artPiece)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('La obra no se pudo crear');
            }
        })
    }

    update(id, artPiece) {
        return fetch(`${baseUrl}/ArtPieces/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artPiece)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('La obra no se pudo editar');
            }
        })
    }

    destroy(id) {
        return fetch(`${baseUrl}/ArtPieces/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('La obra no se pudo eliminar');
            }
        })
    }

    destroyMany(ids) {
        const toEliminate = {
            ids: ids
        }

        return fetch(`${baseUrl}/ArtPieces/eliminate`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toEliminate)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Las obras no se pudieron eliminar');
            }
        })
    }

    detailFor(ids) {
        const jsonIds = JSON.stringify(ids)

        return fetch(`${baseUrl}/ArtPieces/detailFor?artPiecesIds=${jsonIds}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Las obras no se pudieron obtener');
            }

            return res.json()
        })
    }
}

export default new ArtPieceServices()