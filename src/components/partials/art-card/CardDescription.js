import React, {Component, PropTypes} from 'react';
import Category from '../category/Category.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {grey600} from 'material-ui/styles/colors';

let styles = {
    addCategory: {
        backgroundColor: grey600,
        style: {
            marginTop: 10
        }
    }
}

export default class CardDescription extends Component {
    render() {
        return (
            <div className="CardDescription row">
                <Category category={{required: true, editableName: false, editableValue: true, categoryName: "Nombre de la pieza", categoryValue: this.props.artCardInformation.title}}/>
                <Category category={{required: false, editableName: false, editableValue: true, categoryName: "Año", categoryValue: this.props.artCardInformation.year}} />
                <Category category={{required: true, editableName: false, editableValue: true, categoryName: "Artista", categoryValue: this.props.artCardInformation.artist}} />
                <Category category={{required: false, editableName: false, editableValue: true, categoryName: "Descripción", categoryValue: this.props.artCardInformation.description}} />
                {
                    this.props.artCardInformation.categories.map((item, key) => <Category category={item} key={key} />)
                }
                <center>
                    <FloatingActionButton 
                        mini={true} 
                        backgroundColor={styles.addCategory.backgroundColor} 
                        style={styles.addCategory.style}
                        onTouchTap={(event) => this.props.onTouchTap({...this.props.artCardInformation})}
                        className="AddCategory">
                        <ContentAdd />
                    </FloatingActionButton>
                </center>
            </div>
        );
  }
}

CardDescription.displayName = 'CardDescription'

CardDescription.propTypes = {
  artCardInformation: PropTypes.object,
  onTouchTap: PropTypes.func
};