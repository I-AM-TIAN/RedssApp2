import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { Info } from "../screens/Info";
import { Link, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "../styles/mapcomponent.css";

const MapboxComponent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoidGlhbjI4MTIiLCJhIjoiY2xubmphcXVzMDU2MzJrcDFvNnA0M3ltZSJ9.JDqoOEv8oFeVJF0sHLZ7Hw"; // Reemplaza con tu token de Mapbox
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [0, 0], // Coordenadas del centro del mapa
      zoom: 1, // Nivel de zoom inicial
    });

    // Hacer una solicitud a la API para obtener los datos de las empresas
    // Hacer una solicitud a la API para obtener los datos de las empresas
    fetch("http://localhost:3000/empresas")
      .then((response) => response.json())
      .then((data) => {
        // Crear un nuevo origen de datos GeoJSON con los datos de las empresas
        var geojson = {
          type: "FeatureCollection",
          features: data.map((empresa) => {
            return {
              type: "Feature",
              properties: {
                title: empresa.nombre,
                direction: empresa.direccion,
                uid: empresa.id_organizacion,
                icon: "marker",
              },
              geometry: {
                type: "Point",
                coordinates: [empresa.longitud, empresa.latitud],
              },
            };
          }),
        };

        // Agregar el origen de datos al mapa como fuente
        map.addSource("empresas", {
          type: "geojson",
          data: geojson,
          cluster: true, // Habilitar el agrupamiento de marcadores
          clusterMaxZoom: 14, // Zoom máximo en el que se mostrarán los clusters
          clusterRadius: 50, // Radio del área en píxeles en el que se agruparán los marcadores
        });

        // Establecer el estilo de los clusters
        // Establecer el estilo de los clusters
        map.addLayer({
          id: "clusters",
          type: "circle",
          source: "empresas",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": "#51bbd6", // Color del cluster
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20, // Radio del cluster en píxeles
              100,
              30,
              750,
              40,
            ],
          },
        });

        // Establecer el estilo de los marcadores individuales fuera de los clusters
        map.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "empresas",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#11b4da", // Color del marcador individual
            "circle-radius": 6, // Radio del marcador individual en píxeles
            "circle-stroke-width": 1, // Ancho del borde del marcador individual en píxeles
            "circle-stroke-color": "#fff", // Color del borde del marcador individual
          },
        });

        // Establecer el estilo del texto en los clusters para mostrar el número de marcadores
        map.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "empresas",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}", // Mostrar el número de marcadores en el cluster
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
        });

        // Añadir popups a los marcadores individuales
        map.on("click", "unclustered-point", function (e) {
          var uid = e.features[0].properties.uid;
          var coordinates = e.features[0].geometry.coordinates.slice();
          var empresaNombre = e.features[0].properties.title;
          var empresaDireccion = e.features[0].properties.direction;
          // Crear el popup
          const popup = new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
              "<h3>" + empresaNombre + "</h3>" +
              "<span><strong>" + empresaDireccion + "</strong></span> <br>" +
              '<button id="verMasButton">Ver más</button>'
            )
            .addTo(map);

          // Agregar un evento de clic al botón "Ver más" dentro del popup
          const verMasButton = document.getElementById("verMasButton");
          verMasButton.addEventListener("click", function () {
            // Redirigir al usuario a la página de detalles usando React Router
            navigate('/info', { state: { uid } });
          });
      }, [navigate]);

    // Cambiar el cursor al pasar sobre un cluster o marcador individual
    map.on("mouseenter", "clusters", function () {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "clusters", function () {
      map.getCanvas().style.cursor = "";
    });
    map.on("mouseenter", "unclustered-point", function () {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "unclustered-point", function () {
      map.getCanvas().style.cursor = "";
    });
  });
  // Añadir un evento de clic al layer de clusters
  map.on("click", "clusters", function (e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ["clusters"],
    });

    var clusterId = features[0].properties.cluster_id;

    // Obtener las coordenadas del cluster
    map
      .getSource("empresas")
      .getClusterExpansionZoom(clusterId, function (err, zoom) {
        if (err) return;

        // Hacer zoom al cluster
        map.flyTo({
          center: features[0].geometry.coordinates,
          zoom: zoom + 1, // Ajusta el nivel de zoom según tu preferencia
        });
      });
  });
}, []);


  return (
    <div className="contentmap">
      <div id="map"></div>
    </div>
  );
};

export default MapboxComponent;
