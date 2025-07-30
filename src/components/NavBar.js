import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "./NavBar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">PsicoApp</div>

        <nav className="navbar__menu">
          <Link to="/" className="navbar__link">
            Inicio
          </Link>
          <Link to="/pacientes" className="navbar__link">
            Pacientes
          </Link>
          <button
            onClick={handleLogout}
            className="navbar__link navbar__logout"
          >
            Cerrar sesión
          </button>
        </nav>
      </div>
    </header>
  );
}
