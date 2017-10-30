import * as actions from '../actions'
import * as actionTypes from '../actionTypes'
import * as selectors from '../reducer'
import { Thunk } from 'redux-testkit'

describe('Templates Actions', () => {

    it('should dispatch all templates', () => {
        const normalizedTemplates = {}

        const dispatch = actions.loadAllTempaltes(normalizedTemplates)
        expect(dispatch).toEqual({
            type: actionTypes.TEMPLATES_LOAD_TEMPLATES,
            payload: normalizedTemplates
        })
    })

    it('should dispatch template update', () => {
        const updatedTemplate = {
            id: "1000",
            name: "Plantilla1",
            logo: "image1.png",
            logoPosition: "logo-top-left",
            background: "image2.png",
            backgroundPosition: "back-center",
            lineColor: "#FFFFFF"
        }

        const dispatch = actions.updateTemplate(updatedTemplate);

        expect(dispatch).toEqual({
            type: actionTypes.TEMPLATES_UPDATE_CURRENT_TEMPLATE,
            payload: updatedTemplate
        })
    })

    it('should handle save and reset actions dispatching', () => {

        const templateToSave = {
            id: "1000",
            name: "Plantilla1",
            logo: "image1.png",
            logoPosition: "logo-top-left",
            background: "image2.png",
            backgroundPosition: "back-center",
            lineColor: "#FFFFFF"
        }

        const dispacthes = Thunk(actions.saveAndRestTemplate).execute(templateToSave)

        expect(dispacthes.length).toBe(2)
        expect(dispacthes[0].getAction()).toEqual({
            type: actionTypes.TEMPLATES_SAVE_EXPORT_TEMPLATE,
            payload: templateToSave
        })
        expect(dispacthes[1].getAction()).toEqual({
            type: actionTypes.TEMPLATES_UPDATE_CURRENT_TEMPLATE,
            payload: {
                id: "",
                name: "",
                logo: "",
                logoPosition: "",
                background: "",
                backgroundPosition: "",
                lineColor: ""
            }
        })
    })
})