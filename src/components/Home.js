import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./Home.css";

function Home() {
  const [busqueda, setBusqueda] = useState("");
  const [pacientesEncontrados, setPacientesEncontrados] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const buscarPacientes = async () => {
      if (busqueda.trim().length === 0) {
        setPacientesEncontrados([]);
        setMensaje("");
        return;
      }

      try {
        const q = query(
          collection(db, "pacientes"),
          where("nombre", ">=", busqueda),
          where("nombre", "<=", busqueda + "\uf8ff")
        );

        const querySnapshot = await getDocs(q);
        const resultados = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (resultados.length === 0) {
          setMensaje("No se encontraron cliente con ese nombre.");
        } else {
          setMensaje("");
        }

        setPacientesEncontrados(resultados);
      } catch (error) {
        console.error("Error al buscar cliente:", error);
        setMensaje("Error buscando cliente. Inténtalo de nuevo.");
      }
    };

    if (busqueda.trim().length > 0) {
      buscarPacientes();
    } else {
      setPacientesEncontrados([]);
      setMensaje("");
    }
  }, [busqueda]);

  return (
    <div className="home-container">
      <h2>Buscar Cliente</h2>
      <input
        type="text"
        placeholder="Escribe el nombre del cliente..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="input-busqueda"
      />

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <ul className="lista-pacientes">
        {pacientesEncontrados.map((paciente) => (
          <li key={paciente.id} className="paciente-item">
            <div>
              <strong>Nombre:</strong> {paciente.nombre} <br />
              <strong>Edad:</strong> {paciente.edad} <br />
              <strong>Motivo:</strong> {paciente.motivoConsulta} <br />
              <strong>Fecha:</strong>{" "}
              {paciente.fechaRegistro
                ? new Date(
                    paciente.fechaRegistro.seconds * 1000
                  ).toLocaleDateString()
                : "Sin fecha"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
