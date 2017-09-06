import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InlineEdit from 'react-edit-inline';
import EditableLabelComponent from '../editable-label/EditableLabel'
require('./Category.css')

export default class Category extends Component {
  handleChange(value) {
      return true
  }

  handleClick(){
    console.log("click")
  }

  render() {
    let {position, category, validate, editingElement, isAutocomplete, onNewRequest, dataSource, onUpdateInput} = this.props

    let classNamesForName = `CategoryName`;
    let classNamesForValue = `CategoryValue ${category.required && "required"} ${category.propertyName}`;
    
    let categoryNameComponent = <InlineEdit
              className={classNamesForName}
              activeClassName="EditingCategory"
              text={category.categoryName}
              paramName="message"
              validate={(data) => validate && validate(data, position, "label", category.propertyName)}
              change={(value) => this.handleChange(value)}
              maxLength={500}
              onClick={this.handleClick}
            />

    let categoryValueComponent = isAutocomplete
           ? <EditableLabelComponent onNewRequest={onNewRequest}
                                     dataSource={dataSource}
                                     value={category.categoryValue}
                                     onUpdateInput={onUpdateInput}
                                     propertyName={category.propertyName}/>
           : <InlineEdit
              className={classNamesForValue}
              activeClassName={`EditingCategory ${category.editingClass}`}
              text={category.categoryValue}
              paramName="message"
              validate={(data) => validate && validate(data, position, "value", category.propertyName)}
              change={(value) => this.handleChange(value)}
              editingElement={editingElement}
              maxLength={500}
              onClick={this.handleClick}
            />

    if(!category.editableName) {
      categoryNameComponent = <div className={classNamesForName}>{`${category.categoryName}: `}</div>
    }

    if(!category.editableValue) {
      categoryValueComponent = <div className={classNamesForValue}>{category.categoryValue}</div>
    }

    return (
      <div className="row Category">
          {categoryNameComponent}{categoryValueComponent} 
      </div>
    );
  }
}

Category.displayName = 'Category'

Category.propTypes = {
  position: PropTypes.number,
  category: PropTypes.object,
  validate: PropTypes.func,
  isAutocomplete: PropTypes.bool,
  onNewRequest: PropTypes.func,
  dataSource: PropTypes.array,
  onUpdateInput: PropTypes.func
};

Category.defaultProps = {
  editingElement: "input"
}