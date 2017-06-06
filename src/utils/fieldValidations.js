/* eslint-disable no-useless-escape*/

export let validateObligatoryFields = (fieldList) => {
    let obligatoryFields = document.querySelectorAll(".obligatoryField input");
    let valid = true;

    for(let i = 0; i < obligatoryFields.length; i++)
    {
        let currentFieldIndex = fieldList.findIndex(field => field.name === obligatoryFields[i].name);
        fieldList[currentFieldIndex].fieldErrorMessage = ""
        if(obligatoryFields[i].value === ""){
            fieldList[currentFieldIndex].fieldErrorMessage = "Campo obligatorio"
            valid = false;
        }
    }

    return {valid, fieldList};
}

export let areFieldsEqual = (field1, field2) => field1.value === field2.value

export let isEmailFormatValid = (emailField) => {
    emailField.style.border = "1px solid #ccc";
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let valid = re.test(emailField.value)
    if(!valid){
        emailField.style.border = "1px solid red";
    }
    return valid;
}

