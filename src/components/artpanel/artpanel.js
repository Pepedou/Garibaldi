import React, {Component} from 'react';
import Category from '../../components/Category/Category.js';

export default class ArtPanel extends Component {
  constructor(props) {
        super(props);
        this.state = {
            artImage: props.art.artImage,
            categories: props.art.categories
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
    let currentCategoriesState = [...this.state.categories]
    console.log(currentCategoriesState);
    currentCategoriesState.push(emptyCategory)
    this.setState({
        categories: currentCategoriesState
    });
  }

  render() {
    return (
      <div className="col-xs-12 ArtPanel">
          <div className="row">
            <div className="col-xs-12">
              <img src={this.state.artImage} alt=""/>
            </div>
            <div className="col-xs-12" id="categoryList">
              {
                this.state.categories.map((item, key) => <Category category={item} key={key}/>)
              }
              <button type="button" onClick={this.addCategory.bind(this)} className="addCategoryButton">Agregar categoria</button>
            </div>
          </div>
      </div>
    );
  }
}