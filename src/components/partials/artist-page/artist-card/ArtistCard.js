import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CardComponent from '../../../ui/card/CardComponent.js'
import CardDescription from './CardDescription'
import CardActions from './CardActions'
import Category from '../../../ui/category/Category'
import SvgIcon from 'material-ui/SvgIcon'
import {white} from 'material-ui/styles/colors'
import transformToImages from '../../../../utils/services/cloudinaryImageTransform'
import ArtistServices from '../../../../utils/services/artistServices'
import CulturalHelpersServices from '../../../../utils/services/culturalHelperServices'
import images from '../../../../content/images/exportImages'
import { loadTemplateConfigForArtists } from '../../../../redux/reducers/templates/actions'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'

require("./ArtistCard.css")

const objectAssign = require('object-assign')

let editBtnStyle = {
    color: white
}

class ArtistCard extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            editedArtist: objectAssign({}, {...props.currentArtist}),
            dataSource: []
        }
    }

    componentWillMount() {
        let setState = this.setState.bind(this)
        let {addNotification} = this.props

        CulturalHelpersServices.getAll()
        .then(function (response) {
            let culturalHelpers = []
            response.map((item, key) => culturalHelpers.push({text: `${item.name} ${item.lastName}`, value: item.id}))
            setState({dataSource: culturalHelpers})
        })
        .catch(function (error) {
            addNotification(error)
        })
    }

    handleAddCategory(event) {
        let editedArtistCopy = {...this.state.editedArtist}
        let emptyCategory = {
            label: "Nombre de la categoría...",
            value: "Valor de la categoría..."
        }
        editedArtistCopy.categories.push(emptyCategory)
        this.setState({editedArtist: editedArtistCopy})
    }

    handleCategoryValidation(data, position, property, propertyName) {
        let editedArtistCopy = {...this.state.editedArtist}
        if(propertyName === "category") {
            let currentCategoriesCopy = editedArtistCopy.categories
            if(data === ""){
                currentCategoriesCopy = [...currentCategoriesCopy.slice(0,position), ...currentCategoriesCopy.slice(position+1)]
            } else {
                currentCategoriesCopy[position][property] = data
            }
            editedArtistCopy.categories = currentCategoriesCopy
        } else {
            if(data === "") {
                editedArtistCopy.detail[propertyName].value = this.props.currentArtist.detail[propertyName].value
            } else {
                editedArtistCopy.detail[propertyName].value = data
            }
        }
        this.setState({editedArtist: editedArtistCopy})
    }

    handleOnNewRequest(value){
        let editedArtistCopy = {...this.state.editedArtist}
        editedArtistCopy.detail.culturalHelperName = value.text
        editedArtistCopy.detail.culturalHelperId.value = value.value
        
        this.setState({editedArtist: editedArtistCopy})
    }

    handleOnUpdateInput(data){
        if(!this.state.dataSource.find(item => item.text.toUpperCase() === data.toUpperCase())){
            let editedArtistCopy = {...this.state.editedArtist}
            editedArtistCopy.detail.culturalHelperName = "Valor no definido"
            editedArtistCopy.detail.culturalHelperId.value = 0
            
            this.setState({editedArtist: editedArtistCopy})
        }
    }

    getPhoto(editedArtist) {
        if( Object.getOwnPropertyNames(editedArtist).length > 0) {
            if(editedArtist.detail.photo.value.standard === "" || !editedArtist.detail.photo.value.standard) {
                return images.default_user
            } else {
                return editedArtist.detail.photo.value.standard
            }
        } else {
            return images.default_user
        }
    }

    handleSave(event) {
        let {currentArtist, loadingArtistDetail, addNotification, sourceImage, extraImages} = this.props

        let newArtist = {
            name: this.state.editedArtist.detail.name.value,
            lastName: this.state.editedArtist.detail.lastName.value,
            nickname: this.state.editedArtist.detail.nickname.value,
            age: this.state.editedArtist.detail.age.value,
            nationality: this.state.editedArtist.detail.nationality.value,
            profession: this.state.editedArtist.detail.profession.value,
            piece: this.state.editedArtist.detail.piece.value,
            education: this.state.editedArtist.detail.education.value,
            exhibitions: this.state.editedArtist.detail.exhibitions.value,
            photo: sourceImage !== ""
                    ? transformToImages(sourceImage)
                    : this.state.editedArtist.detail.photo.value.standard
                        ? this.state.editedArtist.detail.photo.value
                        : {thumbnail: '', standard: ''},
            culturalHelperId: this.state.editedArtist.detail.culturalHelperId.value,
            categories: this.state.editedArtist.categories,
            profilePics: extraImages
        }

        loadingArtistDetail(true)  
        ArtistServices.update(currentArtist.id, newArtist)
        .then(function (response) {
            window.location.reload()
        })
        .catch(function (error) {
            addNotification(error)
            loadingArtistDetail(false)
        })
    }

    handleDelete() {
        let {currentArtist, loadingArtistDetail, addNotification} = this.props

        loadingArtistDetail(true)
        ArtistServices.destroy(currentArtist.id)
        .then(function (response) {
            window.location.reload()
        })
        .catch(function (error) {
            addNotification(error)
            loadingArtistDetail(false)
        })
    }

    async handlePDF() {
        let {currentArtist, loadingArtistDetail, configExportForArtists, router} = this.props
        loadingArtistDetail(true)
        await configExportForArtists([currentArtist.id])
        loadingArtistDetail(false)
        router.push('/exportConfiguration')
    }

    render() {
        let {editedArtist} = this.state
        let {showDropZoneOverlayRecieved, sourceImage} = this.props
        let photo = this.getPhoto(editedArtist)
        return (
            <div className="ArtistCard">
                <div className="imageHeaderBar row">
                    <div className="editImageBtn col-xs-6 col-md-6" onClick={() => showDropZoneOverlayRecieved(true)}>
                        <SvgIcon style={editBtnStyle}>
                            <path d="M2 12.88V16h3.12L14 7.12 10.88 4 2 12.88zm14.76-8.51c.33-.33.33-.85 0-1.18l-1.95-1.95c-.33-.33-.85-.33-1.18 0L12 2.88 15.12 6l1.64-1.63z"/>
                        </SvgIcon>
                    </div>
                </div>
                <CardComponent 
                    overlayTitle={<Category category={{required: true,
                                                       categoryName: 'Nombre',
                                                       categoryValue: editedArtist.detail.name.value,
                                                       editableName: false,
                                                       editableValue: true,
                                                       propertyName: "name"}} 
                                            validate={this.handleCategoryValidation.bind(this)}
                                            withCategoryName={false}/>}
                    overlaySubtitle={<Category category={{required: true,
                                                          categoryName: 'Apellido',
                                                          categoryValue: editedArtist.detail.lastName.value,
                                                          editableName: false,
                                                          editableValue: true,
                                                          propertyName: "lastName"}}
                                               validate={this.handleCategoryValidation.bind(this)}
                                               withCategoryName={false}/>}
                    cardImage={sourceImage !== "" ? sourceImage : photo}
                    cardTitle={null}
                    cardSubtitle={null}
                    cardDescription={<CardDescription artistCardInformation={editedArtist}
                                                      onTouchTap={this.handleAddCategory.bind(this)}
                                                      handleCategoryValidation={this.handleCategoryValidation.bind(this)}
                                                      dataSource={this.state.dataSource}
                                                      onNewRequest={this.handleOnNewRequest.bind(this)}
                                                      onUpdateInput={this.handleOnUpdateInput.bind(this)}/>}
                    cardActions={<CardActions handleSave={this.handleSave.bind(this)} handleDelete={this.handleDelete.bind(this)} handlePDF={this.handlePDF.bind(this)}/>}
                />
            </div>
        )
  }
}

ArtistCard.displayName = 'ArtistCard'

ArtistCard.propTypes = {
  currentArtist: PropTypes.object,
  sourceImage: PropTypes.string,
  receiveCurrentArt: PropTypes.func,
  receiveCurrentArtist: PropTypes.func,
  loadingArtistDetail: PropTypes.func,
  addNotification: PropTypes.func,
  showDropZoneOverlayRecieved: PropTypes.func,
  extraImages: PropTypes.array
}

export default withRouter(connect(
  null,
  { configExportForArtists: loadTemplateConfigForArtists}
)(ArtistCard))