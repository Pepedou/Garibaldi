import React, {Component} from 'react'
import Mosaic from '../../components/partials/mosaic/Mosaic'
import ArtCard from '../../components/partials/art-card/ArtCard'
import './GalleryPage.css'

class GalleryPage extends Component {
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
        // });
        
        this.props.receiveArtGallery(galleryMock)
        this.props.receiveCurrentArt(galleryMock[0])
    }

    render() {
        return (
            <div className="col-xs-12 col-md-12 GalleryPage">
                <div className="row">
                    <div className="col-xs-12 col-md-8">
                        <div className="row">
                            <Mosaic artGallery={artGallery}/>
                        </div>
                    </div>
                    <div className="ArtPanelColumn col-xs-12 col-md-4">
                        <div className="row">
                            <div className="col-xs-12 col-md-12">
                                <ArtCard currentArt={currentArt}/>
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