import React, {Component, PropTypes} from 'react';
import TextFieldComponent from '../text-field/TextFieldComponent'
import SelectFieldComponent from '../select-field/SelectFieldComponent'

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
                errorText={this.props.fieldErrorMessage}
                />
            : <SelectFieldComponent
                floatingLabelText={this.props.floatingLabelText}
                options={this.props.options} />
        )
    }
}

TextField.propTypes = {
  inputType: PropTypes.string.required,
  hintText: PropTypes.string,
  floatingLabelText: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  fieldErrorMessage: PropTypes.string,
  options: PropTypes.array
};