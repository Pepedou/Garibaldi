import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as constants from '../../redux/constants'
import {connect} from 'react-redux'
import axios from 'axios'
import {NotificationTypes} from '../../components/alerts/notifications/NotificationTypes'
import {handleError} from '../../utils/errorHandling'
import LoaderComponent from '../../components/ui/loader/LoaderComponent'

class AddCardPage extends Component {
    componentWillMount() {
    }

    render() {
        return (
            <div className="col-xs-12 col-md-12 AddCardPage">
                <div className="row">
                    Pantalla para nueva tarjeta
                </div>
            </div>
        );
    }
}

AddCardPage.displayName = 'AddCardPage'

AddCardPage.propTypes = {
}

export default connect(null, null)(AddCardPage)