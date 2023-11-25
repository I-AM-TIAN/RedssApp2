import "../styles/NavBar.css";
import { Link } from "react-router-dom";
export const NavBar = () => {
  return (
    <div className="nav">
      <Link to="/">
        <img
          className="logo"
          src="../../public/images/Logo_RedssApp.png"
          alt=""
        />
      </Link>

      <li>
        <ul>
            <Link to="/">
              <img src="../../public/images/icons/home-page.png" alt="" />
            </Link>
        </ul>
        <ul>
            <img
              src="../../public/images/icons/information-button.png"
              alt=""
            />
        </ul>
        <ul>
            <Link to="/Request">
              <img src="../../public/images/icons/form.png" alt="" />
            </Link>
        </ul>
        <ul>
          <Link to='/Admin'>Admin</Link>
        </ul>
      </li>
    </div>
  );
};
