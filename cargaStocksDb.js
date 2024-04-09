import axios from "axios";
import Stock from "./src/models/Stock.js";

export default function () {
  const apiEndpoint = "https://financialmodelingprep.com/api/v3/stock/list";
  const apiKey = "skWTSzxSEWa1kG9v83zFPBOr9UJjfvme";

  // Función para cargar datos desde el endpoint y guardarlos en la base de datos
  async function cargarDatosDesdeAPI(apiEndpoint, apiKey) {
    try {
      // Realizar la solicitud HTTP al endpoint
      const response = await axios.get(apiEndpoint, {
        params: {
          apikey: apiKey,
        },
      });

      // Extraer los datos de la respuesta JSON
      const stocks = response.data;

      // Insertar los datos en la base de datos utilizando Sequelize
      await Stock.bulkCreate(stocks);

      console.log("Datos insertados correctamente en la base de datos.");
    } catch (error) {
      console.error("Error al cargar datos desde la API:", error);
    }
  }

  // Definir la URL del endpoint y la clave API

  // Llamar a la función para cargar datos desde la API
  cargarDatosDesdeAPI(apiEndpoint, apiKey);
}
