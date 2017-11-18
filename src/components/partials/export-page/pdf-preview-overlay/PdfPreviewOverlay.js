import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as constants from '../../../../redux/constants'
import ExportToPDFButton from '../../../ui/export-to-pdf-button/ExportToPDFButton'
require('../../../../Main.css')
require('./PdfPreviewOverlay.css')

class PdfPreviewOverlay extends Component {
    toggleOverlay(showPdfPreviewOverlayRecieved) {
        showPdfPreviewOverlayRecieved(false)
    }

    render() {
        let {showPdfPreviewOverlay, showPdfPreviewOverlayRecieved, exportTemplates, exportFile, exportPages, exportCategories} = this.props
        return (showPdfPreviewOverlay
            ? <div className="Overlay PdfPreviewOverlay">
                <a className="Closebtn noPrint" onClick={() => this.toggleOverlay(showPdfPreviewOverlayRecieved)}>&times;</a>
                <div className="overlayContent">
                <center>
                {
                    exportFile.EXPFILE1.pages.map((value, key) => {
                        let pageBgClassName = `pdfPage ${exportTemplates.allTemplates[exportFile.EXPFILE1.template].backgroundPosition}`
                        let bgStyle = {
                            backgroundImage: `url(${exportTemplates.allTemplates[exportFile.EXPFILE1.template].background})`
                        }
                        let membreteStyle = {
                            backgroundColor: exportTemplates.allTemplates[exportFile.EXPFILE1.template].lineColor
                        }
                        let pageLogoClassName = `pdfLogo ${exportTemplates.allTemplates[exportFile.EXPFILE1.template].logoPosition}`
                        return <div className={pageBgClassName} style={bgStyle} key={key}>
                            {
                                exportTemplates.allTemplates[exportFile.EXPFILE1.template].logo !== ""
                                ? <div className="logoWrapper row">
                                    <img alt="" src={exportTemplates.allTemplates[exportFile.EXPFILE1.template].logo} className={pageLogoClassName}/>
                                </div>
                                : null
                            }
                            <div className="pageContent row" key={key}>
                                <div className="col-xs-12 col-md-12">
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
                            </div>
                            {
                                exportTemplates.allTemplates[exportFile.EXPFILE1.template].lineColor !== ""
                                ? <div className="membrete" style={membreteStyle}></div>
                                : null
                            }
                            
                        </div>
                    })
                }
                </center>
                </div>
                <ExportToPDFButton pageClass=".pdfPage"/>
            </div>
            : null)
    }
}

PdfPreviewOverlay.displayName = 'PdfPreviewOverlay'

PdfPreviewOverlay.propTypes = {
  showPdfPreviewOverlayRecieved: PropTypes.func,
  showPdfPreviewOverlay: PropTypes.bool,
  exportFile: PropTypes.object,
  exportPages: PropTypes.object,
  exportCategories: PropTypes.object,
  exportTemplates: PropTypes.object
}

export const mapStateToProps = ({showPdfPreviewOverlay, exportFile, exportPages, exportCategories, exportTemplates}) => ({
  showPdfPreviewOverlay,
  exportFile,
  exportPages,
  exportCategories,
  exportTemplates
})

export const mapDispatchToProps = dispatch => ({
  showPdfPreviewOverlayRecieved: show => dispatch({type: constants.SHOW_PDF_PREVIEW_OVERLAY, show})
})

export default connect(mapStateToProps, mapDispatchToProps)(PdfPreviewOverlay)