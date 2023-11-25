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
          <a href="">
            <Link to="/">
              <img src="../../public/images/icons/home-page.png" alt="" />
            </Link>
          </a>
        </ul>
        <ul>
          <a href="">
            <img
              src="../../public/images/icons/information-button.png"
              alt=""
            />
          </a>
        </ul>
        <ul>
          <a href="">
            <Link to="/Request">
              <img src="../../public/images/icons/form.png" alt="" />
            </Link>
          </a>
        </ul>
      </li>
    </div>
  );
};
