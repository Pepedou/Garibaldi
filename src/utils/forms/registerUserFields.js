export let registerUserFields = {
    userInformation: [
        {
            inputType: "textField",
            floatingLabelText: "Nombre de usuario",
            hintText: "Ingresa el nombre de usuario",
            name: "username",
            type: "text",
            className: "userField obligatoryField",
            value: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Contraseña",
            hintText: "Ingresa la contraseña",
            name: "password",
            type: "password",
            className: "userField obligatoryField",
            value: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Confirmación de contraseña",
            hintText: "Ingresa la contraseña nuevamente",
            name: "confirmPassword",
            type: "password",
            className: "userField obligatoryField",
            value: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Correo electrónico",
            hintText: "Ingresa el correo eletrónico",
            name: "email",
            type: "email",
            className: "userField obligatoryField",
            value: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Confirmación de correo electrónico",
            hintText: "Ingresa el correo eletrónico nuevamente",
            name: "confirmEmail",
            type: "email",
            className: "userField obligatoryField",
            value: ""
        },
        {
            inputType: "selectField",
            floatingLabelText: "Tipo de usuario",
            name: "userType",
            className: "userField obligatoryField",
            options: [{value: 1, text: "Gestor Cultural"}, {value: 2, text: "Artista"}],
            value: "1"
        }
    ],
    personalInformation: [
        {
            inputType: "textField",
            floatingLabelText: "Nombre",
            hintText: "Ingresa el nombre",
            name: "name",
            type: "text",
            className: "userField obligatoryField",
            value: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Apellido",
            hintText: "Ingresa el apellido",
            name: "lastName",
            type: "text",
            className: "userField obligatoryField",
            value: ""
        },
        {
            inputType: "dateField",
            hintText: "Fecha de nacimiento",
            className: "userField obligatoryField",
            value: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Dirección 1",
            hintText: "Ingresa la dirección 1",
            name: "address1",
            type: "text",
            className: "userField obligatoryField",
            value: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Dirección 2",
            hintText: "Ingresa la dirección 2",
            name: "address2",
            type: "text",
            className: "userField obligatoryField",
            value: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Ciudad",
            hintText: "Ingresa la ciudad",
            name: "city",
            type: "text",
            className: "userField obligatoryField",
            value: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Estado",
            hintText: "Ingresa el estado",
            name: "state",
            type: "text",
            className: "userField obligatoryField",
            value: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "País",
            hintText: "Ingresa el país",
            name: "country",
            type: "text",
            className: "userField obligatoryField",
            value: ""
        }
    ]
}