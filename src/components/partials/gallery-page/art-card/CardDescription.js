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
                                     categoryName: 'Técnica',
                                     categoryValue: getDetailValue(artCardInformation.detail.technique.value),
                                     editableName: false,
                                     editableValue: true,
                                     propertyName: "technique"}}
                          validate={handleCategoryValidation}/>
                <Category category={{required: false,
                                     categoryName: 'Materiales',
                                     categoryValue: getDetailValue(artCardInformation.detail.materials.value),
                                     editableName: false,
                                     editableValue: true,
                                     propertyName: "materials"}}
                          validate={handleCategoryValidation}/>
                <Category category={{required: false,
                                     categoryName: 'Medidas',
                                     categoryValue: getDetailValue(artCardInformation.detail.measurements.value),
                                     editableName: false,
                                     editableValue: true,
                                     propertyName: "measurements"}}
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