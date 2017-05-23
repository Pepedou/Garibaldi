export let validateObligatoryFields = () => {
    let obligatoryFields = document.querySelectorAll(".obligatoryField input");
    let valid = true;

    for(let i = 0; i < obligatoryFields.length; i++)
    {
        if(obligatoryFields[i].value === ""){
            valid = false;
        }
    }

    return valid;
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

