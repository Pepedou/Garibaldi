import React, {Component} from 'react';

export default class SearchBar extends Component {
  render() {
    return (
      <div className="SearchBar input-group">
          <input type="text" className="form-control" placeholder="Filtrar información..."/>
          <span className="input-group-btn">
            <button className="btn btn-default" type="button">Buscar</button>
          </span>
        </div>
    );
  }
}