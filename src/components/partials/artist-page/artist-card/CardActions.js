import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DefaultButton from '../../../ui/buttons/DefaultButton'

export default class CardActions extends Component {
    render() {
        let {handleSave, handleDelete, handlePDF} = this.props
        return (
            <div className="CardActions row">
                <center>
                    <DefaultButton
                        label="Guardar"
                        floatStyle="center"
                        onTouchTap={event => handleSave(event)}
                        />
                    <DefaultButton
                        label="Eliminar"
                        floatStyle="center"
                        onTouchTap={event => handleDelete(event)}
                        />
                    <DefaultButton
                        label="PDF"
                        floatStyle="center"
                        onTouchTap={event => handlePDF(event)}
                        />
                </center>
            </div>
        );
  }
}

CardActions.displayName = 'CardActions'

CardActions.propTypes = {
  handleSave: PropTypes.func,
  handleDelete: PropTypes.func,
  handlePDF: PropTypes.func
};