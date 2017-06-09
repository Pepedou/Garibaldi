export let registerUserFields = {
    userInformation: [
        {
            inputType: "textField",
            floatingLabelText: "Nombre de usuario",
            hintText: "Ingresa el nombre de usuario",
            id: "username",
            name: "username",
            type: "text",
            className: "userField obligatoryField",
            errorText: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Contraseña",
            hintText: "Ingresa la contraseña",
            id: "password",
            name: "password",
            type: "password",
            className: "userField obligatoryField",
            errorText: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Confirmación de contraseña",
            hintText: "Ingresa la contraseña nuevamente",
            id: "confirmPassword",
            name: "confirmPassword",
            type: "password",
            className: "obligatoryField",
            errorText: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Email",
            hintText: "Ingresa el correo eletrónico",
            id: "email",
            name: "email",
            type: "email",
            className: "userField obligatoryField",
            errorText: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Confirmación de Email",
            hintText: "Ingresa el correo eletrónico nuevamente",
            id: "confirmEmail",
            name: "confirmEmail",
            type: "email",
            className: "obligatoryField",
            errorText: ""
        },
        {
            inputType: "selectField",
            floatingLabelText: "Tipo de usuario",
            id: "userType",
            className: "userType",
            errorText: "",
            options: [{value: 1, text: "Gestor Cultural"}, {value: 2, text: "Artista"}],
            value: 1
        }
    ],
    personalInformation: [
        {
            inputType: "textField",
            floatingLabelText: "Nombre",
            hintText: "Ingresa el nombre",
            id: "name",
            name: "name",
            type: "text",
            className: "userField obligatoryField",
            errorText: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Apellido",
            hintText: "Ingresa el apellido",
            id: "lastName",
            name: "lastName",
            type: "text",
            className: "userField obligatoryField",
            errorText: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Fecha de nacimiento",
            hintText: "Ingresa la fecha de nacimiento",
            id: "birthDate",
            name: "birthDate",
            type: "text",
            className: "userField obligatoryField",
            errorText: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Dirección 1",
            hintText: "Ingresa la dirección 1",
            id: "address1",
            name: "address1",
            type: "text",
            className: "userField obligatoryField",
            errorText: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Dirección 2",
            hintText: "Ingresa la dirección 2",
            id: "address2",
            name: "address2",
            type: "text",
            className: "userField obligatoryField",
            errorText: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Ciudad",
            hintText: "Ingresa la ciudad",
            id: "city",
            name: "city",
            type: "text",
            className: "userField obligatoryField",
            errorText: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Estado",
            hintText: "Ingresa el estado",
            id: "state",
            name: "state",
            type: "text",
            className: "userField obligatoryField",
            errorText: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "País",
            hintText: "Ingresa el país",
            id: "country",
            name: "country",
            type: "text",
            className: "userField obligatoryField",
            errorText: ""
        }
    ]
}