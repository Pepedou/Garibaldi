import React, {Component, PropTypes} from 'react';
import DatePicker  from 'material-ui/DatePicker';

export default class DatePickerComponent extends Component {
    render() {
        return(
            <DatePicker 
                hintText={this.props.hintText}
                className={this.props.className}
                formatDate={"DD-MM-YYYY"}/>
        )
    }
}

DatePickerComponent.propTypes = {
  hintText: PropTypes.string,
  className: PropTypes.string
};