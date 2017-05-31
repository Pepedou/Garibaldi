import React, {Component, PropTypes} from 'react';
import GridListComponent from '../../ui/grid-list/GridListComponent';
import * as constants from '../../../redux/constants'
import {connect} from 'react-redux'

class Mosaic extends Component {
  componentWillMount() {
    this.props.receiveArtGallery([
      {img: "http://geekchick.mx/wp-content/uploads/2016/05/arte.jpg"},
      {img: "http://www.potencialenaccion.com/wp-content/uploads/2016/10/La-importancia-de-las-clases-de-arte-en-los-ninos-1-1.jpg"}
    ])
  }

  render() {
    return (
      <div className="col-xs-12 Mosaic">
        <GridListComponent cardList={this.props.artGallery}/>
      </div>
    );
  }
}

Mosaic.displayName = 'Mosaic'

Mosaic.propTypes = {
  artGallery: PropTypes.array,
  receiveArtGallery: PropTypes.func
};

export const mapStateToProps = ({artGallery}) => ({
  artGallery
})

export const mapDispatchToProps = dispatch => ({
  receiveArtGallery: artGallery => dispatch({type: constants.ART_GALLERY_RECIEVED, artGallery})
})

export default connect(mapStateToProps, mapDispatchToProps)(Mosaic)