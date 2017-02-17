import React, {Component} from 'react';
import Navbar from './components/navbar/navbar';
import Mosaic from './components/mosaic/mosaic';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPanelActive: false
    };
  }

  render() {
    return (
      <div className="app">
        <Navbar/>
        <Mosaic/>
      </div>
    );
  }
}
