import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "../styles/map.css";

const Map = (lng, lat) => {
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoidGlhbjI4MTIiLCJhIjoiY2xubmphcXVzMDU2MzJrcDFvNnA0M3ltZSJ9.JDqoOEv8oFeVJF0sHLZ7Hw"; // Reemplaza con tu token de Mapbox
    new mapboxgl.Map({
      container: "mapu",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat], // Coordenadas del centro del mapa
      zoom: 1, // Nivel de zoom inicial
    });
  }, [lng, lat]);
  return (
    <div className="content-mapu">
      <div id="mapu"></div>
    </div>
  );
};

export default Map;
