import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
require('./FilePageBox.css')

const styles = {
  labelStyle: {color: 'gray'},
  iconStyle: {fill: 'gray'}
};

export default class FilePageBox extends Component {
    selectProfileImage(event, id, image, key) {
        //Actualiza image
        //Cambiar el estilo de la imagen seleccionada
        var images = document.getElementsByClassName(`imageItem${id}`)
        for(var i = 0; i < images.length; i++) {
            images[i].classList.remove("imageSelected")
        }

        event.target.classList.add("imageSelected")
    }

    onCheckNoImage(event, id) {
        //Actualiza withImage e image
    }

    onCheckCategory(event, value, id) {
        //Actualiza categories
    }

    render() {
        let {page, categories, type} = this.props
        return <div className="row">
            <div className="FilePageBox">
                <div className="row pageTitle">{type === "artist" ? page.name : page.title}</div>
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        {
                            type === "artist"
                            ? <div className="artistsImagesWrapper">
                                <div className="instruction">Seleccione la imagen del artista que desea mostrar en el documento</div>
                                <div className="imagesList">
                                    {
                                        page.profilesImages.map((image, key) => {
                                            let imageClassName = `imageItem imageItem${page.id} imageItem${page.id}${key}`
                                            return <img alt="" key={key} src={image} className={imageClassName} onClick={(event) => this.selectProfileImage(event, page.id, image, key)}/>
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
    type: PropTypes.string
}