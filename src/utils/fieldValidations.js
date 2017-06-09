/* eslint-disable no-useless-escape*/

// let currentFieldIndex = fieldList.findIndex(field => field.name === obligatoryFields[i].name);

export let validateObligatoryFields = (fieldList) => {
    let obligatoryFields = document.querySelectorAll(".obligatoryField input");
    let valid = true;

    for(let i = 0; i < fieldList.length; i++)
    {
        fieldList[i].errorText = ""
        if(fieldList[i].className.indexOf("obligatoryField") !== -1){
            if(fieldList[i].value === ""){
                fieldList[i].errorText = "Campo obligatorio"
                valid = false;
            }
        }
    }

    return {valid, fieldList};
}

export let areFieldsEqual = (field1, field2) => field1.value === field2.value

export let isEmailFormatValid = (emailField) => {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailField.value)
}

