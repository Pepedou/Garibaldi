import React, {Component, PropTypes} from 'react';
import {grey600, grey400, red600} from 'material-ui/styles/colors';
import './SelectFieldComponent.css';

const styles = {
  redSelect:{
    borderColor: red600,
    borderBottomWidth: 2
  },
  normalSelect:{
    borderColor: grey400,
    color: grey600
  }
};

export default class SelectFieldComponent extends Component {
    render() {
        let style = this.props.errorText ? styles.redSelect : styles.normalSelect
        let error = this.props.errorText ? <div className="errorText">{this.props.errorText}</div> : null
        return(
          <div className="SelectFieldComponent">
            <div className="FloatingLabelText">{this.props.floatingLabelText}</div>
            <select id={this.props.id} className={this.props.className} value={this.props.defaultValue} onChange={this.props.onChange} style={style}>
              {
                this.props.options.map((item, key) => <option value={item.value} key={key}>{item.text}</option>)
              }
            </select>
            {error}
          </div>
        )
    }
}

SelectFieldComponent.propTypes = {
  floatingLabelText: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.array,
  errorText: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func
};