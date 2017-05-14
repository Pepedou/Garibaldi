export let validateObligatoryFields = () => {
    let obligatoryFields = document.getElementsByClassName("obligatoryField");
    let valid = true;

    for(let i = 0; i < obligatoryFields.length; i++)
    {
        obligatoryFields[i].style.border = "1px solid #ccc";
        if(obligatoryFields[i].value === ""){
            obligatoryFields[i].style.border = "1px solid red";
            valid = false;
        }
    }

    return valid;
}

export let isEmailFormatValid = (emailField) => {
    emailField.style.border = "1px solid #ccc";
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let valid = re.test(emailField.value)
    if(!valid){
        emailField.style.border = "1px solid red";
    }
    return valid;
}

export let areFieldsEqual = (field1, field2) => {
    field1.style.border = "1px solid #ccc";
    field2.style.border = "1px solid #ccc";

    if(field1.value !== field2.value){
        field1.style.border = "1px solid red";
        field2.style.border = "1px solid red";
    }

    return field1.value === field2.value
}