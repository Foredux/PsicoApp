import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebaseConfig";

import Navbar from "./components/NavBar";
import Login from "./login/Login";
import Home from "./components/Home";
import ListPacientes from "./components/ListPacientes";
import AddPacientes from "./components/AddPaciente";
import EditarPaciente from "./components/EditarPaciente";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      {/* Mostrar Navbar solo si el usuario está autenticado */}
      {user && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/pacientes"
          element={user ? <ListPacientes /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/crear"
          element={user ? <AddPacientes /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/editar/:id"
          element={user ? <EditarPaciente /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
