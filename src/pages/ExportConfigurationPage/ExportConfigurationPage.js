/*eslint-disable no-mixed-operators*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleError } from "../../utils/errorHandling";
import * as constants from "../../redux/constants";
import DividerComponent from "../../components/ui/divider/DividerComponent";
import FilePageBox from "../../components/partials/export-page/file-page-box/FilePageBox";
import InputFieldComponent from "../../components/ui/input-field/InputFieldComponent";
import DefaultButton from "../../components/ui/buttons/DefaultButton";
import { withRouter } from "react-router";
import { updateExportFile } from "../../redux/reducers/exportFile/actions";
require("../../Main.css");
require("./ExportConfigurationPage.css");

class ExportConfigurationPage extends Component {
  constructor(props) {
    super(props);

    let dropdownOptions = this.getDropdownOptions();

    this.state = {
      templateDropdown: {
        inputType: "selectField",
        floatingLabelText: "Nombre de la plantilla",
        id: "template",
        className: "templateDropdown",
        errorText: "",
        options: dropdownOptions,
        defaultValue: dropdownOptions.length > 0 ? dropdownOptions[0].text : ""
      }
    };
  }

  componentWillMount() {
    let { router, exportFile, exportPages, exportCategories } = this.props;
    if (
      Object.keys(exportFile).length === 0 ||
      Object.keys(exportPages).length === 0 ||
      Object.keys(exportCategories).length === 0
    ) {
      router.push("/home");
    }
  }

  getDropdownOptions() {
    let { exportTemplates } = this.props;
    let templateOptions = [];
    Object.keys(exportTemplates.allTemplates).forEach(key => {
      templateOptions.push({
        value: exportTemplates.allTemplates[key].id,
        text: exportTemplates.allTemplates[key].name
      });
    });
    return templateOptions;
  }

  handleOnChangeTemplate(event, props) {
    let { exportFile, updateFile, exportTemplates } = this.props;
    let exportFileCopy = { ...exportFile };
    exportFileCopy.EXPFILE1.template = event.target.value;
    updateFile(exportFileCopy);
    let templateDropdownCopy = { ...this.state.templateDropdown };
    templateDropdownCopy.defaultValue =
      exportTemplates.allTemplates[event.target.value].name;
    this.setState({ templateDropdown: templateDropdownCopy });
  }

  createPreview(event, props) {
    let { showPdfPreviewOverlayRecieved } = props;
    showPdfPreviewOverlayRecieved(true);
  }

  render() {
    let {
      exportFile,
      exportPages,
      exportCategories,
      exportArtists,
      exportArtPieces,
      exportTemplates
    } = this.props;
    return Object.keys(exportTemplates.allTemplates).length === 0 ? (
      <div className="col-xs-12 col-md-12 ExportConfigurationPage">
        <center>
          <div className="row">
            No se encontraron plantillas. Para exportar a PDF es necesario tener
            al menos una plantilla
          </div>
        </center>
      </div>
    ) : (
      <div className="col-xs-12 col-md-12 ExportConfigurationPage noPrint">
        <div className="row subtitle">Exportar a PDF</div>
        <div className="row">
          <div className="col-xs-12 col-md-12">
            <div className="dropdownWrapper row">
              <div className="col-xs-12 col-md-12 instruction">
                Seleccione la imagen del artista que desea mostrar en el
                documento
              </div>
              <div className="col-xs-12 col-md-6">
                <InputFieldComponent
                  inputType={this.state.templateDropdown.inputType}
                  floatingLabelText={
                    this.state.templateDropdown.floatingLabelText
                  }
                  className={this.state.templateDropdown.className}
                  id={this.state.templateDropdown.id}
                  errorText={this.state.templateDropdown.errorText}
                  options={this.state.templateDropdown.options}
                  value={this.state.templateDropdown.defaultValue}
                  onChange={event =>
                    this.handleOnChangeTemplate(event, this.props)
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row divider">
          <DividerComponent />
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-12">
            {exportFile.EXPFILE1.pages.map((value, key) => {
              let page =
                exportPages[value].type === "Artist"
                  ? exportArtists[value]
                  : exportArtPieces[value];
              return (
                <FilePageBox
                  key={key}
                  page={page}
                  categories={exportCategories}
                  exportPages={exportPages}
                  type={exportPages[value].type}
                />
              );
            })}
          </div>
        </div>
        <div className="row buttonWrapper">
          <DefaultButton
            label="ACEPTAR"
            labelPosition="after"
            floatStyle="right"
            className="marginTop"
            onTouchTap={event => this.createPreview(event, this.props)}
          />
        </div>
      </div>
    );
  }
}

ExportConfigurationPage.displayName = "ExportConfigurationPage";

ExportConfigurationPage.propTypes = {
  exportTemplates: PropTypes.object,
  exportFile: PropTypes.object,
  exportPages: PropTypes.object,
  exportCategories: PropTypes.object,
  exportArtists: PropTypes.object,
  exportArtPieces: PropTypes.object,
  addNotification: PropTypes.func,
  clearAllNotifications: PropTypes.func,
  showPdfPreviewOverlayRecieved: PropTypes.func
};

export const mapStateToProps = ({
  exportTemplates,
  exportFile,
  exportPages,
  exportCategories,
  exportArtists,
  exportArtPieces
}) => ({
  exportTemplates,
  exportFile,
  exportPages,
  exportCategories,
  exportArtists,
  exportArtPieces
});

export const mapDispatchToProps = dispatch => ({
  addNotification: notification => handleError(dispatch, notification),
  clearAllNotifications: () =>
    dispatch({ type: constants.CLEAR_ALL_NOTIFICATIONS }),
  showPdfPreviewOverlayRecieved: show =>
    dispatch({ type: constants.SHOW_PDF_PREVIEW_OVERLAY, show }),
  updateFile: () => dispatch(updateExportFile())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExportConfigurationPage)
);
