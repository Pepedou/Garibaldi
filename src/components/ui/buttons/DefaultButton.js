import React, { Component } from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";

const styles = {
  button: {
    margin: 12
  }
};

export default class DefaultButton extends Component {
  render() {
    return (
      <RaisedButton
        label={this.props.label}
        labelPosition={this.props.labelPosition}
        style={{ ...styles.button, float: this.props.floatStyle }}
        onTouchTap={this.props.onTouchTap}
        className={this.props.className}
        type={this.props.type}
      />
    );
  }
}

DefaultButton.propTypes = {
  label: PropTypes.string,
  labelPosition: PropTypes.string,
  onTouchTap: PropTypes.func,
  className: PropTypes.string,
  floatStyle: PropTypes.string,
  type: PropTypes.string
};
