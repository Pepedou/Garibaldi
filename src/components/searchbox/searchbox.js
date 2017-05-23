import React, {Component} from 'react';

export default class SearchBox extends Component {
  render() {
    return (
      <div className="col-lg-6 SearchBox">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Search for..."/>
          <span className="input-group-btn">
            <button className="btn btn-default" type="button">Go!</button>
          </span>
        </div>
      </div>
    );
  }
}