import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
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
        // Traemos todos los pacientes (simple), para filtrar en frontend
        // Para filtro en Firebase, necesitas un campo indexado y exacto (por ejemplo nombre)
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
          setMensaje("No se encontraron pacientes con ese nombre.");
        } else {
          setMensaje("");
        }
        setPacientesEncontrados(resultados);
      } catch (error) {
        console.error("Error al buscar pacientes:", error);
        setMensaje("Error buscando pacientes. Inténtalo de nuevo.");
      }
    };

    // Llamamos a buscar solo si busqueda tiene texto
    if (busqueda.trim().length > 0) {
      buscarPacientes();
    } else {
      setPacientesEncontrados([]);
      setMensaje("");
    }
  }, [busqueda]);

  return (
    <div className="home-container">
      <h2>Buscar Paciente</h2>
      <input
        type="text"
        placeholder="Escribe el nombre del paciente..."
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
              <strong>Motivo de consulta:</strong> {paciente.motivoConsulta}{" "}
              <br />
              <strong>Fecha de registro:</strong>{" "}
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
