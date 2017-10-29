export let exportTemplates = {
    "1000": {
        "id": "1000",
        "name": "Plantilla1",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png",
        "logoPosition": "right",
        "background": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png",
        "backgroundPosition": "rightBottom",
        "lineColor": "#D4D600"
    },
    "1001": {
        "id": "1001",
        "name": "Plantilla2",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png",
        "logoPosition": "left",
        "background": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png",
        "backgroundPosition": "rightBottom",
        "lineColor": "#D4D600"
    }
}

export let exportFiles = {
    "file": {
        "id": "2000",
        "template": "1000",
        "pages": ["3001", "3002"]
    }
}

export let exportPages = {
    "3001": {
        "id": "3001",
        "type": "artist",
        "imagesSelection": ["https://s-media-cache-ak0.pinimg.com/originals/09/6e/aa/096eaa93bdb91b579ea764dbc516ac2b.jpg", "https://s-media-cache-ak0.pinimg.com/originals/09/6e/aa/096eaa93bdb91b579ea764dbc516ac2b.jpg"],
        "title": "Maria Hernandez",
        "image": "https://s-media-cache-ak0.pinimg.com/originals/09/6e/aa/096eaa93bdb91b579ea764dbc516ac2b.jpg",
        "withImage": true,
        "categories": ["4000", "4001", "4003"]
    },
    "3002": {
        "id": "3002",
        "type": "artist",
        "imagesSelection": ["https://s-media-cache-ak0.pinimg.com/originals/09/6e/aa/096eaa93bdb91b579ea764dbc516ac2b.jpg", "https://s-media-cache-ak0.pinimg.com/originals/09/6e/aa/096eaa93bdb91b579ea764dbc516ac2b.jpg"],
        "title": "Jose Lopez",
        "image": "https://s-media-cache-ak0.pinimg.com/originals/09/6e/aa/096eaa93bdb91b579ea764dbc516ac2b.jpg",
        "withImage": true,
        "categories": ["4004", "4002", "4005"]
    }
}

export let exportCategories = {
    "4000": {
        "id": "4000",
        "label": "Integrantes",
        "value": "Lisa, Jisoo, Jenny, Rosé"
    },
    "4001": {
        "id": "4000",
        "label": "Integrantes",
        "value": "Lisa, Jisoo, Jenny, Rosé"
    },
    "4002": {
        "id": "4000",
        "label": "Integrantes",
        "value": "Lisa, Jisoo, Jenny, Rosé"
    },
    "4003": {
        "id": "4000",
        "label": "Integrantes",
        "value": "Lisa, Jisoo, Jenny, Rosé"
    },
    "4004": {
        "id": "4000",
        "label": "Integrantes",
        "value": "Lisa, Jisoo, Jenny, Rosé"
    },
    "4005": {
        "id": "4000",
        "label": "Integrantes",
        "value": "Lisa, Jisoo, Jenny, Rosé"
    }
}

export let exportArtists = {
    "3001": {
        "id": "3001",
        "profilesImages": ["https://s-media-cache-ak0.pinimg.com/originals/09/6e/aa/096eaa93bdb91b579ea764dbc516ac2b.jpg", "https://s-media-cache-ak0.pinimg.com/originals/09/6e/aa/096eaa93bdb91b579ea764dbc516ac2b.jpg"],
        "name": "LISA",
        "categories": ["4000", "4001", "4002", "4003"]
    },
    "3002": {
        "id": "3002",
        "profilesImages": ["https://s-media-cache-ak0.pinimg.com/originals/09/6e/aa/096eaa93bdb91b579ea764dbc516ac2b.jpg", "https://s-media-cache-ak0.pinimg.com/originals/09/6e/aa/096eaa93bdb91b579ea764dbc516ac2b.jpg"],
        "name": "LISA",
        "categories": ["4000"]
    }
}

export let exportArtPieces = {
    "6000": {
        "id": "6000",
        "image": "https://s-media-cache-ak0.pinimg.com/originals/09/6e/aa/096eaa93bdb91b579ea764dbc516ac2b.jpg",
        "title": "LISA",
        "categories": ["4000"]
    }
}