import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as constants from '../../redux/constants'
import {connect} from 'react-redux'
import axios from 'axios'
import {NotificationTypes} from '../../components/alerts/notifications/NotificationTypes'
import {handleError} from '../../utils/errorHandling'
import LoaderComponent from '../../components/ui/loader/LoaderComponent'
import {getForm, FormType} from '../../utils/forms/formUtils'
import {validateObligatoryFields, getFieldValue, getFieldIndex} from '../../utils/fieldValidations'
import InputFieldComponent from '../../components/ui/input-field/InputFieldComponent'
import DefaultButton from '../../components/ui/buttons/DefaultButton'
import Dropzone from 'react-dropzone'

require('./NewArtistPage.css')

let style = {
    mainStyle: {
        borderStyle: "dashed",
        borderWidth: 2,
        height: 200
    },
    activeStyle: {
        borderStyle: "dashed",
        borderColor: "green",
        borderWidth: 2,
        height: 200
    },
    rejectStyle: {
        borderStyle: "dashed",
        borderColor: "red",
        borderWidth: 2,
        height: 200
    }
}

class NewArtistPage extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            inputFields: getForm(FormType.NEW_ARTIST),
            sourceImage: "",
            dataSource: []
        }
    }

    componentWillMount() {
        // let setState = this.setState.bind(this)
        // let {addNotification} = this.props
        // axios.get('https://lazarocardenas.herokuapp.com/api/CulturalHelpers')
        // .then(function (response) {
        //     let culturalHelpers = []
        //     //response.data.map((item, key) => culturalHelpers.push(`${item.name} ${item.lastName}`))
        //     setState({dataSource: culturalHelpers})
        // })
        // .catch(function (error) {
        //     addNotification({type: NotificationTypes.DANGER, contentType: "text", message: error.response.data});
        // })
    }

    handleOnChange(event, index, value){
        let inputFieldsCopy = [...this.state.inputFields]
        let currentFieldIndex = getFieldIndex(inputFieldsCopy, event.target.id)
        inputFieldsCopy[currentFieldIndex].defaultValue = event.target.value

        this.setState({inputFields: inputFieldsCopy})
    }

    handleOnNewRequest(value, id){
        let inputFieldsCopy = [...this.state.inputFields]
        let currentFieldIndex = getFieldIndex(inputFieldsCopy, id)
        inputFieldsCopy[currentFieldIndex].defaultValue = value

        this.setState({inputFields: inputFieldsCopy})
    }

    handleOnClick(event, {clearAllNotifications, addNotification}) {
        event.preventDefault()
        clearAllNotifications();
        let inputFieldsCopy = [...this.state.inputFields]
        let result = validateObligatoryFields(this.state.inputFields)
        if(result.valid){
        } else {
            addNotification({type: NotificationTypes.DANGER, contentType: "text", message: "Ingrese la información de los campos marcados en rojo"})
        }
        this.setState({inputFields: result.fieldList})
    }

    onDropAccepted(files, {clearAllNotifications, addNotification}) {
        clearAllNotifications()
        this.setState({sourceImage: files[0].preview})
    }

    onDropRejected(files, {clearAllNotifications, addNotification}) {
        clearAllNotifications()
        addNotification({type: NotificationTypes.DANGER, contentType: "text", message: "La imagen seleccionada no cumple con las características requeridas"})
    }

    render() {
        return (
            <div className="col-xs-12 col-md-12 NewArtPage">
                <div className="row">
                    <div className="col-xs-12 col-md-6 DropZoneSection">
                        <center>
                            <Dropzone 
                                onDropAccepted={(files) => this.onDropAccepted(files, this.props)}
                                onDropRejected={(files) => this.onDropRejected(files, this.props)}
                                accept="image/jpeg, image/png"
                                multiple={false}
                                name="photo"
                                maxSize={15000000}
                                style={style.mainStyle}
                                activeStyle={style.activeStyle}
                                rejectStyle={style.rejectStyle}>
                                <p className="DropZoneSection-message">Intente colocar la imagen aquí, o haga clic para seleccionar la imagen que desea cargar.</p>
                            </Dropzone>
                            <img alt="" src={this.state.sourceImage} id="preview"/>
                        </center>
                    </div>
                    <div className="col-xs-12 col-md-6 NewArtForm">
                        {
                            this.state.inputFields.map((item, key) => <InputFieldComponent key={key}
                                                                    inputType={item.inputType} 
                                                                    hintText={item.hintText}
                                                                    floatingLabelText={item.floatingLabelText}
                                                                    className={item.className}
                                                                    id={item.id}
                                                                    type={item.type}
                                                                    errorText={item.errorText}
                                                                    options={item.options}
                                                                    defaultValue={item.defaultValue}
                                                                    dataSource={this.state.dataSource}
                                                                    onChange={event => this.handleOnChange(event)}
                                                                    onNewRequest={(value) => this.handleOnNewRequest(value, item.id)}/>)

                                    
                        }
                        <center>
                            <DefaultButton
                                label="Crear"
                                floatStyle="center"
                                className="marginTop"
                                onTouchTap={event => this.handleOnClick(event, this.props)}
                                />
                        </center>
                    </div>
                </div>
            </div>
        );
    }
}

NewArtistPage.displayName = 'NewArtistPage'

NewArtistPage.propTypes = {
    addNotification: PropTypes.func,
    clearAllNotifications: PropTypes.func
}

export const mapDispatchToProps = dispatch => ({
  addNotification: notification => handleError(dispatch, notification),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS})
})

export default connect(null, mapDispatchToProps)(NewArtistPage)