import React, {Component} from 'react';

export default class Category extends Component {
  transformCategoryName(event) {
      console.log(event.target.innerHTML)
  }

  transformCategoryValue(event) {
      console.log(event.target.innerHTML)
  }

  render() {
    let classNamesForName = `CategoryName ${this.props.category.required} ${this.props.category.editableName}`;
    let classNamesForValue = `CategoryValue ${this.props.category.required} ${this.props.category.editableValue}`;
    return (
      <div className="row Category">
          <div className={classNamesForName} onClick={this.transformCategoryName}>{this.props.category.categoryName}</div>
          <div className={classNamesForValue} onClick={this.transformCategoryValue}>{this.props.category.categoryValue}</div>
      </div>
    );
  }
}