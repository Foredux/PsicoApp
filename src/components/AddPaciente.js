// src/components/AddPaciente.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./AddPaciente.css";

function AddPaciente() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [motivoConsulta, setMotivoConsulta] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await addDoc(collection(db, "pacientes"), {
        nombre,
        edad,
        motivoConsulta,
        fechaRegistro: Timestamp.now(),
      });

      navigate("/pacientes"); // 🔁 Redirige a la lista
    } catch (error) {
      console.error("Error al guardar:", error);
      setError("Hubo un error. Intenta de nuevo.");
    }
  };

  return (
    <div className="form-container">
      <h2>Nuevo Paciente</h2>
      {error && <p className="form-error">{error}</p>}
      <form onSubmit={handleSubmit} className="form-horizontal">
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Edad</label>
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
          />
        </div>

        <div className="form-group full">
          <label>Motivo de consulta</label>
          <textarea
            value={motivoConsulta}
            onChange={(e) => setMotivoConsulta(e.target.value)}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-guardar">
            Guardar Paciente
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPaciente;
