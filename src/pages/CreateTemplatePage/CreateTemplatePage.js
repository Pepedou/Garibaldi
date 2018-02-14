import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { BlockPicker } from 'react-color';
import InputFieldComponent from '../../components/ui/input-field/InputFieldComponent'
import DropZoneComponent from '../../components/ui/drop-zone/DropZoneComponent'
import DefaultButton from '../../components/ui/buttons/DefaultButton'
import Checkbox from 'material-ui/Checkbox';
import {handleError, ERROR_CODES} from '../../utils/errorHandling'
import * as constants from '../../redux/constants'
import ExportTemplatesServices from '../../utils/services/exportTemplatesServices'
import LoaderComponent from '../../components/ui/loader/LoaderComponent'
require('./CreateTemplatePage.css')

const styles = {
  labelStyle: {color: 'gray'},
  iconStyle: {fill: 'gray'}
};

const logoPositionOptions = [
    {value: "left", text: "Izquierda"},
    {value: "center", text: "Centro"},
    {value: "right", text: "Derecha"}
]

const bgPositionOptions = [
    {value: "leftTop", text: "Izquierda y arriba"},
    {value: "leftCenter", text: "Izquierda y centro"},
    {value: "leftBottom", text: "Izquierda y abajo"},
    {value: "rightTop", text: "Derecha y arriba"},
    {value: "rightCenter", text: "Derecha y centro"},
    {value: "rightBottom", text: "Derecha y abajo"},
    {value: "centerTop", text: "Centro y arriba"},
    {value: "centerCenter", text: "Centro y centro"},
    {value: "centerBottom", text: "Centro y abajo"}
]

const colors = ['#22194D', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8']

let lastColorSelected = colors[0]

class CreateTemplatePage extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            templateName: {
                inputType: "textField",
                floatingLabelText: "Nombre de la plantilla",
                hintText: "Ingrese el nombre de la plantilla",
                id: "name",
                type: "text",
                className: "templateName",
                errorText: "",
                defaultValue: ""
            },
            template: {
                name: "",
                logo: "",
                logoPosition: logoPositionOptions[0].value,
                background: "",
                backgroundPosition: bgPositionOptions[0].value,
                lineColor: colors[0]
            },
            templateList: []
        }
    }

    componentWillMount() {
        let setState = this.setState.bind(this)
        let {addNotification} = this.props

        ExportTemplatesServices.getAll()
        .then(function (response) {
            setState({templateList: response})
        })
        .catch(function (error) {
            addNotification(error)
        })
    }

    handleOnCheck(event) {
        if(event.target.checked) {
            this.setState({template: {...this.state.template, lineColor: ""}})
        } else {
            this.setState({template: {...this.state.template, lineColor: lastColorSelected}})
        }
    }

    handleOnChange(event) {
        this.setState({template: {...this.state.template, [event.target.id]: event.target.value}})

        if(event.target.id === this.state.templateName.id) {
            let templateNameCopy = {...this.state.templateName}
            templateNameCopy.defaultValue = event.target.value
            this.setState({templateName: templateNameCopy})
        }
    }

    handleOnChangeColor(color, event) {
        lastColorSelected = color.hex 
    }

    onDropAccepted(imageList, image, className) {
        this.setState({template: {...this.state.template, [className]: image}})
    }

    deleteExtraImage(imageList, image, className) {
        this.setState({template: {...this.state.template, [className]: ""}})
    }

    handleOnClickSaveButton(event, props) {
        let {addNotification, clearAllNotifications, loading} = props
        clearAllNotifications()
        loading(true)
        let templateNameCopy = {...this.state.templateName}
        if(this.state.template.name === "") {
            templateNameCopy.errorText = "Campo obligatorio"
            this.setState({templateName: templateNameCopy})
            addNotification({code: ERROR_CODES.REQUIRED_FIELDS.code})
            loading(false)
        } else {
            let templateToCreate = {...this.state.template, lineColor: lastColorSelected}
            ExportTemplatesServices.create(templateToCreate)
            .then(function (response) {
                loading(false)
                window.location.reload()
            })
            .catch(function (error) {
                loading(false)
                addNotification(error)
            })
        }
    }

    deleteTemplate(event, id) {
        let {loading, addNotification} = this.props
        loading(true)
        ExportTemplatesServices.destroy(id)
        .then(function (response) {
            loading(false)
            window.location.reload()
        })
        .catch(function (error) {
            loading(false)
            addNotification(error)
        })
    }

    render() {
        let {showLoader} = this.props
        return showLoader
            ? <div className="marginTop row"><center><LoaderComponent/></center></div>
            :<div className="CreateTemplatePage col-xs-12 col-md-12">
                {
                    this.state.templateList.length > 0
                    ? <div className="row templatesCreatedWrapper">
                            <div className="col-xs-12 col-md-12">
                                <div className="subtitle row">Plantillas creadas</div>
                                <div className="row">
                                    {
                                        this.state.templateList.map((value, key) => <div className="templateEntry" key={key}>
                                            <div className="closeButton" onClick={(event) => this.deleteTemplate(event, value.id)}>&times;</div>
                                            <div className="templateNameText">{value.name}</div>
                                        </div>)
                                    }
                                </div>
                            </div>
                        </div>
                    : null
                }
                <div className="row">
                    <div className="col-xs-12 col-md-12">
                        <div className="subtitle row">Crear nueva plantilla</div>
                        <div className="instructions row">Ingrese la información solicitada. Si no desea agregar logo y/o imagen de fondo, no seleccione ninguna imagen.s</div>
                        <div className="row">
                            <div className="col-xs-12 col-md-12 templateNameWrapper">
                                <InputFieldComponent inputType={this.state.templateName.inputType} 
                                            hintText={this.state.templateName.hintText} 
                                            floatingLabelText={this.state.templateName.floatingLabelText} 
                                            className={this.state.templateName.className} 
                                            id={this.state.templateName.id} 
                                            type={this.state.templateName.type} 
                                            errorText={this.state.templateName.errorText} 
                                            defaultValue={this.state.templateName.defaultValue} 
                                            onChange={event => this.handleOnChange(event)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-md-6 dropZoneWrapper">
                                <center>
                                    <div className="row subtitle">Logo</div>
                                    <DropZoneComponent
                                        onDropAcceptedExtra={(imageList, image) => this.onDropAccepted(imageList, image, "logo")}
                                        deleteExtraImage={(imageList, image) => this.deleteExtraImage(imageList, image, "logo")}/>
                                    <InputFieldComponent inputType="selectField" 
                                            floatingLabelText="Posición"
                                            className="positionSelect"
                                            id="logoPosition"
                                            type="selectField"
                                            errorText=""
                                            options={logoPositionOptions}
                                            defaultValue={this.state.template.logoPosition}
                                            onChange={event => this.handleOnChange(event)}/>
                                </center>
                            </div>
                            <div className="col-xs-12 col-md-6 dropZoneWrapper">
                                <center>
                                    <div className="row subtitle">Fondo</div>
                                    <DropZoneComponent 
                                        onDropAcceptedExtra={(imageList, image) => this.onDropAccepted(imageList, image, "background")}
                                        deleteExtraImage={(imageList, image) => this.deleteExtraImage(imageList, image, "background")}/>
                                    <InputFieldComponent inputType="selectField" 
                                            floatingLabelText="Posición"
                                            className="positionSelect"
                                            id="backgroundPosition"
                                            type="selectField"
                                            errorText=""
                                            options={bgPositionOptions}
                                            defaultValue={this.state.template.backgroundPosition}
                                            onChange={event => this.handleOnChange(event)}/>
                                </center>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-md-6 colorPickerWrapper">
                                <div className="row subtitle">Color del membrete</div>
                                <center>
                                    <BlockPicker onChange={(color, event) => this.handleOnChangeColor(color, event, this.setState.bind(this))} colors={colors}/>
                                </center>
                            </div>
                            <div className="col-xs-12 col-md-6 colorPickerWrapper">
                                <Checkbox
                                    label="Sin membrete"
                                    id="template-option__noMembrete"
                                    labelStyle={styles.labelStyle}
                                    iconStyle={styles.iconStyle}
                                    onCheck={(event) => this.handleOnCheck(event)}
                                    />
                            </div>
                        </div>
                        <div className="row">
                            <DefaultButton
                                label="GUARDAR"
                                labelPosition="after"
                                floatStyle="right"
                                className="marginTop create-template_button"
                                onTouchTap={event => this.handleOnClickSaveButton(event, this.props)}
                                />
                        </div>
                    </div>
                </div>
            </div>
    }
}

CreateTemplatePage.displayName = 'CreateTemplatePage'

CreateTemplatePage.propTypes = {
    addNotification: PropTypes.func,
    clearAllNotifications: PropTypes.func
}

export const mapStateToProps = ({showLoader}) => ({
  showLoader
})

export const mapDispatchToProps = dispatch => ({
    addNotification: notification => handleError(dispatch, notification),
    clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
    loading: showLoader => dispatch({type: constants.SHOW_LOADER, showLoader})
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTemplatePage)