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

class NewArtPage extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            inputFields: getForm(FormType.NEW_ART)
        }
    }

    handleOnChange(event, index, value){
        let inputFieldsCopy = [...this.state.inputFields]
        let currentFieldIndex = getFieldIndex(inputFieldsCopy, event.target.id)
        inputFieldsCopy[currentFieldIndex].defaultValue = event.target.value

        this.setState({inputFields: inputFieldsCopy})
    }

    handleOnClick() {

    }

    componentWillMount() {
    }

    render() {
        return (
            <div className="col-xs-12 col-md-12 NewArtPage">
                <div className="row">
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
                                                                onChange={event => this.handleOnChange(event)}/>)

                                
                    }
                    <center>
                        <DefaultButton
                            label="Crear"
                            floatStyle="center"
                            className="marginTop"
                            onTouchTap={event => this.props.handleOnClick(event)}
                            />
                    </center>
                </div>
            </div>
        );
    }
}

NewArtPage.displayName = 'NewArtPage'

NewArtPage.propTypes = {
}

export default connect(null, null)(NewArtPage)