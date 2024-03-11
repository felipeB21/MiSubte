export default async function subteAPI() {
  const URL = process.env.API_URL;

  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.Entity.map((subte) => ({
      id: subte.ID,
      linea: insertSpaceAfterLinea(subte.Linea.Route_Id),
      tripId: subte.Linea.Trip_Id,
      startTime: subte.Linea.start_time,
      estaciones: subte.Linea.Estaciones.map(
        (estacion) => estacion.stop_name
      ).join(", "),
    }));
  } catch (error) {
    console.error("Error fetching subte data:", error);
  }
}

function insertSpaceAfterLinea(linea) {
  const match = linea.match(/Linea(\w+)/);
  if (match && match[1]) {
    return `Linea ${match[1]}`;
  }
  return linea;
}
