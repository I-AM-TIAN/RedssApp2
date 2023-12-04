import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import MapboxComponent from "../components/Map";
import "../styles/info.css";

// import { Map } from "../components/Map";
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
          <div className="info">
            <div className="sec1">
              <div className="addr">
                <h1>{empresa.nombre}</h1>
                <p>{empresa.pais}</p>
                <p>
                  {empresa.ciudad},{empresa.departamento}.
                </p>
                <p>{empresa.direccion}</p>
              </div>
              <MapboxComponent
                latitude={empresa.latitud}
                longitude={empresa.longitud}
                locationName={empresa.nombre}
              />
            </div>
            <div className="sec2">
              <div className="desc">
                {/* <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Magnam distinctio error aliquam voluptates ullam numquam ab
                  minus enim perspiciatis a perferendis aliquid ducimus nihil
                  ipsa doloribus labore voluptas doloremque, tempore fugiat
                  architecto molestiae pariatur sint! Odio voluptate natus in ut
                  vero qui, voluptatibus modi nesciunt repellendus labore fugiat
                  reiciendis commodi alias adipisci optio pariatur nemo placeat
                  perspiciatis laborum ipsam impedit? Consequuntur eum beatae
                  ratione neque dolores ipsam tempora, aspernatur repudiandae,
                  mollitia expedita illum culpa iusto, ut odit atque velit.
                  Officia dolorum aspernatur quo unde modi rerum excepturi
                  molestiae beatae veritatis. Sint nesciunt id illum, velit
                  dolores optio asperiores ipsam porro! Atque, ut beatae omnis
                  cupiditate pariatur, aspernatur quaerat magnam animi error
                  nulla voluptate deleniti nesciunt cumque tempore, corrupti
                  rerum! Cupiditate consequuntur, eum sunt doloribus expedita
                  numquam ipsum nam autem fugit doloremque saepe eligendi
                  perferendis recusandae deleniti placeat quidem maxime debitis
                  assumenda dignissimos nesciunt facere omnis explicabo quod
                  nisi. Cum, perspiciatis.
                </p> */}
                <p>{empresa.descripcion}</p>
              </div>
              <div className="links">
                <div className="icon">
                  <a href={empresa.web}>
                    <img src="../../public/images/icons/www.png" alt="" />
                  </a>
                  <div className="infshow">{empresa.web}</div>
                </div>
                <div className="icon">
                  <a>
                    <img src="../../public/images/icons/telephone.png" alt="" />
                  </a>
                  <div className="infshow">
                    <p>{empresa.telefono}</p>
                  </div>
                </div>
                <div className="icon">
                  <a href={empresa.email}>
                    <img src="../../public/images/icons/email.png" alt="" />
                  </a>
                  <div className="infshow">{empresa.email}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Cargando la información de la empresa...</p>
        )}
      </div>
    </>
  );
};
