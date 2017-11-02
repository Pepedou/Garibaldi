import * as uut from '../reducer'
import { Selector } from 'redux-testkit'
import { mockedExportState } from '../../../../mocks/exportStateMocks'

describe('Template Selectors', () => {
    it('should get current template', () => {
        const expectedState = {
            id: "",
            name: "",
            logo: "",
            logoPosition: "",
            background: "",
            backgroundPosition: "",
            lineColor: ""
        }

        Selector(uut.getCurrentTemplate)
                .expect(mockedExportState)
                .toReturn(expectedState)
    })

    it('should get all templates', () => {
        const expectedState = {
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
        }

        Selector(uut.getAllTemplates)
        .expect(mockedExportState)
        .toReturn(expectedState)
    })

    it('should get template by id', () => {
        const expectedState = {
            id: "ID1000",
            name: "Plantilla1",
            logo: "image1.png",
            logoPosition: "logo-top-left",
            background: "image2.png",
            backgroundPosition: "back-center",
            lineColor: "#FFFFFF"
        }

        const result = Selector(uut.getTemplateById).execute(mockedExportState, "ID1000");
        expect(result).toEqual(expectedState)
    })
})
