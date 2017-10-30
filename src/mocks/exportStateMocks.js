export const mockedExportState = {
    currentTemplate: {
        id: "",
        name: "",
        logo: "",
        logoPosition: "",
        background: "",
        backgroundPosition: "",
        lineColor: ""
    },
    exportTemplates: {
        ID1000: {
            id: "ID1000",
            name: "Plantilla1",
            logo: "image1.png",
            logoPosition: "logo-top-left",
            background: "image2.png",
            backgroundPosition: "back-center",
            lineColor: "#FFFFFF"
        },
        ID1001: {
            id: "ID1001",
            name: "Plantilla2",
            logo: "image2.png",
            logoPosition: "logo-top-right",
            background: "image3.png",
            backgroundPosition: "back-full",
            lineColor: "#F0F0F0"
        }
    },
    exportFile: {
        id: "ID2000",
        template: "1000",
        pages: ["3001", "3002"]
    },
    exportPages: {
        ID3001: {
            id: "ID3001",
            type: "Artist",
            title: "",
            image: "image_in_page.png",
            withImage: true,
            categories: ["ID4000"]
        }
    },
    exportCategories: {
        ID4000: {
            id: "ID4000",
            label: "Integrantes",
            value: "Lisa, Jisoo, Jenny, Rosé"
        }
    },
    exportArtists: {
        ID5000: {
            id: "ID5000",
            profilesImages: ["1.jpg", "2.jpg"],
            name: "LISA",
            categories: ["ID4000"]
        }
    },
    exportArtPieces: {
        ID6000: {
            id: "ID6000",
            image: "1.jpg",
            title: "LISA",
            categories: ["ID4000"]
        }
    }
}
