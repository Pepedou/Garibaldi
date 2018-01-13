import apiRoutes from './apiRoutes'

const baseUrl = `${apiRoutes.getServiceUrl()}/api`

class CulturalHelpersServices {
    getAll() {
        return fetch(`${baseUrl}/CulturalHelpers/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('No se pueden consultar los Gestores Culturales');
            } 
            return res.json()
        })
    }
}

export default new CulturalHelpersServices()