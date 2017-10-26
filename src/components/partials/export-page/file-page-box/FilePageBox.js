require('./FilePageBox.css')

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  labelStyle: {color: 'gray'},
  iconStyle: {fill: 'gray'}
};

export default class FilePageBox extends Component {

    render() {
        let {page, categories} = this.props
        return <div className="row">
            <div className="FilePageBox">
                <div className="row pageTitle">{page.title}</div>
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        {
                            page.imagesSelection
                            ? <div className="artistsImagesWrapper">
                                <div className="instruction">Seleccione la imagen del artista que desea mostrar en el documento</div>
                                <div className="imagesList">
                                    {
                                        page.imagesSelection.map((image, key) => 
                                            <img alt="" key={key} src={image} className="imageItem"/>
                                        )
                                    }
                                </div>
                                <Checkbox
                                    label="Sin Imagen"
                                    labelStyle={styles.labelStyle}
                                    iconStyle={styles.iconStyle}
                                    onCheck={(event) => this.props.onCheck(event)}
                                    />
                            </div>
                            : <div className="artImageWrapper">
                                <div className="instruction">Seleccione la imagen del artista que desea mostrar en el documento</div>
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
                                        onCheck={(event) => this.props.onCheck(event)}
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
    categories: PropTypes.object
}