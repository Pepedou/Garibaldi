import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CardComponent from '../../../ui/card/CardComponent.js'
import CardDescription from './CardDescription'
import CardActions from './CardActions'
import Category from '../../../ui/category/Category'
import transformToImages from '../../../../utils/services/cloudinaryImageTransform'
import ArtPieceServices from '../../../../utils/services/artPiecesServices'
import SvgIcon from 'material-ui/SvgIcon'
import {white} from 'material-ui/styles/colors'
import ArtistServices from '../../../../utils/services/artistServices'
import { loadTemplateConfigForArtPieces } from '../../../../redux/reducers/templates/actions'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
const objectAssign = require('object-assign')
require('./ArtCard.css')

let editBtnStyle = {
    color: white
}

class ArtCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOverlayVisible: false,
            editedArt: objectAssign({}, {...props.currentArt}),
            dataSource: []
        };
    }

    componentWillMount() {
        let setState = this.setState.bind(this)
        let {addNotification} = this.props

        ArtistServices.getAll()
        .then(function (response) {
            let artists = []
            response.map((item, key) => artists.push({text: `${item.name} ${item.lastName}`, value: item.id}))
            setState({dataSource: artists})
        })
        .catch(function (error) {
            addNotification(error)
        })
    }

    handleAddCategory(event) {
        let editedArtCopy = {...this.state.editedArt}
        let emptyCategory = {
            label: "Nombre de la categoría...",
            value: "Valor de la categoría..."
        }
        editedArtCopy.categories.push(emptyCategory)
        this.setState({editedArt: editedArtCopy})
    }

    handleCategoryValidation(data, position, property, propertyName) {
        let editedArtCopy = {...this.state.editedArt}
        if(propertyName === "category") {
            let currentCategoriesCopy = editedArtCopy.categories
            if(data === ""){
            currentCategoriesCopy = [...currentCategoriesCopy.slice(0,position), ...currentCategoriesCopy.slice(position+1)]
            } else {
            currentCategoriesCopy[position][property] = data
            }
            editedArtCopy.categories = currentCategoriesCopy
        } else {
            if(data === "") {
                editedArtCopy.detail[propertyName].value = this.props.currentArt.detail[propertyName].value
            } else {
                editedArtCopy.detail[propertyName].value = data
            }
        }
        this.setState({editedArt: editedArtCopy})
    }

    handleOnNewRequest(value){
        let editedArtCopy = {...this.state.editedArt}
        editedArtCopy.detail.author.value = value.text
        editedArtCopy.detail.artistId.value = value.value
        
        this.setState({editedArt: editedArtCopy})
    }

    handleOnUpdateInput(data){
        let {currentArt} = this.props
        let editedArtCopy = {...this.state.editedArt}

        if(!this.state.dataSource.find(item => item.text.toUpperCase() === data.toUpperCase())){
            editedArtCopy.detail.author.value = currentArt.detail.author.value
            editedArtCopy.detail.artistId.value = currentArt.detail.artistId.value
            
            this.setState({editedArt: editedArtCopy})
        }
    }

    handleSave(event) {
        let {currentArt, loadingArtDetail, addNotification, sourceImage} = this.props

        let newArt = {
            title: this.state.editedArt.detail.title.value,
            author: this.state.editedArt.detail.author.value,
            measurements: this.state.editedArt.detail.measurements.value,
            technique: this.state.editedArt.detail.technique.value,
            series: this.state.editedArt.detail.series.value,
            tiraje: this.state.editedArt.detail.tiraje.value,
            year: this.state.editedArt.detail.year.value,
            price: this.state.editedArt.detail.price.value,
            artistId: this.state.editedArt.detail.artistId.value,
            categories: this.state.editedArt.categories,
            images: sourceImage !== "" ? transformToImages(sourceImage) : this.state.editedArt.detail.images.value
        }

        loadingArtDetail(true)
        ArtPieceServices.update(currentArt.id, newArt)
        .then(function (response) {
            window.location.reload()
        })
        .catch(function (error) {
            addNotification(error)
            loadingArtDetail(false)
        })
    }

    handleDelete() {
        let {currentArt, loadingArtDetail, addNotification} = this.props

        loadingArtDetail(true)
        ArtPieceServices.destroy(currentArt.id)
        .then(function (response) {
            window.location.reload()
        })
        .catch(function (error) {
            addNotification(error)
            loadingArtDetail(false)
        })
    }

    async handlePDF() {
        let {currentArt, loadingArtDetail, configExportForArtPieces, router} = this.props
        loadingArtDetail(true)
        await configExportForArtPieces([currentArt.id])
        loadingArtDetail(false)
        router.push('/exportConfiguration')
    }

    render() {
        let {showFullImageOverlayRecieved, showDropZoneOverlayRecieved, sourceImage} = this.props
        let {editedArt} = this.state
        return (
            <div className="ArtCard">
                <div className="imageHeaderBar row">
                    <div className="editImageBtn col-xs-6 col-md-6" onClick={() => showDropZoneOverlayRecieved(true)}>
                        <SvgIcon style={editBtnStyle}>
                            <path d="M2 12.88V16h3.12L14 7.12 10.88 4 2 12.88zm14.76-8.51c.33-.33.33-.85 0-1.18l-1.95-1.95c-.33-.33-.85-.33-1.18 0L12 2.88 15.12 6l1.64-1.63z"/>
                        </SvgIcon>
                    </div>
                    <div className="FullImage-button col-xs-6 col-md-6" onClick={() => showFullImageOverlayRecieved(true)}>
                        <SvgIcon style={editBtnStyle}>
                            <path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"/>
                        </SvgIcon>
                    </div>
                </div>
                <CardComponent 
                    overlayTitle={<Category category={{required: true,
                                                       categoryName: 'Obra',
                                                       categoryValue: editedArt.detail.title.value,
                                                       editableName: false,
                                                       editableValue: true,
                                                       propertyName: "title"}}
                                            validate={this.handleCategoryValidation.bind(this)}
                                            withCategoryName={false}/>}
                    overlaySubtitle={<Category category={{required: true,
                                                    categoryName: 'Artista',
                                                    categoryValue: editedArt.detail.author.value,
                                                    editableName: false,
                                                    editableValue: true,
                                                    propertyName: "author"}}
                                         validate={this.handleCategoryValidation.bind(this)}
                                         withCategoryName={false}
                                         isAutocomplete={true}
                                         dataSource={this.state.dataSource}
                                         onNewRequest={this.handleOnNewRequest.bind(this)}
                                         onUpdateInput={this.handleOnUpdateInput.bind(this)}/>}
                    cardImage={sourceImage !== "" ? sourceImage : editedArt.detail.images.value.standard}
                    cardTitle={null}
                    cardSubtitle={null}
                    cardDescription={<CardDescription artCardInformation={editedArt}
                                                      onTouchTap={this.handleAddCategory.bind(this)}
                                                      handleCategoryValidation={this.handleCategoryValidation.bind(this)}/>}
                    cardActions={<CardActions handleSave={this.handleSave.bind(this)} handleDelete={this.handleDelete.bind(this)} handlePDF={this.handlePDF.bind(this)}/>}
                />
            </div>
        )
  }
}

ArtCard.displayName = 'ArtCard'

ArtCard.propTypes = {
  currentArt: PropTypes.object,
  sourceImage: PropTypes.string,
  receiveCurrentArt: PropTypes.func,
  showFullImageOverlayRecieved: PropTypes.func,
  loadingArtDetail: PropTypes.func,
  addNotification: PropTypes.func,
  showDropZoneOverlayRecieved: PropTypes.func
}

export default withRouter(connect(
  null,
  { configExportForArtPieces: loadTemplateConfigForArtPieces }
)(ArtCard))