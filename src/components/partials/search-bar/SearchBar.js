import React, {Component, PropTypes} from 'react';
import SelectFieldComponent from '../../ui/select-field/SelectFieldComponent'
import {getFilterOptions} from '../../../utils/filterUtils'
import {PageTypes} from '../../../utils/constants/PageTypes'
require('./SearchBar.css')

export default class SearchBar extends Component {
  handleOnChange(event) {

  }

  render() {
    return (
      <div className="SearchBar">
        <i className="glyphicon glyphicon-search searchElement" id="filterIcon"/>
        <input type="text" className="searchElement" placeholder="Filtrar información..." id="filterInput"/>
        <select className="searchElement" id="filterTypeSelect">
          {
            getFilterOptions(this.props.user, PageTypes.ART_GALLERY).map((item, key) => <option value={item.value} key={key}>{item.text}</option>)
          }
        </select>
      </div>
    );
  }
}

SearchBar.displayName = 'ProfileNavBar'

SearchBar.propTypes = {
  user: PropTypes.object
};