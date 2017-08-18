import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Category from '../../../ui/category/Category.js';
import DefaultButton from '../../../ui/buttons/DefaultButton'
import {getDetailValue} from '../../../../utils/fieldValidations'

export default class CardDescription extends Component {
    render() {
        let {artistCardInformation, handleCategoryValidation, onTouchTap, dataSource, onNewRequest, onUpdateInput} = this.props
        return (
            <div className="CardDescription row">
                <Category category={{required: true,
                                                    categoryName: 'Gestor Cultural',
                                                    categoryValue: getDetailValue(artistCardInformation.detail.culturalHelperName),
                                                    editableName: false,
                                                    editableValue: true,
                                                    propertyName: "culturalHelperName"}}
                                         validate={handleCategoryValidation}
                                         isAutocomplete={true}
                                         dataSource={dataSource}
                                         onNewRequest={onNewRequest}
                                         onUpdateInput={onUpdateInput}/>
                {
                    artistCardInformation.categories.map((item, key) => <Category key={key} 
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
  artistCardInformation: PropTypes.object,
  onTouchTap: PropTypes.func,
  handleCategoryValidation: PropTypes.func,
  dataSource: PropTypes.array,
  onNewRequest: PropTypes.func,
  onUpdateInput: PropTypes.func
};