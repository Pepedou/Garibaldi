export let registerUserFields = {
  userInformation: [
    {
      inputType: "textField",
      floatingLabelText: "Email",
      hintText: "Ingresa el email",
      id: "email",
      type: "email",
      className: "userField obligatoryField userInformation TextField",
      errorText: "",
      defaultValue: ""
    },
    {
      inputType: "textField",
      floatingLabelText: "Confirmación de Email",
      hintText: "Ingresa el email nuevamente",
      id: "confirmEmail",
      type: "email",
      className: "obligatoryField userInformation TextField",
      errorText: "",
      defaultValue: ""
    },
    {
      inputType: "textField",
      floatingLabelText: "Contraseña",
      hintText: "Ingresa la contraseña",
      id: "password",
      type: "password",
      className: "userField obligatoryField userInformation TextField",
      errorText: "",
      defaultValue: ""
    },
    {
      inputType: "textField",
      floatingLabelText: "Confirmación de contraseña",
      hintText: "Ingresa la contraseña nuevamente",
      id: "confirmPassword",
      type: "password",
      className: "obligatoryField userInformation TextField",
      errorText: "",
      defaultValue: ""
    },
    {
      inputType: "selectField",
      floatingLabelText: "Tipo de usuario",
      id: "ownerType",
      className: "userField userInformation SelectField",
      errorText: "",
      options: [
        { value: "CulturalHelper", text: "Gestor Cultural" },
        { value: "Artist", text: "Artista" }
      ],
      defaultValue: "CulturalHelper"
    }
  ],
  personalInformation: [
    {
      inputType: "textField",
      floatingLabelText: "Nombre",
      hintText: "Ingresa el nombre",
      id: "name",
      type: "text",
      className: "userField obligatoryField personalInformation TextField",
      errorText: "",
      defaultValue: ""
    },
    {
      inputType: "textField",
      floatingLabelText: "Apellido",
      hintText: "Ingresa el apellido",
      id: "lastName",
      type: "text",
      className: "userField obligatoryField personalInformation TextField",
      errorText: "",
      defaultValue: ""
    },
    {
      inputType: "textField",
      floatingLabelText: "Fecha de nacimiento",
      hintText: "Ingresa la fecha de nacimiento",
      id: "birthDate",
      type: "text",
      className: "userField obligatoryField personalInformation TextField",
      errorText: "",
      defaultValue: ""
    },
    {
      inputType: "textField",
      floatingLabelText: "Dirección 1",
      hintText: "Ingresa la dirección 1",
      id: "address1",
      type: "text",
      className: "userField obligatoryField personalInformation TextField",
      errorText: "",
      defaultValue: ""
    },
    {
      inputType: "textField",
      floatingLabelText: "Dirección 2",
      hintText: "Ingresa la dirección 2",
      id: "address2",
      type: "text",
      className: "userField obligatoryField personalInformation TextField",
      errorText: "",
      defaultValue: ""
    },
    {
      inputType: "textField",
      floatingLabelText: "Ciudad",
      hintText: "Ingresa la ciudad",
      id: "city",
      type: "text",
      className: "userField obligatoryField personalInformation TextField",
      errorText: "",
      defaultValue: ""
    },
    {
      inputType: "textField",
      floatingLabelText: "Estado",
      hintText: "Ingresa el estado",
      id: "state",
      type: "text",
      className: "userField obligatoryField personalInformation TextField",
      errorText: "",
      defaultValue: ""
    },
    {
      inputType: "textField",
      floatingLabelText: "País",
      hintText: "Ingresa el país",
      id: "country",
      type: "text",
      className: "userField obligatoryField personalInformation TextField",
      errorText: "",
      defaultValue: ""
    }
  ]
};
