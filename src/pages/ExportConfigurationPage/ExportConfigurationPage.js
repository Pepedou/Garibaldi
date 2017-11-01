import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {handleError, ERROR_CODES} from '../../utils/errorHandling'
import * as constants from '../../redux/constants'
import DividerComponent from '../../components/ui/divider/DividerComponent'
import FilePageBox from '../../components/partials/export-page/file-page-box/FilePageBox'
import InputFieldComponent from '../../components/ui/input-field/InputFieldComponent'
import DefaultButton from '../../components/ui/buttons/DefaultButton'
require('./ExportConfigurationPage.css')

class ExportConfigurationPage extends Component {
    constructor(props)
    {
        super(props)

        let dropdownOptions = this.getDropdownOptions()

        this.state = {
            templateDropdown: {
                inputType: "selectField",
                floatingLabelText: "Nombre de la plantilla",
                id: "template",
                className: "templateDropdown",
                errorText: "",
                options: dropdownOptions,
                defaultValue: dropdownOptions.length > 0 ? dropdownOptions[0].text : ''
            }
        }
    }

    getDropdownOptions() {
        let {exportTemplates} = this.props
        let templateOptions = []
        Object.keys(exportTemplates.allTemplates).forEach((key) => {
            templateOptions.push({value: exportTemplates.allTemplates[key].id, text: exportTemplates.allTemplates[key].name})
        })
        return templateOptions
    }

    handleOnChangeTemplate(event, props) {
        let {exportFile} = this.props
        let exportFileCopy = {...exportFile}
        exportFileCopy.template = event.target.value
        //TODO: Dispatch para catualizar exportFile
    }

    createPreview() {

    }

    render() {
        let {exportFile, exportPages, exportCategories, exportArtists, exportArtPieces} = this.props
        return <div className="col-xs-12 col-md-12 ExportConfigurationPage">
            <div className="row subtitle">Exportar a PDF</div>
            <div className="row">
                <div className="col-xs-12 col-md-12">
                    <div className="dropdownWrapper">
                        <div className="instruction">Seleccione la imagen del artista que desea mostrar en el documento</div>
                        <InputFieldComponent inputType={this.state.templateDropdown.inputType}
                                            floatingLabelText={this.state.templateDropdown.floatingLabelText}
                                            className={this.state.templateDropdown.className}
                                            id={this.state.templateDropdown.id}
                                            errorText={this.state.templateDropdown.errorText}
                                            options={this.state.templateDropdown.options}
                                            defaultValue={this.state.templateDropdown.defaultValue}
                                            onChange={event => this.handleOnChangeTemplate(event, this.props)}/>
                    </div>
                </div>
            </div>
            <div className="row divider">
                <DividerComponent />
            </div>
            <div className="row">
                <div className="col-xs-12 col-md-12">
                {
                    exportFile.pages.map((value, key) => {
                        let page = exportPages[value].type === "artist" ? exportArtists[value] : exportArtPieces[value]
                        return <FilePageBox
                                    key={key}
                                    page={page}
                                    categories={exportCategories}
                                    exportPages={exportPages}
                                    type={exportPages[value].type}/>
                    })
                }
                </div>
            </div>
            <div className="row buttonWrapper">
                <DefaultButton
                    label="ACEPTAR"
                    labelPosition="after"
                    floatStyle="right"
                    className="marginTop"
                    onTouchTap={event => this.createPreview(event, this.props)}
                    />
            </div>
        </div>
    }
}

ExportConfigurationPage.displayName = 'ExportConfigurationPage'

ExportConfigurationPage.propTypes = {
    exportTemplates: PropTypes.object,
    exportFile: PropTypes.object,
    exportPages: PropTypes.object,
    exportCategories: PropTypes.object,
    exportArtists: PropTypes.object,
    exportArtPieces: PropTypes.object,
    addNotification: PropTypes.func,
    clearAllNotifications: PropTypes.func
}

export const mapStateToProps = ({exportTemplates, exportFile, exportPages, exportCategories, exportArtists, exportArtPieces}) => ({
  exportTemplates,
  exportFile,
  exportPages,
  exportCategories,
  exportArtists,
  exportArtPieces
})

export const mapDispatchToProps = dispatch => ({
  addNotification: notification => handleError(dispatch, notification),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS})
})

export default connect(mapStateToProps, mapDispatchToProps)(ExportConfigurationPage)