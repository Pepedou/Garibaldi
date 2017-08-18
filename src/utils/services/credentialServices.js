import apiRoutes from './apiRoutes'

const baseUrl = `${apiRoutes.getServiceUrl()}/api`

class CredentialServices {
    update(id, credential) {
        return fetch(`${baseUrl}/Credentials/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credential)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('El usuario no se pudo editar');
            }
        })
    }
}

export default new CredentialServices()