import * as uut from '../reducer'
import { Selector } from 'redux-testkit'
import { mockedExportState } from '../../../../mocks/exportStateMocks'

describe('ExportPages Selectors', () => {
    it('should get all export pages', () => {
        const expectedState = [
            {
                id: "ID3001",
                type: "Artist",
                title: "",
                image: "image_in_page.png",
                withImage: true,
                categories: ["ID4000"]
            }
        ]

        Selector(uut.getExportPages)
        .expect(mockedExportState)
        .toReturn(expectedState)
    })

    it('should get export page by id', () => {
        const expectedState = {
            id: "ID3001",
            type: "Artist",
            title: "",
            image: "image_in_page.png",
            withImage: true,
            categories: ["ID4000"]
        }

        const result = Selector(uut.getExportPageById).execute(mockedExportState, "ID3001");
        expect(result).toEqual(expectedState)
    })
})
