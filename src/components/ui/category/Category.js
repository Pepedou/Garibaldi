import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InlineEdit from 'react-edit-inline';
require('./Category.css')

export default class Category extends Component {
  handleChange(text) {
      return true
  }

  render() {
    let classNamesForName = `CategoryName ${this.props.category.required}`;
    let classNamesForValue = `CategoryValue ${this.props.category.required}`;
    let {position} = this.props
    let categoryNameComponent = <InlineEdit
              className={classNamesForName}
              activeClassName="EditingCategory"
              text={this.props.category.categoryName}
              paramName="message"
              validate={(data) => this.props.validate && this.props.validate(data, position, "label")}
              change={this.handleChange}
            />

    let categoryValueComponent = <InlineEdit
              className={classNamesForValue}
              activeClassName={`EditingCategory ${this.props.category.editingClass}`}
              text={this.props.category.categoryValue}
              paramName="message"
              validate={(data) => this.props.validate && this.props.validate(data, position, "value")}
              change={this.handleChange}
              editingElement={this.props.editingElement}
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
  position: PropTypes.number,
  category: PropTypes.object,
  validate: PropTypes.func
};

Category.defaultProps = {
  editingElement: "input"
}