import React, {Component, PropTypes} from 'react'
import * as constants from '../../redux/constants'
import {connect} from 'react-redux'
import Mosaic from '../../components/partials/gallery-page/mosaic/Mosaic'
import ArtCard from '../../components/partials/gallery-page/art-card/ArtCard'
import galleryMock from '../../mocks/galleryMock'
import './GalleryPage.css'

class GalleryPage extends Component {
    constructor(props)
    {
        super(props)

        props.receiveArtGallery(galleryMock);
        props.receiveCurrentArt(galleryMock[0]);
    }
    componentWillMount() {
        this.props.clearAllNotifications()

        // axios.get('api/mosaic')
        // .then(function (response) {
        //   if(response.data.length > 0) {
        //     this.props.receiveArtGallery(response.data);
        //     this.props.receiveCurrentArt(response.data[0]);
        //   } else {
        //     this.props.addNotification({type: NotificationTypes.DANGER, contentType: "text", message: "No hay resultados para la búsqueda especificada"});
        //   }
        // })
        // .catch(function (error) {
        //   this.props.addNotification({type: NotificationTypes.DANGER, contentType: "text", message: error});
        // })
    }

    render() {
        let artCard = this.props.artGallery.length > 0 ? <ArtCard currentArt={this.props.currentArt}/> : null
        return (
            <div className="col-xs-12 col-md-12 GalleryPage">
                <div className="row">
                    <div className="col-xs-12 col-md-8">
                        <div className="row">
                            <Mosaic artGallery={this.props.artGallery}/>
                        </div>
                    </div>
                    <div className="ArtPanelColumn col-xs-12 col-md-4">
                        <div className="row">
                            <div className="col-xs-12 col-md-12">
                                {
                                    artCard
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

GalleryPage.displayName = 'GalleryPage'

GalleryPage.propTypes = {
  artGallery: PropTypes.array,
  currentArt: PropTypes.object,
  receiveArtGallery: PropTypes.func,
  receiveCurrentArt: PropTypes.func,
  addNotification: PropTypes.func,
  clearAllNotifications: PropTypes.func
}

export const mapStateToProps = ({artGallery, currentArt}) => ({
  artGallery, currentArt
})

export const mapDispatchToProps = dispatch => ({
  receiveArtGallery: artGallery => dispatch({type: constants.ART_GALLERY_RECIEVED, artGallery}),
  receiveCurrentArt: art => dispatch({type: constants.CURRENT_ART_RECEIVED, art}),
  addNotification: notification => dispatch({type: constants.ADD_NOTIFICATION, notification}),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
})

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPage)