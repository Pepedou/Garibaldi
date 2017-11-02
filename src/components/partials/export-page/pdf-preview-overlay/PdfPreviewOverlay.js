import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DefaultButton from '../../../ui/buttons/DefaultButton'
import {exportTemplates, exportFiles, exportPages, exportCategories} from '../../../../mocks/exportStateMock'
require('../../../../Main.css')
require('./PdfPreviewOverlay.css')

export default class PdfPreviewOverlay extends Component {
    toggleOverlay(showPdfPreviewOverlayRecieved) {
        showPdfPreviewOverlayRecieved(false)
    }

    downloadPdf() {

    }

    render() {
        let {showPdfPreviewOverlay, showPdfPreviewOverlayRecieved} = this.props
        return (showPdfPreviewOverlay
            ? <div className="Overlay PdfPreviewOverlay">
                <a className="Closebtn" onClick={() => this.toggleOverlay(showPdfPreviewOverlayRecieved)}>&times;</a>
                {
                    exportFiles.file.pages.map((value, key) => {
                        let pageBgClassName = `pdfPage ${exportTemplates[exportFiles.file.template].backgroundPosition}`
                        let bgStyle = {
                            backgroundImage: `url(${exportTemplates[exportFiles.file.template].background})`
                        }
                        let membreteStyle = {
                            backgroundColor: exportTemplates[exportFiles.file.template].lineColor
                        }
                        let pageLogoClassName = `pdfLogo ${exportTemplates[exportFiles.file.template].logoPosition}`
                        return <div className={pageBgClassName} style={bgStyle} key={key}>
                            {
                                exportTemplates[exportFiles.file.template].logo !== ""
                                ? <div className="logoWrapper">
                                    <img alt="" src={exportTemplates[exportFiles.file.template].logo} className={pageLogoClassName}/>
                                </div>
                                : null
                            }
                            <div className="pageContent" key={key}>
                                {
                                    exportPages[value].withImage
                                    ? <img alt="" src={exportPages[value].image} className="itemImage"/>
                                    : null
                                }
                                <div className="categoriesWrapper">
                                    {
                                        exportPages[value].categories.map((category, key) => <div key={key} className="categoryRow">
                                            <div className="categoryLabel">{exportCategories[category].label}:</div>
                                            <div className="categoryValue">{exportCategories[category].value}</div> 
                                        </div>)
                                    }
                                </div>
                            </div>
                            {
                                exportTemplates[exportFiles.file.template].lineColor !== ""
                                ? <div className="membrete" style={membreteStyle}></div>
                                : null
                            }
                            
                        </div>
                    })
                }
                <DefaultButton
                    label="DESCARGAR"
                    labelPosition="after"
                    floatStyle="right"
                    className="marginTop"
                    onTouchTap={event => this.downloadPdf(event, this.props)}
                    />
            </div>
            : null)
    }
}

PdfPreviewOverlay.displayName = 'PdfPreviewOverlay'

PdfPreviewOverlay.propTypes = {
  showPdfPreviewOverlayRecieved: PropTypes.func,
  showPdfPreviewOverlay: PropTypes.bool
  //Agregar exportFiles y exportPages a mapStateToProps
}