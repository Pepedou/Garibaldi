import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import SvgIcon from 'material-ui/SvgIcon';
import {blue500, blue700} from 'material-ui/styles/colors'
import ArtPieceServices from '../../../utils/services/artPiecesServices'
import ArtistServices from '../../../utils/services/artistServices'
import LoaderComponent from '../../../components/ui/loader/LoaderComponent'

require('./FloatingBar.css')

const style = {
  marginLeft: 20
};

export default class FloatingBar extends Component {
  redirectToExportConfiguration() {
    window.location = './exportConfiguration'
  }

  exportToPdf(event, checkCards, props){
    let {loadingArtDetail, loadingArtistDetail} = props

    if(window.location.pathname === "/home"){
      loadingArtDetail(true)
      //TODO: Llamar al de obras
    } else {
      loadingArtistDetail(true)
      //TODO: Llamar al de artistas
    }
  }

  deleteArtPieces(ids, props) {
    let {addNotification, loadingArtGallery, clearCheckCards} = props

    loadingArtGallery(true)
    ArtPieceServices.destroyMany(ids)
    .then(function (response) {
        window.location.reload()
    })
    .catch(function (error) {
        addNotification(error)
        clearCheckCards()
        loadingArtGallery(false)
    })
  }

  deleteArtists(ids, props) {
    let {addNotification, loadingArtistGallery, clearCheckCards} = props

    loadingArtistGallery(true)
    ArtistServices.destroyMany(ids)
    .then(function (response) {
        window.location.reload()
    })
    .catch(function (error) {
        addNotification(error)
        clearCheckCards()
        loadingArtistGallery(false)
    })
  }

  deleteCards(event, checkCards){
    if(checkCards.length > 0){
      if(window.location.pathname === "/home"){
        this.deleteArtPieces(checkCards, this.props)
      } else {
        this.deleteArtists(checkCards, this.props)
      }
    }
  }

  addCard(){
    if(window.location.pathname === "/home"){
      window.location = './newArt'
    } else {
      window.location = './newArtist'
    }
  }

  render() {
    let {checkCards, updatingCurrentArt, updatingCurrentArtist} = this.props
    return ( 
      <div className="FloatingBar">
        {
          updatingCurrentArt || updatingCurrentArtist
          ? <LoaderComponent/>
          : <div>
              {
                this.props.checkCards.length > 0 && <FloatingActionButton 
                                                    style={style} 
                                                    backgroundColor={blue700}
                                                    onTouchTap={event => this.exportToPdf(event, checkCards, this.props)}>
                                                    <SvgIcon>
                                                        <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/>
                                                    </SvgIcon>
                                                </FloatingActionButton>
              }
              {
              this.props.checkCards.length > 0 && <FloatingActionButton 
                                                  style={style}
                                                  backgroundColor={blue500}
                                                  onTouchTap={event => this.deleteCards(event, checkCards)}>
                                                  <SvgIcon>
                                                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                                  </SvgIcon>
                                              </FloatingActionButton>
              }
              <FloatingActionButton 
                style={style}
                onTouchTap={event => this.addCard(event, checkCards)}>
                <ContentAdd />
              </FloatingActionButton>
            </div>
        }
      </div>
    );
  }
}

FloatingBar.displayName = 'FloatingBar'

FloatingBar.propTypes = {
  checkCards: PropTypes.array,
  clearCheckCards: PropTypes.func,
  loadingArtDetail: PropTypes.func,
  loadingArtistDetail: PropTypes.func
};