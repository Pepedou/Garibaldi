export let exportTemplates = {
    "1000": {
        "id": "1000",
        "name": "Plantilla1",
        "logo": "image1.png",
        "logoPosition": "logo-top-left",
        "background": "image2.png",
        "backgroundPosition": "back-center",
        "lineColor": "#FFFFFF"
    },
    "1001": {
        "id": "1001",
        "name": "Plantilla2",
        "logo": "image2.png",
        "logoPosition": "logo-top-right",
        "background": "image3.png",
        "backgroundPosition": "back-full",
        "lineColor": "#F0F0F0"
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
        "imagesSelection": ["https://s-media-cache-ak0.pinimg.com/originals/09/6e/aa/096eaa93bdb91b579ea764dbc516ac2b.jpg", "https://s-media-cache-ak0.pinimg.com/originals/09/6e/aa/096eaa93bdb91b579ea764dbc516ac2b.jpg"],
        "title": "Maria Hernandez",
        "image": "",
        "withImage": true,
        "categories": ["4000", "4001", "4003"]
    },
    "3002": {
        "id": "3002",
        //"imagesSelection": ["https://s-media-cache-ak0.pinimg.com/originals/09/6e/aa/096eaa93bdb91b579ea764dbc516ac2b.jpg", "https://s-media-cache-ak0.pinimg.com/originals/09/6e/aa/096eaa93bdb91b579ea764dbc516ac2b.jpg"],
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