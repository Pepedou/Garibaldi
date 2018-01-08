import React, { Component } from "react";
import PropTypes from "prop-types";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import "../../../../Main.css";
import "./ProfileNavBar.css";
import { white } from "material-ui/styles/colors";
import images from "../../../../content/images/exportImages";
import { withRouter } from "react-router";

let styles = {
  iconStyle: {
    color: white
  }
};

let getScreenLogo = () => {
  if (window.screen.width > 400) {
    return images.logo_white_name;
  }
  return images.logo_white_clip;
};

export class ProfileNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoImage: images.logo_white_name
    };

    this.updateLogo = this.updateLogo.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateLogo);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateLogo);
  }

  updateLogo(event) {
    event.preventDefault();
    this.setState({ logoImage: getScreenLogo() });
  }

  handleOnItemTouchTap(event, child, receiveCurrentUser, router) {
    if (child.props.value === "logout") {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
      receiveCurrentUser({});
      router.push("/");
    } else {
      router.push("/myUserProfile");
    }
  }

  render() {
    let { currentUser, receiveCurrentUser, router } = this.props;
    return (
      <div className="ProfileNavBar row noPrint">
        <div className="col-xs-8 col-md-6">
          <IconMenu
            iconButtonElement={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            anchorOrigin={{ horizontal: "left", vertical: "top" }}
            targetOrigin={{ horizontal: "left", vertical: "top" }}
            animated={true}
            onItemTouchTap={(event, child) =>
              this.handleOnItemTouchTap(
                event,
                child,
                receiveCurrentUser,
                router
              )
            }
            iconStyle={styles.iconStyle}
            className="UserIconMenu"
          >
            <MenuItem primaryText="Mi perfil" value="myProfile" />
            <MenuItem primaryText="Cerrar sesión" value="logout" />
          </IconMenu>
          <div className="userFullName">{currentUser.name}</div>
        </div>
        <div className="col-xs-4 col-md-6">
          <img src={this.state.logoImage} alt="" className="whiteNavLogo" />
        </div>
      </div>
    );
  }
}

ProfileNavBar.displayName = "ProfileNavBar";

ProfileNavBar.propTypes = {
  currentUser: PropTypes.object,
  receiveCurrentUser: PropTypes.func
};

export default withRouter(ProfileNavBar);
