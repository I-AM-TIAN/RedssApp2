import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./screens/Home";
import { Info } from "./screens/Info";
import { Request } from "./screens/Request";
import { Link } from "react-router-dom";
import { Admin } from "./screens/Admin";

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
          <Route path="/Solicitud" element={<Request />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
