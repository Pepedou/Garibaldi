require('./CreateTemplatePage.css')
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

let template = {
    name: "",
    logo: "",
    logoPosition: logoPositionOptions[0].value,
    background: "",
    backgroundPosition: bgPositionOptions[0].value,
    lineColor: colors[0]
}

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
            }
        }
    }

    handleOnCheck(event) {
        if(event.target.checked) {
            template.lineColor = ""
        } else {
            template.lineColor = lastColorSelected
        }
    }

    handleOnChange(event) {
        template[event.target.id] = event.target.value

        if(event.target.id === this.state.templateName.id) {
            let templateNameCopy = {...this.state.templateName}
            templateNameCopy.defaultValue = event.target.value
            this.setState({templateName: templateNameCopy})
        }
    }

    handleOnChangeColor(color, event) {
        template.lineColor = color.hex
        lastColorSelected = color.hex 
    }

    onDropAccepted(image, className) {
        template[className] = image
    }

    onDropRejected(className) {
        template[className] = ""
    }

    handleOnClickSaveButton(event, props) {
        let {addNotification, clearAllNotifications} = props
        clearAllNotifications()
        let templateNameCopy = {...this.state.templateName}
        if(template.name === "") {
            templateNameCopy.errorText = "Campo obligatorio"
            this.setState({templateName: templateNameCopy})
            addNotification({code: ERROR_CODES.REQUIRED_FIELDS.code})
        } else {
            console.log("Template", template)
        }
    }

    render() {
        return <div className="CreateTemplatePage col-xs-12 col-md-12">
            <div className="instructions row">Seleccione la información solicitada. Si no desea agregar logo y/o imagen de fondo, no seleccione ninguna imagen.s</div>
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
                        <DropZoneComponent onDropAcceptedExtra={this.onDropAccepted.bind(this)} onDropRejectedExtra={this.onDropRejected.bind(this)} className="logo"/>
                        <InputFieldComponent inputType="selectField" 
                                floatingLabelText="Posición"
                                className="positionSelect"
                                id="logoPosition"
                                type="selectField"
                                errorText=""
                                options={logoPositionOptions}
                                defaultValue={logoPositionOptions[0].text}
                                onChange={event => this.handleOnChange(event)}/>
                    </center>
                </div>
                <div className="col-xs-12 col-md-6 dropZoneWrapper">
                    <center>
                        <div className="row subtitle">Fondo</div>
                        <DropZoneComponent onDropAcceptedExtra={this.onDropAccepted.bind(this)} onDropRejectedExtra={this.onDropRejected.bind(this)} className="background"/>
                        <InputFieldComponent inputType="selectField" 
                                floatingLabelText="Posición"
                                className="positionSelect"
                                id="backgroundPosition"
                                type="selectField"
                                errorText=""
                                options={bgPositionOptions}
                                defaultValue={bgPositionOptions[0].text}
                                onChange={event => this.handleOnChange(event)}/>
                    </center>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-md-6 colorPickerWrapper">
                    <div className="row subtitle">Color del membrete</div>
                    <center>
                        <BlockPicker onChange={event => this.handleOnChangeColor(event)} colors={colors}/>
                    </center>
                </div>
                <div className="col-xs-12 col-md-6 colorPickerWrapper">
                    <Checkbox
                        label="Sin membrete"
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
                    className="marginTop"
                    onTouchTap={event => this.handleOnClickSaveButton(event, this.props)}
                    />
            </div>
        </div>
    }
}

CreateTemplatePage.displayName = 'CreateTemplatePage'

CreateTemplatePage.propTypes = {
    addNotification: PropTypes.func,
    clearAllNotifications: PropTypes.func
}

export const mapDispatchToProps = dispatch => ({
    addNotification: notification => handleError(dispatch, notification),
    clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS})
})

export default connect(null, mapDispatchToProps)(CreateTemplatePage)