import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Error from "./Error";

function Pregunta({ guardarRestante, guardarPresupuesto, actualizarPregunta }) {
  //definimos el state
  const [cantidad, guardarCantidad] = useState(0);
  const [error, guardarError] = useState(false);

  //funcion que lee el presupuesto
  const definirPresupuesto = (e) => {
    guardarCantidad(parseInt(e.target.value)); //parseInt convierte a numero el value ingresado(en la consola, si es string se ve negro, si es numero en rojo)
  };

  //submit para definir el presupuesto
  const agregarPresupuesto = (e) => {
    e.preventDefault();

    //validar
    if (cantidad < 1 || isNaN(cantidad)) {
      guardarError(true);
      return;
    }

    //si se pasa la validacion
    guardarError(false);
    guardarPresupuesto(cantidad);
    guardarRestante(cantidad);
    actualizarPregunta(false);
  };
  return (
    <Fragment>
      <h2>Coloca tu presupuesto</h2>

      {error ? <Error mensaje="El presupuesto es incorrecto" /> : null}
      <form onSubmit={agregarPresupuesto}>
        <input
          type="number" //solo permite numeros
          className="u-full-width" //clase de skeletons
          placeholder="Coloca tu presupuesto"
          onChange={definirPresupuesto}
        />
        <input
          type="submit"
          className="button-primary u-full-width"
          value="Definir Presupuesto"
        />
      </form>
    </Fragment>
  );
}

Pregunta.propTypes = {
  guardarRestante: PropTypes.func.isRequired,
  guardarPresupuesto: PropTypes.func.isRequired,
  actualizarPregunta: PropTypes.func.isRequired,
};

export default Pregunta;
