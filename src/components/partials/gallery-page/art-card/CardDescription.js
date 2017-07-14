import React, {Component, PropTypes} from 'react';
import Category from '../../../ui/category/Category.js';
import DefaultButton from '../../../ui/buttons/DefaultButton'

export default class CardDescription extends Component {
    render() {
        return (
            <div className="CardDescription row">
                <Category category={{required: false, categoryName: 'Técnica', categoryValue: this.props.artCardInformation.detail.technique.value, editableName: false, editableValue: true}}/>
                <Category category={{required: false, categoryName: 'Materiales', categoryValue: this.props.artCardInformation.detail.materials.value, editableName: false, editableValue: true}}/>
                <Category category={{required: false, categoryName: 'Medidas', categoryValue: this.props.artCardInformation.detail.measurements.value, editableName: false, editableValue: true}}/>
                {
                    this.props.artCardInformation.categories.map((item, key) => <Category key={key} category={{required: false, categoryName: item.label, categoryValue: item.value, editableName: true, editableValue: true}}/>)
                }
                <center>
                    <DefaultButton
                        label="Agregar Categoría"
                        floatStyle="center"
                        onTouchTap={event => this.props.onTouchTap(event)}
                        />
                </center>
            </div>
        );
  }
}

CardDescription.displayName = 'CardDescription'

CardDescription.propTypes = {
  artCardInformation: PropTypes.object,
  onTouchTap: PropTypes.func
};