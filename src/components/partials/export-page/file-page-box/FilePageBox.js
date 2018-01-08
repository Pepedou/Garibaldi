import React, { Component } from "react";
import PropTypes from "prop-types";
import Checkbox from "material-ui/Checkbox";
import { updatePage } from "../../../../redux/reducers/exportPages/actions";
import { connect } from "react-redux";
require("./FilePageBox.css");

const styles = {
  labelStyle: { color: "gray" },
  iconStyle: { fill: "gray" }
};

class FilePageBox extends Component {
  selectProfileImage(event, pageId, image, key, props) {
    let { exportPages, updatePageExports } = this.props;
    let page = exportPages[pageId];
    let pageCopy = { ...page };
    pageCopy.image = image;

    var images = document.getElementsByClassName(`imageItem${pageId}`);
    for (var i = 0; i < images.length; i++) {
      images[i].classList.remove("imageSelected");
    }

    event.target.classList.add("imageSelected");

    updatePageExports(pageCopy);
  }

  onCheckNoImage(event, pageId, profilesImages) {
    let { exportPages, updatePageExports } = this.props;
    let page = exportPages[pageId];
    let pageCopy = { ...page };
    pageCopy.withImage = !event.target.checked;

    if (event.target.checked) {
      pageCopy.image = "";
    } else {
      pageCopy.image = profilesImages[0];
    }

    updatePageExports(pageCopy);
  }

  onCheckCategory(event, categoryId, pageId) {
    let { exportPages, updatePageExports } = this.props;
    let page = exportPages[pageId];
    let pageCopy = { ...page };

    if (event.target.checked) {
      pageCopy.categories.push(categoryId);
    } else {
      let index = pageCopy.categories.indexOf(categoryId);
      pageCopy.categories = [
        ...pageCopy.categories.slice(0, index),
        ...pageCopy.categories.slice(index + 1)
      ];
    }

    updatePageExports(pageCopy);
  }

  isCategoryChecked(categoryId, pageId) {
    let { exportPages } = this.props;
    let index = exportPages[pageId].categories.indexOf(categoryId);
    return index !== -1;
  }

  render() {
    let { page, categories, type, exportPages } = this.props;
    return (
      <div className="row">
        <div className="FilePageBox">
          <div className="row pageTitle">
            {type === "Artist" ? page.name : page.title}
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-6">
              {type === "Artist" ? (
                page.profilesImages.length > 0 ? (
                  <div className="artistsImagesWrapper">
                    <div className="instruction">
                      Seleccione la imagen del artista que desea mostrar en el
                      documento
                    </div>
                    <div className="imagesList">
                      {page.profilesImages.map((image, key) => {
                        let isImageSelected =
                          exportPages[page.id].image === image
                            ? "imageSelected"
                            : "";
                        let imageClassName = `imageItem imageItem${
                          page.id
                        } imageItem${page.id}${key} ${isImageSelected}`;
                        return (
                          <img
                            alt=""
                            key={key}
                            src={image}
                            className={imageClassName}
                            onClick={event =>
                              this.selectProfileImage(
                                event,
                                page.id,
                                image,
                                key,
                                this.props
                              )
                            }
                          />
                        );
                      })}
                    </div>
                    <Checkbox
                      label="Sin Imagen"
                      labelStyle={styles.labelStyle}
                      iconStyle={styles.iconStyle}
                      onCheck={event =>
                        this.onCheckNoImage(event, page.id, page.profilesImages)
                      }
                    />
                  </div>
                ) : (
                  <div className="artistWithNoImagesMessage">
                    El artista no tiene imágenes en su perfil
                  </div>
                )
              ) : (
                <div className="artImageWrapper">
                  <img alt="" src={page.image} className="imageItemFull" />
                </div>
              )}
            </div>
            <div className="col-xs-12 col-md-6 categoriesFileBoxWrapper">
              <div className="instruction">
                Seleccione las categorias que desea mostrar en el documento
              </div>
              <div className="categoriesList">
                {page.categories.map((value, key) => (
                  <div className="row" key={key}>
                    <Checkbox
                      checked={this.isCategoryChecked(value, page.id)}
                      label={categories[value].label}
                      labelStyle={styles.labelStyle}
                      iconStyle={styles.iconStyle}
                      onCheck={event =>
                        this.onCheckCategory(event, value, page.id)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FilePageBox.displayName = "FilePageBox";

FilePageBox.propTypes = {
  page: PropTypes.object,
  categories: PropTypes.object,
  type: PropTypes.string,
  exportPages: PropTypes.object
};

export default connect(null, { updatePageExports: updatePage })(FilePageBox);
