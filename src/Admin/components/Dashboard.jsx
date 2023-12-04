import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <>
      <div className="dashcontainer">
        <li>
          <ul>
            <Link to="">Organizaciones</Link>
          </ul>
          <ul>
            <Link to="">Solicitudes</Link>
          </ul>
        </li>
      </div>
    </>
  );
};
