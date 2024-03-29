import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./screens/Home";
import { Info } from "./screens/Info";
import { Request } from "./screens/Request";
import { Link } from "react-router-dom";
import { Admin } from "./Admin/screens/Admin";
import { Login } from "./screens/Login";

function App() {
  return (
    <>
      <Router>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/info">Info</Link>
            </li>
            <li>
              <Link to="/Solicitud">Solicitud</Link>
            </li>
          </ul>
        </nav> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/Request" element={<Request />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
