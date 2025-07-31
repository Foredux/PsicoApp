import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./ListPacientes.css";

function ListaPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPacientes = async () => {
      const querySnapshot = await getDocs(collection(db, "pacientes"));
      const pacientesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPacientes(pacientesData);
    };

    fetchPacientes();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "¿Estás seguro de que deseas borrar este cliente?"
    );
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "pacientes", id));
      setPacientes(pacientes.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error al borrar el cliente:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editar/${id}`);
  };

  return (
    <div className="lista-container">
      <div className="lista-header">
        <h2>Clientes Registrados</h2>
        <button onClick={() => navigate("/crear")} className="btn-crear">
          Crear Cliente
        </button>
      </div>

      <div className="tabla-pacientes">
        {pacientes.length === 0 ? (
          <p>No hay clientes registrados.</p>
        ) : (
          <ul className="lista-pacientes">
            {pacientes.map((paciente) => (
              <li key={paciente.id} className="item-paciente">
                <div className="datos-paciente">
                  <h3>{paciente.nombre}</h3>
                  <p>
                    <strong>Edad:</strong> {paciente.edad}
                  </p>
                  <p>
                    <strong>Motivo:</strong> {paciente.motivoConsulta}
                  </p>
                  <p>
                    <strong>Fecha:</strong>{" "}
                    {paciente.fechaRegistro?.toDate
                      ? paciente.fechaRegistro.toDate().toLocaleDateString()
                      : "Sin fecha"}
                  </p>
                </div>
                <div className="acciones-paciente">
                  <button
                    className="btn-editar"
                    onClick={() => handleEdit(paciente.id)}
                  >
                    Editar cliente
                  </button>
                  <button
                    className="btn-borrar"
                    onClick={() => handleDelete(paciente.id)}
                  >
                    Borrar cliente
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ListaPacientes;
