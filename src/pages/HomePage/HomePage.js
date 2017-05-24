import React, {Component} from 'react';
import MainNavBar from '../../components/partials/nav-bars/main-nav-bar/MainNavBar';
import './HomePage.css';


export default class Home extends Component {
  render() {
    return (
      <div className="home container-fluid">
        <div className="row"><MainNavBar/></div>
        <div className="row">{this.props.children}</div>
      </div>
    );
  }
}
