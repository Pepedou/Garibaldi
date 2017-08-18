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
        .then(res => res.json())
    }

    getById(id) {
        return fetch(`${baseUrl}/ArtPieces/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
        .then(res => res.json())
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
}

export default new ArtPieceServices()