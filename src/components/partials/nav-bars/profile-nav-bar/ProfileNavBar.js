import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import '../../../../Main.css';
import './ProfileNavBar.css';
import {white} from 'material-ui/styles/colors';

let styles = {
    iconStyle: {
        color: white
    }
}

export default class ProfileNavBar extends Component {
    handleOnItemTouchTap(event, child, receiveCurrentUser) {
        if(child.props.value === "logout") {
            localStorage.removeItem("currentUser");
            receiveCurrentUser({})
            window.location = './'
        }
    }

    render() {
        let {currentUser, receiveCurrentUser} = this.props
        return (
            <div className="ProfileNavBar row">
                <div className="col-xs-8 col-md-6">
                    <IconMenu
                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        animated={true}
                        onItemTouchTap={(event, child) => this.handleOnItemTouchTap(event, child, receiveCurrentUser)}
                        iconStyle={styles.iconStyle}
                        className="UserIconMenu"
                        >
                        <MenuItem primaryText="Mi perfil" value="myProfile"/>
                        <MenuItem primaryText="Cerrar sesión" value="logout"/>
                    </IconMenu>
                    <div className="userFullName">{currentUser.name}</div>
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
  currentUser: PropTypes.object,
  receiveCurrentUser: PropTypes.func
}