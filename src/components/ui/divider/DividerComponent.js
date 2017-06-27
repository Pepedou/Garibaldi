import React, {Component, PropTypes} from 'react';
import Divider from 'material-ui/Divider';
import {grey500} from 'material-ui/styles/colors';

const style = {
  backgroundColor: grey500,
};

export default class DividerComponent extends Component {
    render() {
        return(
            <Divider style={style}/>
        )
    }
}