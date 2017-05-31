import React, {Component, PropTypes} from 'react';
import GridListComponent from '../../ui/grid-list/GridListComponent';
import * as constants from '../../../redux/constants'
import {connect} from 'react-redux'
import axios from 'axios'

class Mosaic extends Component {
  componentWillMount() {
    let receiveArtGallery = this.props.receiveArtGallery;
    axios.get('api/mosaic')
    .then(function (response) {
      receiveArtGallery(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
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