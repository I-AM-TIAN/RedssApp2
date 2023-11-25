import React from "react";
import PropTypes from "prop-types";

const Map = () => {
  return <></>;
};

Map.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  mapboxApiAccessToken: PropTypes.string.isRequired, // Asegúrate de que se requiera el token
};

export default Map;
