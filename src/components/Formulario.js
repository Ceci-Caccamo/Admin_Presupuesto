import React, { useState } from "react";
import PropTypes from "prop-types";
import shortid from "shortid";
import Error from "./Error";

const Formulario = ({ guardarGasto, guardarCrearGasto }) => {
  const [nombre, guardarNombre] = useState("");
  const [fecha, guardarFecha] = useState("");
  const [cantidad, guardarCantidad] = useState(0);
  const [error, guardarError] = useState(false);

  //cuando el usuario agrega un gasto
  const agregarGasto = (e) => {
    e.preventDefault();
    //validar
    if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === "") {
      guardarError(true);
      return;
    }
    guardarError(false);

    //construir el gasto
    const gasto = {
      nombre,
      cantidad,
      fecha,
      id: shortid.generate(),
    };
    console.log(gasto);

    //pasar el gasto a componente principal
    guardarGasto(gasto);
    guardarCrearGasto(true);

    //resetear el formulario
    guardarNombre("");
    guardarCantidad(0);
  };

  return (
    <form onSubmit={agregarGasto}>
      <h2>Ingresa tus Gastos</h2>
      {error ? (
        <Error mensaje="Ambos cambios son obligatorios o Presupuesto Incorrecto" />
      ) : null}

      <div className="campo">
        <label>Gasto</label>
        <input
          type="text"
          className="u-full-width"
          placeholder="Ej. Transporte"
          value={nombre}
          onChange={(e) => guardarNombre(e.target.value)}
        />
      </div>
      <div className="campo">
        <label>Fecha</label>
        <input
          type="date"
          className="u-full-width"
          value={fecha}
          onChange={(e) => guardarFecha(e.target.value)}
        />
      </div>
      <div className="campo">
        <label>Monto</label>
        <input
          type="number"
          className="u-full-width"
          placeholder="Ej. 300"
          value={cantidad}
          onChange={(e) => guardarCantidad(parseInt(e.target.value, 10))}
        />
      </div>
      <input
        type="submit"
        className="button-primary u-full-width"
        value="Agregar Gasto"
      />
    </form>
  );
};

Formulario.propTypes = {
  guardarGasto: PropTypes.func.isRequired,
  guardarCrearGasto: PropTypes.func.isRequired,
};

export default Formulario;
