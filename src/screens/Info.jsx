import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import Map from "../components/Map";
export const Info = () => {
  const location = useLocation();
  const { uid } = location.state;
  const [empresa, setEmpresa] = useState(null);

  useEffect(() => {
    // Realizar una solicitud GET al endpoint del servidor para obtener la información de la empresa por su ID
    fetch(`http://localhost:3000/empresas/${uid}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Empresa no encontrada");
        }
        return response.json();
      })
      .then((data) => {
        setEmpresa(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [uid]);
  return (
    <>
      <NavBar />
      <div className="info-container">
        {empresa ? (
          <div>
            <div>
              <h2>{empresa.nombre}</h2>
              <p>Dirección: {empresa.direccion}</p>
              {/* Otras propiedades de la empresa */}
            </div>
          </div>
        ) : (
          <p>Cargando la información de la empresa...</p>
        )}
      </div>
    </>
  );
};
