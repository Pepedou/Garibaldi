import React, {Component, PropTypes} from 'react';
import TextFieldComponent from '../text-field/TextFieldComponent'
import SelectFieldComponent from '../select-field/SelectFieldComponent'
import DatePickerComponent from '../date-picker/DatePickerComponent'

export default class InputFieldComponent extends Component {
    render() {
        return(
            this.props.inputType === "textField"
            ? <TextFieldComponent
                floatingLabelText={this.props.floatingLabelText}
                hintText={this.props.hintText}
                name={this.props.name}
                className={this.props.className}
                type={this.props.type}
                fieldErrorMessage={this.props.fieldErrorMessage}
                />
            : this.props.inputType === "selectField" 
            ? <SelectFieldComponent
                floatingLabelText={this.props.floatingLabelText}
                options={this.props.options} />
            : <DatePickerComponent 
                hintText={this.props.hintText}/>
        )
    }
}

InputFieldComponent.propTypes = {
  inputType: PropTypes.string,
  hintText: PropTypes.string,
  floatingLabelText: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  fieldErrorMessage: PropTypes.string,
  options: PropTypes.array
};