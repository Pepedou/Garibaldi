import React, { Component } from "react";
import PropTypes from "prop-types";
import Category from "../../../ui/category/Category.js";
import DefaultButton from "../../../ui/buttons/DefaultButton";
import { getDetailValue } from "../../../../utils/fieldValidations";

export default class CardDescription extends Component {
  render() {
    let {
      artistCardInformation,
      handleCategoryValidation,
      onTouchTap,
      dataSource,
      onNewRequest,
      onUpdateInput
    } = this.props;
    return (
      <div className="CardDescription row">
        <Category
          category={{
            required: true,
            categoryName: "Email",
            categoryValue: artistCardInformation.detail.email.value,
            editableName: false,
            editableValue: false,
            propertyName: "email"
          }}
          validate={handleCategoryValidation}
        />
        <Category
          category={{
            required: false,
            categoryName: "Nombre artístico",
            categoryValue: getDetailValue(
              artistCardInformation.detail.nickname.value
            ),
            editableName: false,
            editableValue: true,
            propertyName: "nickname"
          }}
          validate={handleCategoryValidation}
        />
        <Category
          category={{
            required: false,
            categoryName: "Edad",
            categoryValue: getDetailValue(
              artistCardInformation.detail.age.value
            ),
            editableName: false,
            editableValue: true,
            propertyName: "age"
          }}
          validate={handleCategoryValidation}
        />
        <Category
          category={{
            required: false,
            categoryName: "Nacionalidad",
            categoryValue: getDetailValue(
              artistCardInformation.detail.nationality.value
            ),
            editableName: false,
            editableValue: true,
            propertyName: "nationality"
          }}
          validate={handleCategoryValidation}
        />
        <Category
          category={{
            required: false,
            categoryName: "Profesión",
            categoryValue: getDetailValue(
              artistCardInformation.detail.profession.value
            ),
            editableName: false,
            editableValue: true,
            propertyName: "profession"
          }}
          validate={handleCategoryValidation}
        />
        <Category
          category={{
            required: false,
            categoryName: "Pieza",
            categoryValue: getDetailValue(
              artistCardInformation.detail.piece.value
            ),
            editableName: false,
            editableValue: true,
            propertyName: "piece"
          }}
          validate={handleCategoryValidation}
        />
        <Category
          category={{
            required: false,
            categoryName: "Estudios",
            categoryValue: getDetailValue(
              artistCardInformation.detail.education.value
            ),
            editableName: false,
            editableValue: true,
            editingClass: "TextAreaStyle",
            propertyName: "education"
          }}
          validate={handleCategoryValidation}
        />
        <Category
          category={{
            required: false,
            categoryName: "Exposiciones",
            categoryValue: getDetailValue(
              artistCardInformation.detail.exhibitions.value
            ),
            editableName: false,
            editableValue: true,
            editingClass: "TextAreaStyle",
            propertyName: "exhibitions"
          }}
          validate={handleCategoryValidation}
        />
        <Category
          category={{
            required: true,
            categoryName: "Gestor Cultural",
            categoryValue: getDetailValue(
              artistCardInformation.detail.culturalHelperName
            ),
            editableName: false,
            editableValue: true,
            propertyName: "culturalHelperName"
          }}
          validate={handleCategoryValidation}
          isAutocomplete={true}
          dataSource={dataSource}
          onNewRequest={onNewRequest}
          onUpdateInput={onUpdateInput}
        />
        {artistCardInformation.categories.map((item, key) => (
          <Category
            key={key}
            position={key}
            category={{
              required: false,
              categoryName: item.label,
              categoryValue: item.value,
              editableName: true,
              editableValue: true,
              propertyName: "category"
            }}
            validate={handleCategoryValidation}
          />
        ))}
        <center>
          <DefaultButton
            label="Agregar Categoría"
            floatStyle="center"
            onTouchTap={event => onTouchTap(event)}
          />
        </center>
      </div>
    );
  }
}

CardDescription.displayName = "CardDescription";

CardDescription.propTypes = {
  artistCardInformation: PropTypes.object,
  onTouchTap: PropTypes.func,
  handleCategoryValidation: PropTypes.func,
  dataSource: PropTypes.array,
  onNewRequest: PropTypes.func,
  onUpdateInput: PropTypes.func
};
