import React, { useState, useEffect } from 'react';
import '../styles/admin.css'; 
import { NavBar } from '../components/NavBar';

export const Admin = () => {
    const [estadoSolicitud, setEstadoSolicitud] = useState('pendiente');
    const [solicitudesMostradas, setSolicitudesMostradas] = useState([]);

    useEffect(() => {
        // Obtener solicitudes al cargar la pantalla
        fetch(`http://localhost:3000/solicitudes/${estadoSolicitud}`)
            .then(response => response.json())
            .then(data => {
                setSolicitudesMostradas(data);
            })
            .catch(error => {
                console.error('Error al obtener solicitudes:', error);
                setSolicitudesMostradas([]); // Establecer solicitudesMostradas como un array vacío en caso de error
            });
    }, [estadoSolicitud]);

    const actualizarEstado = (idSolicitud, nuevoEstado) => {
        // Lógica para actualizar el estado de una solicitud
        fetch(`http://localhost:3000/solicitudes/${idSolicitud}/estado`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nuevoEstado }),
        })
            .then(response => {
                if (response.ok) {
                    return fetch(`http://localhost:3000/solicitudes/${estadoSolicitud}`);
                }
                throw new Error('Error al actualizar el estado de la solicitud');
            })
            .then(response => response.json())
            .then(data => {
                setSolicitudesMostradas(data);
            })
            .catch(error => {
                console.error('Error al actualizar el estado de la solicitud:', error);
            });
    };

    return (
        <>
        <NavBar/>
          
            <div className="filter-section">
            <h2>Solicitudes</h2>
                <label htmlFor="estado">Seleccionar Estado:</label>
                <select
                    id="estado"
                    value={estadoSolicitud}
                    onChange={e => setEstadoSolicitud(e.target.value)}
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
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {solicitudesMostradas.map(solicitud => (
                        <tr key={solicitud.id_solicitud}>
                            <td>{solicitud.id_solicitud}</td>
                            <td>{solicitud.nombre}</td>
                            <td>{solicitud.tipo_organizacion}</td>
                            <td>{solicitud.telefono}</td>
                            <td>{solicitud.email}</td>
                            <td>{solicitud.estado}</td>
                            <td>
                                {solicitud.estado === 'aprobado' ? (
                                    <button className="rechazar-btn" onClick={() => actualizarEstado(solicitud.id_solicitud, 'rechazado')}>
                                        Rechazar
                                    </button>
                                ) : solicitud.estado === 'rechazado' ? (
                                    <button className="aprobar-btn" onClick={() => actualizarEstado(solicitud.id_solicitud, 'aprobado')}>
                                        Aprobar
                                    </button>
                                )
                                    : (
                                        <>
                                            <button className="aprobar-btn" onClick={() => actualizarEstado(solicitud.id_solicitud, 'aprobado')}>
                                                Aprobar
                                            </button>
                                            <button className="rechazar-btn" onClick={() => actualizarEstado(solicitud.id_solicitud, 'rechazado')}>
                                                Rechazar
                                            </button>
                                        </>
                                    )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
