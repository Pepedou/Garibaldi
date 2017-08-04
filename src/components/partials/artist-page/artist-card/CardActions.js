import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DefaultButton from '../../../ui/buttons/DefaultButton'

export default class CardActions extends Component {
    render() {
        let {artCardInformation} = this.props
        return (
            <div className="CardActions row">
                <center>
                    <DefaultButton
                        label="Guardar"
                        floatStyle="center"
                        onTouchTap={event => this.handleSave(event, artCardInformation)}
                        />
                    <DefaultButton
                        label="Eliminar"
                        floatStyle="center"
                        onTouchTap={event => this.handleDelete(event, artCardInformation)}
                        />
                    <DefaultButton
                        label="PDF"
                        floatStyle="center"
                        onTouchTap={event => this.handlePDF(event, artCardInformation)}
                        />
                        
                </center>
            </div>
        );
  }
}

CardActions.displayName = 'CardActions'

CardActions.propTypes = {
  artistCardInformation: PropTypes.object
};