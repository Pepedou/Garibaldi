import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import {grey600, grey500} from 'material-ui/styles/colors';

const styles = {
  underlineStyle: {
    borderColor: grey500,
  },
  inputStyle:{
    color: grey600,
    height: 37
  },
  underlineFocusStyle:{
    borderColor: grey600,
  },
};

export default class EditableLabelComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMe: true
        };
    }

    handleClick() {
        this.setState({showMe: false})
    }
    
    handleBlur() {
        this.setState({showMe: true})
    }

    filterData(searchText, key) {
        return searchText !== '' && key.toUpperCase().indexOf(searchText.toUpperCase()) !== -1
    }

    render() {
        let {onNewRequest, dataSource, onUpdateInput, value, propertyName} = this.props
        return this.state.showMe
            ? <div onClick={this.handleClick.bind(this)} onBlur={this.handleBlur.bind(this)} className="autocompleteLabel">{value}</div>
            : <AutoComplete
                className="autocomplete"
                id={propertyName}
                onNewRequest={onNewRequest}
                dataSourceConfig={{ text: 'text', value: 'value'}}
                dataSource={dataSource}
                onUpdateInput={onUpdateInput}
                maxSearchResults={5}
                filter={this.filterData.bind(this)}
                underlineStyle={styles.underlineStyle}
                inputStyle={styles.inputStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
                onBlur={this.handleBlur.bind(this)}
                />
    }
}

EditableLabelComponent.propTypes = {
  onNewRequest: PropTypes.func,
  dataSource: PropTypes.array,
  onUpdateInput: PropTypes.func,
  value: PropTypes.string,
  propertyName: PropTypes.string
}