import React, {Component} from 'react';
import Category from '../../components/Category/Category.js';

export default class ArtPanel extends Component {
  render() {
    return (
      <div className="col-xs-12 ArtPanel">
          <div className="row">
            <div className="col-xs-12">
              <img src={this.props.art.artImage} alt=""/>
            </div>
            <div className="col-xs-12">
              {
                this.props.art.categories.map((item, key) => <Category category={item} key={key}/>)
              }
            </div>
          </div>
      </div>
    );
  }
}