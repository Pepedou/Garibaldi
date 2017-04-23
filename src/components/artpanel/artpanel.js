import React, {Component} from 'react';
import Category from '../../components/Category/Category.js';

export default class ArtPanel extends Component {
  constructor(props) {
        super(props);
        this.state = {
            art: props.art
        };
    }

  addCategory() {
    let emptyCategory = {
            required: false,
            editableName: true,
            editableValue: true,
            categoryName: "Nombre...",
            categoryValue: "Valor..."
        }
    let categories = this.state.art.categories
    categories.push(emptyCategory)
    this.setState({
        art: categories
    });
  }

  render() {
    return (
      <div className="col-xs-12 ArtPanel">
          <div className="row">
            <div className="col-xs-12">
              <img src={this.state.art.artImage} alt=""/>
            </div>
            <div className="col-xs-12" id="categoryList">
              {
                this.state.art.categories.map((item, key) => <Category category={item} key={key}/>)
              }
              <button type="button" onClick={this.addCategory.bind(this)} className="addCategoryButton">Agregar categoria</button>
            </div>
          </div>
      </div>
    );
  }
}