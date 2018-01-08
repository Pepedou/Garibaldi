import React, { Component } from "react";
import PropTypes from "prop-types";
import DatePicker from "material-ui/DatePicker";
import { grey600, grey500 } from "material-ui/styles/colors";

var cultureInfo = {
  day: {
    name: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado"
    ],
    abbr: ["Dom", "Lun", "Mar", "Miér", "Jue", "Vie", "Sáb"]
  },
  month: {
    name: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ],
    abbr: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Diciembre"
    ]
  }
};

const styles = {
  textFieldStyle: {
    borderColor: grey500,
    color: grey600
  }
};

export default class DatePickerComponent extends Component {
  render() {
    return (
      <DatePicker
        hintText={this.props.hintText}
        id={this.props.id}
        className={this.props.className}
        okLabel="Aceptar"
        cancelLabel="Cancelar"
        style={styles.textFieldStyle}
        textFieldStyle={styles.textFieldStyle}
      />
    );
  }
}

DatePickerComponent.propTypes = {
  hintText: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string
};
