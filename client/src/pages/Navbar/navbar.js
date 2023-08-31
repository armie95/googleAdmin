import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./navbar.scss";
import logo from "../../images/logo192.png";

function Navbar() {
  const navigates = useNavigate();
  //const [button, setButton] = useState(true);
  const handleLogout = () => {
    localStorage.removeItem("token");
  };
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo-container">
        <img  src={logo} alt="Logo" className="navbar__logo" />
      </Link>
      <Link to="/Login" className="navbar__log-container"></Link>
      <div className="navbar__login-main" onClick={() => navigates("/login")}>
        {localStorage.getItem("token")?<button onClick={handleLogout} className="login__button">Log out</button>:<button className="login__button">Log in</button>}
      </div>
    </nav>
  );
}

export default Navbar;
