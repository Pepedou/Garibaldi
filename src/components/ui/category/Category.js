import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InlineEdit from 'react-edit-inline';
require('./Category.css')

export default class Category extends Component {
  customValidateText(text) {
      return true
  }

  dataChanged(data) {
      console.log(data)
  }

  render() {
    let classNamesForName = `CategoryName ${this.props.category.required}`;
    let classNamesForValue = `CategoryValue ${this.props.category.required}`;

    let categoryNameComponent = <InlineEdit
              className={classNamesForName}
              activeClassName="EditingCategory"
              text={this.props.category.categoryName}
              paramName="message"
              change={this.dataChanged}
            />

    let categoryValueComponent = <InlineEdit
              className={classNamesForValue}
              activeClassName="EditingCategory"
              text={this.props.category.categoryValue}
              paramName="message"
              change={this.dataChanged}
            />

    if(!this.props.category.editableName) {
      categoryNameComponent = <div className={classNamesForName}>{this.props.category.categoryName}</div>
    }

    if(!this.props.category.editableValue) {
      categoryValueComponent = <div className={classNamesForValue}>{this.props.category.categoryValue}</div>
    }

    return (
      <div className="row Category">
          {categoryNameComponent}: {categoryValueComponent} 
      </div>
    );
  }
}

Category.displayName = 'Category'

Category.propTypes = {
  category: PropTypes.object
};