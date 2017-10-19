require('./CreateTemplatePage.css')
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { BlockPicker } from 'react-color';
import InputFieldComponent from '../../components/ui/input-field/InputFieldComponent'
import DropZoneComponent from '../../components/ui/drop-zone/DropZoneComponent'
import DefaultButton from '../../components/ui/buttons/DefaultButton'
import Checkbox from 'material-ui/Checkbox';

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

class CreateTemplatePage extends Component {

    handleOnChange(event) {
        alert(event)
    }

    handleOnChangeColor(color, event) {
        alert(color.hex)
    }

    handleOnClickSaveButton(event, props) {

    }

    render() {
        return <div className="CreateTemplatePage col-xs-12 col-md-12">
            <div className="instructions row">Seleccione la información solicitada. Si no desea agregar logo y/o imagen de fondo, no seleccione ninguna imagen.s</div>
            <div className="row">
                <div className="col-xs-12 col-md-12 templateNameWrapper">
                    <InputFieldComponent inputType="textField" 
                                hintText="Ingrese el nombre de la plantilla"
                                floatingLabelText="Nombre de la plantilla"
                                className="templateName"
                                id="templateName"
                                type="text"
                                errorText=""
                                defaultValue=""
                                onChange={event => this.handleOnChange(event)}/>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-md-6 dropZoneWrapper">
                    <center>
                        <div className="row subtitle">Logo</div>
                        <DropZoneComponent/>
                        <InputFieldComponent inputType="selectField" 
                                hintText="Seleccione"
                                floatingLabelText="Posición"
                                className="positionSelect"
                                id="logoPosition"
                                type="selectField"
                                errorText=""
                                options={logoPositionOptions}
                                defaultValue=""
                                onChange={event => this.handleOnChange(event)}/>
                    </center>
                </div>
                <div className="col-xs-12 col-md-6 dropZoneWrapper">
                    <center>
                        <div className="row subtitle">Fondo</div>
                        <DropZoneComponent/>
                        <InputFieldComponent inputType="selectField" 
                                hintText="Seleccione"
                                floatingLabelText="Posición"
                                className="positionSelect"
                                id="bgPosition"
                                type="selectField"
                                errorText=""
                                options={bgPositionOptions}
                                defaultValue=""
                                onChange={event => this.handleOnChange(event)}/>
                    </center>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-md-6 colorPickerWrapper">
                    <div className="row subtitle">Color del membrete</div>
                    <center>
                        <BlockPicker onChange={event => this.handleOnChangeColor(event)}/>
                    </center>
                </div>
                <div className="col-xs-12 col-md-6 colorPickerWrapper">
                    <Checkbox
                        label="Sin membrete"
                        labelStyle={styles.labelStyle}
                        iconStyle={styles.iconStyle}
                        onCheck={(event) => this.handleOnChange(event)}
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
}

export const mapStateToProps = ({}) => ({
})

export const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTemplatePage)