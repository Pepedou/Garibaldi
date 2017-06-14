import React, {Component, PropTypes} from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import '../../../../Main.css';
import './ProfileNavBar.css';
import {white} from 'material-ui/styles/colors';
import {connect} from 'react-redux'
import * as constants from '../../../../redux/constants'

let styles = {
    iconStyle: {
        color: white
    }
}

class ProfileNavBar extends Component {
    handleOnItemTouchTap(event, child, receiveCurrentUser) {
        if(child.props.value === "logout") {
            sessionStorage.removeItem("currentUser");
            receiveCurrentUser({})
            window.location = './'
        }
    }

    render() {
        return (
            <div className="ProfileNavBar row">
                <div className="col-xs-8 col-md-6">
                    <IconMenu
                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        animated={true}
                        onItemTouchTap={(event, child) => this.handleOnItemTouchTap(event, child, this.props.receiveCurrentUser)}
                        iconStyle={styles.iconStyle}
                        className={"UserIconMenu"}
                        >
                        <MenuItem primaryText="Mi perfil" value="myProfile"/>
                        <MenuItem primaryText="Cerrar sesión" value="logout"/>
                    </IconMenu>
                    <div className="userFullName">{`${this.props.user.name} ${this.props.user.lastName}`}</div>
                </div>
                <div className="col-xs-4 col-md-6">
                    <img src="" alt="" className="whiteNavLogo"/>
                </div>
            </div>
        );
    }
}

ProfileNavBar.displayName = 'ProfileNavBar'

ProfileNavBar.propTypes = {
  user: PropTypes.object
};

export const mapDispatchToProps = dispatch => ({
  receiveCurrentUser: user => dispatch({type: constants.CURRENT_USER_RECIEVED, user})
})

export default connect(null, mapDispatchToProps)(ProfileNavBar)