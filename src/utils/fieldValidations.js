/* eslint-disable no-useless-escape*/

// let currentFieldIndex = fieldList.findIndex(field => field.name === obligatoryFields[i].name);

export let getFieldIndex = (fieldList, fieldId) => fieldList.findIndex(field => field.id === fieldId)
export let getFieldValue = (fieldList, fieldId) => fieldList.find(field => field.id === fieldId)

export let updateField = (fieldList, fieldId, fieldProperty, fieldValue) => {
    let fieldIndex = getFieldIndex(fieldList, fieldId);
    fieldList[fieldIndex][fieldProperty] = fieldValue;
    return fieldList;
}

export let getUserFields = fieldList => {
    let userFieldList = {};
    for(let i = 0; i < fieldList.length; i++)
    {
        if(fieldList[i].className.indexOf("userField") !== -1){
            userFieldList[fieldList[i].id] = fieldList[i].defaultValue;
        }
    }
    return userFieldList;
}

export let validateObligatoryFields = (fieldList) => {
    let valid = true;
    for(let i = 0; i < fieldList.length; i++)
    {
        fieldList[i].errorText = ""
        if(fieldList[i].className.indexOf("obligatoryField") !== -1){
            if(fieldList[i].className.indexOf("TextField")) {
                if(fieldList[i].defaultValue === ""){
                    fieldList[i].errorText = "Campo obligatorio"
                    valid = false;
                }
            } else {
                if(fieldList[i].defaultValue === "-1"){
                    fieldList[i].errorText = "Campo obligatorio"
                    valid = false;
                }
            }
        }
    }
    return {valid, fieldList};
}

export let areFieldsEqual = (field1, field2) => field1 === field2

export let isEmailFormatValid = (email) => {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

export let getDetailValue = value => value === "" ? "Valor no definido" : value
