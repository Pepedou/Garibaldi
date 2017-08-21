import apiRoutes from './apiRoutes'

const baseUrl = `${apiRoutes.getServiceUrl()}/api`

class CredentialServices {
    getById(id) {
        return fetch(`${baseUrl}/Credentials/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('No se puede consultar la información del usuario');
            } else {
                return res.json()
            }
        })
    }

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
            } else {
                return res.json()
            }
        })
    }

    login(credentials) {
        return fetch(`${baseUrl}/Credentials/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('No se pudo iniciar sesión, verifique las credenciales ingresadas');
            } else {
                return res.json()
            }
        })
    }

    register(user) {
        return fetch(`${baseUrl}/Credentials/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('No se pudo registrar al usuario, intente mas tarde');
            }
        })
    }

    forgotPassword(email) {
        return fetch(`${baseUrl}/Credentials/reset`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(email)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('No se pudo cambiar la contraseña');
            }
        })
    }

    changePassword(passwordValues) {
        return fetch(`${baseUrl}/Credentials/change-password`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(passwordValues)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('No se pudo cambiar la contraseña');
            }
        })
    }
}

export default new CredentialServices()