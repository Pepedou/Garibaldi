import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextFieldComponent from '../text-field/TextFieldComponent'
import SelectFieldComponent from '../select-field/SelectFieldComponent'
import AutocompleteComponent from '../autocomplete/AutocompleteComponent'
import ToggleFieldComponent from '../toggle-field/ToggleFieldComponent'

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
            multiLine={props.multiLine}
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
            onUpdateInput={props.onUpdateInput}
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

let getToggleField = props => <ToggleFieldComponent 
            labelOnTrue={props.labelOnTrue}
            labelOnFalse={props.labelOnFalse}
            defaultToggled={props.defaultToggled}
            handleToggle={props.handleToggle}
                />

let getInputField = props => {
    switch (props.inputType) {
        case "textField":
            return getTextFieldComponente(props);
        case "selectField":
            return getSelectField(props);
        case "autocomplete":
            return getAutocompleteField(props);
        case "toggle":
            return getToggleField(props);
        default:
            return null;
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
  multiLine: PropTypes.bool,
  onChange: PropTypes.func,
  onNewRequest: PropTypes.func,
  onUpdateInput: PropTypes.func,
  labelOnTrue: PropTypes.string,
  labelOnFalse: PropTypes.string,
  defaultToggled: PropTypes.bool,
  handleToggle: PropTypes.func
};