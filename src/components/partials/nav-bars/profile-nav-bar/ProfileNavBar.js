import React, {Component, PropTypes} from 'react';
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
    handleOnItemTouchTap(event, child) {
        console.log("event", event);
        console.log("child", child.props.primaryText);
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
                        onItemTouchTap={this.handleOnItemTouchTap}
                        iconStyle={styles.iconStyle}
                        className={"UserIconMenu"}
                        >
                        <MenuItem primaryText="Mi perfil" />
                        <MenuItem primaryText="Cerrar sesión" />
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