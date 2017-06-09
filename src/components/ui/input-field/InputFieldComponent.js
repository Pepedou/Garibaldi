import React, {Component, PropTypes} from 'react';
import TextFieldComponent from '../text-field/TextFieldComponent'
import SelectFieldComponent from '../select-field/SelectFieldComponent'
import DatePickerComponent from '../date-picker/DatePickerComponent'

export default class InputFieldComponent extends Component {
    render() {
        return(
            this.props.inputType === "textField"
            ? <TextFieldComponent
                hintText={this.props.hintText}
                floatingLabelText={this.props.floatingLabelText}
                name={this.props.name}
                id={this.props.id}
                className={this.props.className}
                type={this.props.type}
                errorText={this.props.errorText}
                value={this.props.value}
                onChange={this.props.onChange}
                />
            : <SelectFieldComponent
                hintText={this.props.hintText}
                floatingLabelText={this.props.floatingLabelText}
                id={this.props.id}
                className={this.props.className}
                errorText={this.props.errorText}
                options={this.props.options}
                value={this.props.value}
                onChange={this.props.onChange}
                 />
        )
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
  value: PropTypes.string,
  onChange: PropTypes.func
};