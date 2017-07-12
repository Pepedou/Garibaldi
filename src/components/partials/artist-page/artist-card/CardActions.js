import React, {Component, PropTypes} from 'react';
import DefaultButton from '../../../ui/buttons/DefaultButton'

export default class CardActions extends Component {
    render() {
        return (
            <div className="CardActions row">
                {/*<center>
                    <DefaultButton
                        label="Guardar"
                        floatStyle="center"
                        onTouchTap={event => this.handleSave(event, this.props.artCardInformation)}
                        />
                    <DefaultButton
                        label="Eliminar"
                        floatStyle="center"
                        onTouchTap={event => this.handleDelete(event, this.props.artCardInformation)}
                        />
                    <DefaultButton
                        label="PDF"
                        floatStyle="center"
                        onTouchTap={event => this.handlePDF(event, this.props.artCardInformation)}
                        />
                </center>*/}
            </div>
        );
  }
}

CardActions.displayName = 'CardActions'

CardActions.propTypes = {
  artistCardInformation: PropTypes.object
};