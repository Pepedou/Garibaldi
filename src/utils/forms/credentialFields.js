export let credentialFields = {
    personalLeftInformation: [
        {
            inputType: "textField",
            floatingLabelText: "Nombre",
            hintText: "Ingresa el nombre",
            id: "name",
            type: "text",
            className: "userField obligatoryField personalLeftInformation TextField",
            errorText: "",
            defaultValue: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Apellido",
            hintText: "Ingresa el apellido",
            id: "lastName",
            type: "text",
            className: "userField obligatoryField personalLeftInformation TextField",
            errorText: "",
            defaultValue: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Fecha de nacimiento",
            hintText: "Ingresa la fecha de nacimiento",
            id: "birthDate",
            type: "text",
            className: "userField obligatoryField personalLeftInformation TextField",
            errorText: "",
            defaultValue: ""
        },
        {
            inputType: "toggle",
            labelOnTrue: "Estado del usuario: Activado",
            labelOnFalse: "Estado del usuario: Desactivado",
            defaultToggled: false,
            id: "active"
        }
    ],
    personalRightInformation: [
        {
            inputType: "textField",
            floatingLabelText: "Dirección 1",
            hintText: "Ingresa la dirección 1",
            id: "address1",
            type: "text",
            className: "userField obligatoryField personalRightInformation TextField",
            errorText: "",
            defaultValue: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Dirección 2",
            hintText: "Ingresa la dirección 2",
            id: "address2",
            type: "text",
            className: "userField obligatoryField personalRightInformation TextField",
            errorText: "",
            defaultValue: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Ciudad",
            hintText: "Ingresa la ciudad",
            id: "city",
            type: "text",
            className: "userField obligatoryField personalRightInformation TextField",
            errorText: "",
            defaultValue: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Estado",
            hintText: "Ingresa el estado",
            id: "state",
            type: "text",
            className: "userField obligatoryField personalRightInformation TextField",
            errorText: "",
            defaultValue: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "País",
            hintText: "Ingresa el país",
            id: "country",
            type: "text",
            className: "userField obligatoryField personalRightInformation TextField",
            errorText: "",
            defaultValue: ""
        }
    ],
    passwordField: [
        {
            inputType: "textField",
            floatingLabelText: "Contraseña anterior",
            hintText: "Ingresa la contraseña anterior",
            id: "oldPassword",
            type: "password",
            className: "userField obligatoryField passwordField TextField",
            errorText: "",
            defaultValue: ""
        },
        {
            inputType: "textField",
            floatingLabelText: "Nueva contraseña",
            hintText: "Ingresa la nueva contraseña",
            id: "newPassword",
            type: "password",
            className: "userField obligatoryField passwordField TextField",
            errorText: "",
            defaultValue: ""
        }
    ]
}