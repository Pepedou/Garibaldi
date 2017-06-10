import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import './ProfileNavBar.css';

class ProfileNavBar extends Component {
    render() {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <IconMenu
                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        >
                        <MenuItem primaryText="Refresh" />
                        <MenuItem primaryText="Send feedback" />
                        <MenuItem primaryText="Settings" />
                        <MenuItem primaryText="Help" />
                        <MenuItem primaryText="Sign out" />
                    </IconMenu>
                    <Avatar
                        src="../../../../content/images/user.png"
                        size={30}
                        />
                    <div>Aqui va el nombre del usuario</div>
                </ToolbarGroup>
                <ToolbarGroup lastChild={true}>
                    Aqui va el logo
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

ProfileNavBar.displayName = 'ProfileNavBar'

ProfileNavBar.propTypes = {
  user: PropTypes.object
};

export const mapStateToProps = ({user}) => ({
  user
})

export default connect(mapStateToProps, null)(ProfileNavBar)