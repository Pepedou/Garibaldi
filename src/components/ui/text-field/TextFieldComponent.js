import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";
import { grey600, grey500 } from "material-ui/styles/colors";

const styles = {
  underlineStyle: {
    borderColor: grey500
  },
  underlineFocusStyle: {
    borderColor: grey600
  },
  floatingLabelStyle: {
    color: grey500
  },
  floatingLabelFocusStyle: {
    color: grey600
  },
  inputStyle: {
    color: grey600
  }
};

let getRows = isMultiLine => (isMultiLine ? 3 : 1);

export default class TextFieldComponent extends Component {
  render() {
    return (
      <TextField
        hintText={this.props.hintText}
        floatingLabelText={this.props.floatingLabelText}
        name={this.props.name}
        id={this.props.id}
        className={this.props.className}
        type={this.props.type}
        errorText={this.props.errorText}
        onChange={this.props.onChange}
        defaultValue={this.props.defaultValue}
        multiLine={this.props.multiLine}
        rows={getRows(this.props.multiLine)}
        fullWidth={true}
        underlineStyle={styles.underlineStyle}
        floatingLabelStyle={styles.floatingLabelStyle}
        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        underlineFocusStyle={styles.underlineFocusStyle}
        inputStyle={styles.inputStyle}
      />
    );
  }
}

TextField.propTypes = {
  hintText: PropTypes.string,
  floatingLabelText: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  errorText: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  multiLine: PropTypes.bool
};

TextFieldComponent.defaultProps = {
  multiLine: false
};
