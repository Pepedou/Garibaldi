import React, {Component} from 'react';
import ProfileNavBar from '../../components/partials/nav-bars/profile-nav-bar/ProfileNavBar';
import './HomePage.css';


export default class Home extends Component {
  render() {
    return (
      <div className="home container-fluid">
        <div className="row"><ProfileNavBar/></div>
        {/*<div className="row">{this.props.children}</div>*/}
      </div>
    );
  }
}
