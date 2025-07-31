import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "./NavBar.css";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <header className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <button
            className="navbar__toggle"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            ☰
          </button>
          <span>🚀 App Clientes</span>
        </div>

        <nav className={`navbar__menu ${menuAbierto ? "activo" : ""}`}>
          <Link to="/" className="navbar__link" onClick={cerrarMenu}>
            Inicio
          </Link>
          <Link to="/pacientes" className="navbar__link" onClick={cerrarMenu}>
            Clientes
          </Link>
          <Link to="/calendario" className="navbar__link" onClick={cerrarMenu}>
            Calendario
          </Link>
          <button
            onClick={() => {
              handleLogout();
              cerrarMenu();
            }}
            className="navbar__link navbar__logout"
          >
            Cerrar sesión
          </button>
        </nav>
      </div>
    </header>
  );
}
