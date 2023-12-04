import { useState, useEffect } from "react";
import "../styles/request.css";
import { useLocation, useNavigate } from "react-router-dom";

export const Request = () => {
  const navigate = useNavigate();
  const user = "deep";
  const pass = "123";
  const location = useLocation();
  const { username, password } = location.state || {};

  if (user !== username || pass !== password) {
    navigate("/Login");
  }

  const [estadoSolicitud, setEstadoSolicitud] = useState("pendiente");
  const [solicitudesMostradas, setSolicitudesMostradas] = useState([]);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [showCoordsInput, setShowCoordsInput] = useState(false);
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Obtener solicitudes al cargar la pantalla
    fetch(`http://localhost:3000/solicitudes/${estadoSolicitud}`)
      .then((response) => response.json())
      .then((data) => {
        setSolicitudesMostradas(data);
      })
      .catch((error) => {
        console.error("Error al obtener solicitudes:", error);
        setSolicitudesMostradas([]);
      });
  }, [estadoSolicitud]);

  const actualizarEstado = (idSolicitud, nuevoEstado) => {
    // Lógica para actualizar el estado de una solicitud
    fetch(`http://localhost:3000/solicitudes/${idSolicitud}/estado`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nuevoEstado }),
    })
      .then((response) => {
        if (response.ok) {
          return fetch(`http://localhost:3000/solicitudes/${estadoSolicitud}`);
        }
        throw new Error("Error al actualizar el estado de la solicitud");
      })
      .then((response) => response.json())
      .then((data) => {
        setSolicitudesMostradas(data);
      })
      .catch((error) => {
        console.error("Error al actualizar el estado de la solicitud:", error);
      });
  };

  const openModal = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setIsModalOpen(true);
  };

  const handleAprobar = (idSolicitud) => {
    setShowCoordsInput(true);
    setSelectedSolicitud(
      solicitudesMostradas.find(
        (solicitud) => solicitud.id_solicitud === idSolicitud
      )
    );
  };

  const handleGuardar = () => {
    const nuevaOrganizacion = {
      ...selectedSolicitud,
      latitud: parseFloat(latitud),
      longitud: parseFloat(longitud),
    };
    var idSol = nuevaOrganizacion.id_solicitud;
    delete nuevaOrganizacion.estado;
    delete nuevaOrganizacion.id_solicitud;

    fetch("http://localhost:3000/organizacion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaOrganizacion),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Organización guardada con éxito. ID:", data.id);
        alert("Guardado todo con exito");
        actualizarEstado(idSol, "aprobado");
      })
      .catch((error) => {
        console.error("Error al guardar la organización:", error);
      });

    setShowCoordsInput(false);
    closeModal();
  };

  const closeModal = () => {
    setSelectedSolicitud(null);
    setShowCoordsInput(false);
    setIsModalOpen(false);
  };

  const handleRechazar = (idSolicitud) => {
    actualizarEstado(idSolicitud, "rechazado");
    closeModal();
  };

  return (
    <>
      <div className="filter-section">
        <h2>Solicitudes</h2>
        <label htmlFor="estado">Seleccionar Estado:</label>
        <select
          id="estado"
          value={estadoSolicitud}
          onChange={(e) => setEstadoSolicitud(e.target.value)}
        >
          <option value="pendiente">Pendiente</option>
          <option value="aprobado">Aprobado</option>
          <option value="rechazado">Rechazado</option>
        </select>
      </div>
      <table className="solicitudes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo Organización</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudesMostradas.map((solicitud) => (
            <tr key={solicitud.id_solicitud}>
              <td>{solicitud.id_solicitud}</td>
              <td>{solicitud.nombre}</td>
              <td>{solicitud.tipo_organizacion}</td>
              <td>{solicitud.telefono}</td>
              <td>{solicitud.email}</td>
              <td>
                <button
                  className="ver-mas-btn"
                  onClick={() => openModal(solicitud)}
                >
                  Ver más
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedSolicitud && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="organization-title">Detalles de la Organizacion</h2>
            <p className="detail-info">ID: {selectedSolicitud.id_solicitud}</p>
            <p className="detail-info">Estado: {selectedSolicitud.estado}</p>
            <p className="detail-info">Nombre: {selectedSolicitud.nombre}</p>
            <p className="detail-info">
              Descripción: {selectedSolicitud.descripcion}
            </p>
            <p className="detail-info">
              Tipo de Organización: {selectedSolicitud.tipo_organizacion}
            </p>
            <p className="detail-info">
              Dirección: {selectedSolicitud.direccion}
            </p>
            <p className="detail-info">País: {selectedSolicitud.pais}</p>
            <p className="detail-info">
              Departamento: {selectedSolicitud.departamento}
            </p>
            <p className="detail-info">Ciudad: {selectedSolicitud.ciudad}</p>
            <p className="detail-info">
              Teléfono: {selectedSolicitud.telefono}
            </p>
            <p className="detail-info">Email: {selectedSolicitud.email}</p>
            <p className="detail-info">Web: {selectedSolicitud.web}</p>
            <p className="detail-info">
              Nombre de Contacto: {selectedSolicitud.nombre_contacto}
            </p>
            <p className="detail-info">
              Email de Contacto: {selectedSolicitud.email_contacto}
            </p>
            {showCoordsInput && (
              <div className="coords-input">
                <input
                  type="text"
                  placeholder="Latitud"
                  className="coord-input"
                  value={latitud}
                  onChange={(e) => setLatitud(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Longitud"
                  className="coord-input"
                  value={longitud}
                  onChange={(e) => setLongitud(e.target.value)}
                />
              </div>
            )}
            {selectedSolicitud.estado === "rechazado" ? (
              <div className="actions-buttons">
                {!showCoordsInput ? (
                  <button
                    className="aprobar-button"
                    onClick={() =>
                      handleAprobar(selectedSolicitud.id_solicitud)
                    }
                  >
                    Aprobar
                  </button>
                ) : (
                  <button className="aprobar-button" onClick={handleGuardar}>
                    Guardar
                  </button>
                )}
              </div>
            ) : selectedSolicitud.estado === "pendiente" ? (
              <div className="actions-buttons">
                {!showCoordsInput ? (
                  <>
                    <button
                      className="aprobar-button"
                      onClick={() =>
                        handleAprobar(selectedSolicitud.id_solicitud)
                      }
                    >
                      Aprobar
                    </button>
                    <button
                      className="rechazar-button"
                      onClick={() =>
                        handleRechazar(selectedSolicitud.id_solicitud)
                      }
                    >
                      Rechazar
                    </button>
                  </>
                ) : (
                  <button className="aprobar-button" onClick={handleGuardar}>
                    Guardar
                  </button>
                )}
              </div>
            ) : null}
            <button className="close-button" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
