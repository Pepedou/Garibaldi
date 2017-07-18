import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Category from '../../../ui/category/Category.js';
import DefaultButton from '../../../ui/buttons/DefaultButton'

export default class CardDescription extends Component {
    render() {
        return (
            <div className="CardDescription row">
                {
                    this.props.artistCardInformation.categories.map((item, key) => <Category key={key} category={{required: false, categoryName: item.label, categoryValue: item.value, editableName: true, editableValue: true}}/>)
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
  artistCardInformation: PropTypes.object,
  onTouchTap: PropTypes.func
};