import React, {Component, PropTypes} from 'react';
import Category from '../../../ui/category/Category.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {grey600} from 'material-ui/styles/colors';

let styles = {
    addCategory: {
        backgroundColor: grey600,
        style: {
            marginTop: 10
        }
    }
}

export default class CardDescription extends Component {
    render() {
        return (
            <div className="CardDescription row">
                DESCRIPCION
            </div>
        );
  }
}

CardDescription.displayName = 'CardDescription'

CardDescription.propTypes = {
  artCardInformation: PropTypes.object,
  onTouchTap: PropTypes.func
};