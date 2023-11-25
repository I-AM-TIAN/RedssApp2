import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "../styles/map.css";

const MapboxComponent = ({ latitude, longitude, locationName }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoidGlhbjI4MTIiLCJhIjoiY2xubmphcXVzMDU2MzJrcDFvNnA0M3ltZSJ9.JDqoOEv8oFeVJF0sHLZ7Hw";
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [longitude, latitude],
      zoom: 15,
    });

    const marker = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(map);

    map.on("load", () => {
      map.addLayer({
        id: "location-name",
        type: "symbol",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
            properties: {
              title: locationName,
            },
          },
        },
        layout: {
          "text-field": ["get", "title"],
          "text-font": ["Open Sans Regular"],
          "text-size": 12,
          "text-anchor": "top",
        },
        paint: {
          "text-color": "#000000",
        },
      });
    });

    map.scrollZoom.disable();
  }, [latitude, longitude, locationName]);

  return (
    <div className="contentmap1">
      <div
        className="map1"
        ref={mapContainer}
        style={{ width: "100%", height: "400px" }}
      ></div>
    </div>
  );
};

export default MapboxComponent;
