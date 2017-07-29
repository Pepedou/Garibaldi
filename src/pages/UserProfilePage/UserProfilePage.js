import React, {Component} from 'react';
import {connect} from 'react-redux'

class UserProfilePage extends Component {
    componentWillMount() {
    }

    render() {
        return (
            <div className="col-xs-12 col-md-12 UserProfilePage">
                <div className="row">
                    Pantalla para perfil de usuario
                </div>
            </div>
        );
    }
}

UserProfilePage.displayName = 'UserProfilePage'

UserProfilePage.propTypes = {
}

export default connect(null, null)(UserProfilePage)