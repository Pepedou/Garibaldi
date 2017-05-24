import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import {grey500, grey400} from 'material-ui/styles/colors';

const styles = {
  underlineStyle: {
    borderColor: grey400,
  },
  underlineFocusStyle:{
    borderColor: grey500,
  },
  floatingLabelStyle: {
    color: grey400,
  },
  floatingLabelFocusStyle: {
    color: grey500,
  },
};

export default class TextFieldComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            fieldErrorMessage: ""
        }
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(event){
        if(event.target.value === ""){
            this.setState = {fieldErrorMessage: "Campo obligatorio"}
        } else {
            this.setState = {fieldErrorMessage: ""}
        }
    }

    render() {
        return(
            <TextField
                hintText={this.props.hintText}
                errorText={this.state.fieldErrorMessage}
                floatingLabelText={this.props.floatingLabelText}
                fullWidth={true}
                name={this.props.name}
                className={this.props.className}
                onChange={e => this.handleOnChange(e)}
                underlineStyle={styles.underlineStyle}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
                />
        )
    }
}

TextField.propTypes = {
  hintText: PropTypes.string,
  floatingLabelText: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string
};