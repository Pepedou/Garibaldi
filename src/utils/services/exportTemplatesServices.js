import apiRoutes from "./apiRoutes";

const baseUrl = `${apiRoutes.getServiceUrl()}/api`;

class ExportTemplatesServices {
  getAll() {
    return fetch(`${baseUrl}/ExportTemplates`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (!res.ok) {
        throw new Error(
          "La información de las plantillas no se puede consultar en este momento"
        );
      } else {
        return res.json();
      }
    });
  }

  getById(id) {
    return fetch(`${baseUrl}/ExportTemplates/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (!res.ok) {
        throw new Error(
          "No se puede consultar la información de la plantilla en este momento"
        );
      } else {
        return res.json();
      }
    });
  }

  create(template) {
    return fetch(`${baseUrl}/ExportTemplates`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(template)
    }).then(res => {
      if (!res.ok) {
        throw new Error("La plantilla no se pudo crear");
      }
    });
  }

  destroy(id) {
    return fetch(`${baseUrl}/ExportTemplates/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (!res.ok) {
        throw new Error("La plantilla no se pudo eliminar");
      }
    });
  }
}

export default new ExportTemplatesServices();
