import { GASTOS_DB } from "../data/gasto.data.js";
import { GastoCombustible } from "../models/gasto.model.js";

var gastoAnual = {
  2020 : 0,
  2019 : 0,
  2018 : 0,
  2017 : 0,
  2016 : 0,
  2015 : 0
};

function almacenarGastos(){

  GASTOS_DB.forEach(element => {

    // Almacenar en localStorage cada registro de gastos
    let id = element.id;
    let elementoJson = JSON.stringify(element);
    localStorage.setItem(id, elementoJson);

    // Actualiza la variable gastoAnual con los datos de GASTOS_DB
    let anio = element.date.getFullYear();
    gastoAnual[anio] += element.precioViaje; 
    
  });

  // Almacenar en sessionStorage los años y la cantidad
  for (let anio in gastoAnual) {
      sessionStorage.setItem(anio, gastoAnual[anio]);
  };

}

export const GastoService = {

  almacenarGastos,
  procesarGasto

}

function procesarGasto(jsonNuevoGasto){
  
  // Convertimos los datos en objeto JSON
  let nuevoGastoParseado = JSON.parse(jsonNuevoGasto);
  
  // Creamos un objeto de la clase GastoCombustible
  let id = nuevoGastoParseado.id;
  let vehiculo = nuevoGastoParseado.vehicleType;
  let fecha = new Date(nuevoGastoParseado.date);
  let kilometros = nuevoGastoParseado.kilometers;
  let coste = nuevoGastoParseado.precioViaje;
  const nuevoGasto = new GastoCombustible(id, vehiculo, fecha, kilometros, coste);

  // Localizamos el año al que se refiere el gasto
  let anio = nuevoGasto.date.getFullYear();
  // Recuperamos de sessionStorage el total acumulado para el año en cuestión
  let totalAnio = parseFloat(sessionStorage.getItem(anio));
  // Sumamos el nuevo coste al acumulado del año en cuestión
  let nuevoTotalAnual = nuevoGasto.precioViaje + totalAnio;
  // Volvemos a guardar el nuevo acumulado en sessionStorage
  sessionStorage.setItem(anio , nuevoTotalAnual);
  
}
