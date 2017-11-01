import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
require('./FilePageBox.css')

const styles = {
  labelStyle: {color: 'gray'},
  iconStyle: {fill: 'gray'}
};

export default class FilePageBox extends Component {
    selectProfileImage(event, pageId, image, key, props) {
        let {exportPages} = this.props
        let page = exportPages[pageId]
        let pageCopy = {...page}
        pageCopy.image = image

        //TODO: Dispatch para actualizar exportPages
        var images = document.getElementsByClassName(`imageItem${pageId}`)
        for(var i = 0; i < images.length; i++) {
            images[i].classList.remove("imageSelected")
        }

        event.target.classList.add("imageSelected")
    }

    onCheckNoImage(event, pageId, props) {
        let {exportPages} = this.props
        let page = exportPages[pageId]
        let pageCopy = {...page}
        pageCopy.withImage = event.target.checked
        pageCopy.image = ''

        //TODO: Dispatch para actualizar exportPages
    }

    onCheckCategory(event, categoryId, pageId) {
        let {exportPages} = this.props
        let page = exportPages[pageId]
        let pageCopy = {...page}
        
        if(event.target.checked) {
            pageCopy.categories.push(categoryId)
        } else {
            let index = pageCopy.categories.indexOf(categoryId)
            pageCopy.categories = [...pageCopy.categories.slice(0,index), ...pageCopy.categories.slice(index+1)]
        }

        //TODO: Dispatch para actualizar exportPages
    }

    isCategoryChecked(categoryId, pageId) {
        let {exportPages} = this.props
        let index = exportPages[pageId].categories.indexOf(categoryId)
        return index !== -1
    }

    render() {
        let {page, categories, type, exportPages} = this.props
        return <div className="row">
            <div className="FilePageBox">
                <div className="row pageTitle">{type === "artist" ? page.name : page.title}</div>
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        {
                            type === "artist"
                            ? page.profilesImages.length > 0
                                ? <div className="artistsImagesWrapper">
                                    <div className="instruction">Seleccione la imagen del artista que desea mostrar en el documento</div>
                                    <div className="imagesList">
                                        {
                                            page.profilesImages.map((image, key) => {
                                                let isImageSelected = exportPages[page.id].image === image ? 'imageSelected' : ''
                                                let imageClassName = `imageItem imageItem${page.id} imageItem${page.id}${key} ${isImageSelected}`
                                                return <img alt="" key={key} src={image} className={imageClassName} onClick={(event) => this.selectProfileImage(event, page.id, image, key, this.props)}/>
                                            })
                                        }
                                    </div>
                                    <Checkbox
                                        label="Sin Imagen"
                                        labelStyle={styles.labelStyle}
                                        iconStyle={styles.iconStyle}
                                        onCheck={(event) => this.props.onCheckNoImage(event, page.id)}
                                        />
                                </div>
                                : <div className="artistWithNoImagesMessage">El artista no tiene imágenes en su perfil</div>
                            : <div className="artImageWrapper">
                                 <img alt="" src={page.image} className="imageItemFull"/>
                              </div>
                        }
                    </div>
                    <div className="col-xs-12 col-md-6 categoriesWrapper">
                        <div className="instruction">Seleccione las categorias que desea mostrar en el documento</div>
                        <div className="categoriesList">
                        {
                            page.categories.map((value, key) => 
                                <div className="row" key={key}>
                                    <Checkbox
                                        checked={this.isCategoryChecked(value, page.id).bind(this)}
                                        label={categories[value].label}
                                        labelStyle={styles.labelStyle}
                                        iconStyle={styles.iconStyle}
                                        onCheck={(event) => this.props.onCheckCategory(event, value, page.id)}
                                        />
                                </div>
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

FilePageBox.displayName = 'FilePageBox'

FilePageBox.propTypes = {
    page: PropTypes.object,
    categories: PropTypes.object,
    type: PropTypes.string,
    exportPages: PropTypes.object
}