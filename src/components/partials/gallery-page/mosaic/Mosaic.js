import React, {Component, PropTypes} from 'react'
import GridListComponent from '../../ui/grid-list/GridListComponent'
import * as constants from '../../../redux/constants'
import {connect} from 'react-redux'
import axios from 'axios'
import galleryMock from '../../../mocks/galleryMock'
import './Mosaic.css'

class Mosaic extends Component {
  render() {
    return (
      <div className="col-xs-12 Mosaic">
        <GridListComponent cardList={this.props.artGallery}/>
      </div>
    )
  }
}

Mosaic.displayName = 'Mosaic'

Mosaic.propTypes = {
  artGallery: PropTypes.array,
  receiveCurrentArt: PropTypes.func
}

export const mapDispatchToProps = dispatch => ({
  receiveCurrentArt: art => dispatch({type: constants.CURRENT_ART_RECEIVED, art}),
})

export default connect(null, mapDispatchToProps)(Mosaic)