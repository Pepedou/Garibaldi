import React, {Component} from 'react';
import Navbar from './components/navbar/navbar';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="app container-fluid">
        <Navbar/>
        {this.props.children}
      </div>
    );
  }
}
