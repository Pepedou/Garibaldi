import React, {Component, PropTypes} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {grey600, grey500, grey400, lightBlue400} from 'material-ui/styles/colors';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

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
  selectedMenuItemStyle: {
    color: lightBlue400
  },
  labelStyle: {
    color: grey600
  },
  listStyle:{
    color: grey600 
  }
};

export default class SelectFieldComponent extends Component {
    render() {
        return(
            <SelectField
                hintText={this.props.hintText}
                floatingLabelText={this.props.floatingLabelText}
                id={this.props.id}
                className={this.props.className}
                errorText={this.props.errorText}
                onChange={this.props.onChange}
                value={this.props.value}
                autoWidth={true}
                underlineStyle={styles.underlineStyle}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
                selectedMenuItemStyle={styles.selectedMenuItemStyle}
                labelStyle={styles.labelStyle}
                listStyle={styles.listStyle}
                >
                {
                    this.props.options.map((item, key) => <MenuItem value={item.value} primaryText={item.text} key={key}/>)
                }
            </SelectField>
        )
    }
}

SelectFieldComponent.propTypes = {
  floatingLabelText: PropTypes.string,
  options: PropTypes.array,
  fieldErrorMessage: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};