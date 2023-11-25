import React, { useState } from "react";
import "../styles/request.css";
import { NavBar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";
export const Request = () => {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [newRequest, setnewRequest] = useState({
    nombre: "",
    descripcion: "",
    tipo_organizacion: "",
    direccion: "",
    departamento: "",
    ciudad: "",
    telefono: "",
    email: "",
    web: "",
    nombre_contacto: "",
    email_contacto: "",
    estado: "pendiente"
  });

  const handleTipoOrgChange = (event) => {
    const selectedValue = event.target.value;
    setShowInput(selectedValue === ""); // Mostrar el input si el valor es ''
    setnewRequest({
      ...newRequest,
      tipo_organizacion: selectedValue,
    });
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setnewRequest({
      ...newRequest,
      [id]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newRequest.tipo_organizacion === "_") {
      alert("Por favor, selecciona un tipo de organización válido.");
      return; // No se permite continuar
    }

    // Realizar la solicitud POST al servidor para guardar la nueva solicitud
    fetch("http://localhost:3000/solicitudes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRequest),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al guardar la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Solicitud guardada con éxito:", data);
        // Puedes hacer más aquí, como redirigir al usuario a otra página o mostrar un mensaje de éxito.
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    alert('Solicitud guardada con exito');
    navigate("/");
  };

  return (
    <>
      <NavBar />
      <div className="bodySolicitud">
        <div className="formulario">
          <form onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              value={newRequest.nombre}
              onChange={handleInputChange}
            />

            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              value={newRequest.descripcion}
              onChange={handleInputChange}
              cols="30"
              rows="10"
            />

            <label htmlFor="tipo_organizacion">Tipo de organización</label>
            <select id="tipo_organizacion" onChange={handleTipoOrgChange}>
              <option value="_">Selecciona un tipo</option>
              <option value="Cooperativa">Cooperativa</option>
              <option value="Pre-cooperativa">Pre-cooperativa</option>
              <option value="Fondo de empleados">Fondo de empleados</option>
              <option value="Asociación mutual">Asociación mutual</option>
              <option value="Cooperativa de trabajo asociado">
                Cooperativa de trabajo asociado
              </option>
              <option value="Cooperativa multiactiva">
                Cooperativa multiactiva
              </option>
              <option value="">Otro ¿Cuál?</option>
            </select>
            {showInput && (
              <div>
                <input
                  type="text"
                  id="tipo_organizacion"
                  placeholder="Especifica otro tipo"
                  value={newRequest.tipo_organizacion}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            <label htmlFor="direccion">Dirección</label>
            <input
              type="text"
              id="direccion"
              value={newRequest.direccion}
              onChange={handleInputChange}
            />

            <label htmlFor="departamento">Departamento</label>
            <input
              type="text"
              id="departamento"
              value={newRequest.departamento}
              onChange={handleInputChange}
            />

            <label htmlFor="ciudad">Ciudad</label>
            <input
              type="text"
              id="ciudad"
              value={newRequest.ciudad}
              onChange={handleInputChange}
            />

            <label htmlFor="telefono">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              value={newRequest.telefono}
              onChange={handleInputChange}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={newRequest.email}
              onChange={handleInputChange}
            />

            <label htmlFor="web">Sitio Web</label>
            <input
              type="url"
              id="web"
              value={newRequest.web}
              onChange={handleInputChange}
            />

            <label htmlFor="nombre_contacto">Nombre de Contacto</label>
            <input
              type="text"
              id="nombre_contacto"
              value={newRequest.nombre_contacto}
              onChange={handleInputChange}
            />

            <label htmlFor="email_contacto">Email de Contacto</label>
            <input
              type="email"
              id="email_contacto"
              value={newRequest.email_contacto}
              onChange={handleInputChange}
            />

            <button type="submit">Mandar solicitud</button>
          </form>
        </div>
      </div>
    </>
  );
};
