import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import {grey600, grey500} from 'material-ui/styles/colors';

const styles = {
  underlineStyle: {
    borderColor: grey500,
  },
  underlineFocusStyle:{
    borderColor: grey600,
  },
  floatingLabelStyle: {
    color: grey500,
  },
  floatingLabelFocusStyle: {
    color: grey600,
  },
  inputStyle:{
    color: grey600
  }
};

export default class AutocompleteComponent extends Component {
    filterData(searchText, key) {
        return searchText !== '' && key.toUpperCase().indexOf(searchText.toUpperCase()) !== -1
    }

    render() {
        return(
            <AutoComplete
                hintText={this.props.hintText}
                floatingLabelText={this.props.floatingLabelText}
                name={this.props.name}
                id={this.props.id}
                className={this.props.className}
                errorText={this.props.errorText}
                onNewRequest={this.props.onNewRequest}
                dataSource ={this.props.dataSource}
                fullWidth={true}
                maxSearchResults={5}
                filter={this.filterData.bind(this)}
                underlineStyle={styles.underlineStyle}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
                inputStyle={styles.inputStyle}
                />
        )
    }
}

AutocompleteComponent.propTypes = {
  hintText: PropTypes.string,
  floatingLabelText: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  errorText: PropTypes.string,
  onNewRequest: PropTypes.func,
  dataSource: PropTypes.array
};