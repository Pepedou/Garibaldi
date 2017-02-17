import React, { Component } from 'react';
import Mosaic from './components/mosaic/mosaic';
import './App.css';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isPanelActive: false
    };
  }

  render(){
    return (
      <div className="app">
        
        <div className="navbar navbar-default navbar-static-top">
          <div className="container">
            <a href="/" className="navbar-brand">
              Artwork Archive
            </a>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Gallery</a></li>
              <li><a href="#">Artists</a></li>
            </ul>
          </div>
        </div>
        
        <div className="container">
          <Mosaic />
        </div>
        
      </div>
    );
  }
}
