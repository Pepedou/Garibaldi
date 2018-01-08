import React, { Component } from "react";
import PropTypes from "prop-types";
import Toggle from "material-ui/Toggle";
import {
  grey600,
  red100,
  red500,
  green500,
  green100
} from "material-ui/styles/colors";

const styles = {
  thumbOff: {
    backgroundColor: red500
  },
  trackOff: {
    backgroundColor: red100
  },
  thumbSwitched: {
    backgroundColor: green500
  },
  trackSwitched: {
    backgroundColor: green100
  },
  labelStyle: {
    color: grey600
  }
};

export default class ToggleFieldComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labelValue: props.defaultToggled ? props.labelOnTrue : props.labelOnFalse
    };
  }

  handleOnToggle(event, isInputChecked, handleToggle) {
    let { labelOnTrue, labelOnFalse } = this.props;
    if (isInputChecked) {
      this.setState({ labelValue: labelOnTrue });
    } else {
      this.setState({ labelValue: labelOnFalse });
    }
    handleToggle(isInputChecked);
  }

  render() {
    let { labelValue } = this.state;
    let { defaultToggled, handleToggle } = this.props;
    return (
      <Toggle
        label={labelValue}
        defaultToggled={defaultToggled}
        thumbStyle={styles.thumbOff}
        trackStyle={styles.trackOff}
        thumbSwitchedStyle={styles.thumbSwitched}
        trackSwitchedStyle={styles.trackSwitched}
        labelStyle={styles.labelStyle}
        onToggle={(event, isInputChecked) =>
          this.handleOnToggle(event, isInputChecked, handleToggle).bind(this)
        }
      />
    );
  }
}

ToggleFieldComponent.propTypes = {
  labelOnTrue: PropTypes.string,
  labelOnFalse: PropTypes.string,
  defaultToggled: PropTypes.bool,
  handleToggle: PropTypes.func
};

ToggleFieldComponent.defaultProps = {
  multiLine: false
};
