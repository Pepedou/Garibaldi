import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Category from '../../../ui/category/Category.js';
import DefaultButton from '../../../ui/buttons/DefaultButton'
import {getDetailValue} from '../../../../utils/fieldValidations'

export default class CardDescription extends Component {
    render() {
        let {artCardInformation, handleCategoryValidation, onTouchTap} = this.props
        return (
            <div className="CardDescription row">
                <Category category={{required: false,
                                     categoryName: 'Serie',
                                     categoryValue: getDetailValue(artCardInformation.detail.series.value),
                                     editableName: false,
                                     editableValue: true,
                                     propertyName: "series"}}
                          validate={handleCategoryValidation}/>
                <Category category={{required: false,
                                     categoryName: 'Tiraje',
                                     categoryValue: getDetailValue(artCardInformation.detail.tiraje.value),
                                     editableName: false,
                                     editableValue: true,
                                     propertyName: "tiraje"}}
                          validate={handleCategoryValidation}/>
                <Category category={{required: false,
                                    categoryName: 'Año',
                                    categoryValue: getDetailValue(artCardInformation.detail.year.value.toString()),
                                    editableName: false,
                                    editableValue: true,
                                    propertyName: "year"}}
                        validate={handleCategoryValidation}/>
                <Category category={{required: false,
                                     categoryName: 'Precio',
                                     categoryValue: getDetailValue(artCardInformation.detail.price.value),
                                     editableName: false,
                                     editableValue: true,
                                     propertyName: "price"}}
                          validate={handleCategoryValidation}/>
                {
                    artCardInformation.categories.map((item, key) => <Category key={key} 
                                                                               position={key}
                                                                               category={{required: false,
                                                                                          categoryName: item.label,
                                                                                          categoryValue: item.value,
                                                                                          editableName: true,
                                                                                          editableValue: true,
                                                                                          propertyName: "category"}}
                                                                               validate={handleCategoryValidation}/>)
                }
                <center>
                    <DefaultButton
                        label="Agregar Categoría"
                        floatStyle="center"
                        onTouchTap={event => onTouchTap(event)}
                        />
                </center>
            </div>
        );
  }
}

CardDescription.displayName = 'CardDescription'

CardDescription.propTypes = {
  artCardInformation: PropTypes.object,
  onTouchTap: PropTypes.func,
  handleCategoryValidation: PropTypes.func
};