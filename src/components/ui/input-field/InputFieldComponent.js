import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextFieldComponent from '../text-field/TextFieldComponent'
import SelectFieldComponent from '../select-field/SelectFieldComponent'
import AutocompleteComponent from '../autocomplete/AutocompleteComponent'

let getTextFieldComponente = props => <TextFieldComponent
            hintText={props.hintText}
            floatingLabelText={props.floatingLabelText}
            name={props.name}
            id={props.id}
            className={props.className}
            type={props.type}
            errorText={props.errorText}
            defaultValue={props.defaultValue}
            onChange={props.onChange}
            />

let getAutocompleteField = props => <AutocompleteComponent
            hintText={props.hintText}
            floatingLabelText={props.floatingLabelText}
            name={props.name}
            id={props.id}
            className={props.className}
            errorText={props.errorText}
            onNewRequest={props.onNewRequest}
            dataSource={props.dataSource}
            />

let getSelectField = props => <SelectFieldComponent
            hintText={props.hintText}
            floatingLabelText={props.floatingLabelText}
            id={props.id}
            className={props.className}
            errorText={props.errorText}
            options={props.options}
            defaultValue={props.defaultValue}
            onChange={props.onChange}
                />

let getInputField = props => {
    switch (props.inputType) {
        case "textField":
            return getTextFieldComponente(props);
        case "selectField":
            return getSelectField(props);
        case "autocomplete":
            return getAutocompleteField(props);
    }
}

export default class InputFieldComponent extends Component {
    render() {
        return getInputField(this.props)
    }
}

InputFieldComponent.propTypes = {
  inputType: PropTypes.string,
  hintText: PropTypes.string,
  floatingLabelText: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  errorText: PropTypes.string,
  options: PropTypes.array,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onNewRequest: PropTypes.func
};