import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import "./EditarPaciente.css";

function EditarPaciente() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [motivoConsulta, setMotivoConsulta] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const docRef = doc(db, "pacientes", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombre(data.nombre || "");
          setEdad(data.edad || "");
          setMotivoConsulta(data.motivoConsulta || "");
        } else {
          setMensaje("Paciente no encontrado.");
        }
      } catch (error) {
        console.error("Error al cargar paciente:", error);
        setMensaje("Error al cargar paciente.");
      }
    };
    fetchPaciente();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !edad || !motivoConsulta) {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    try {
      const docRef = doc(db, "pacientes", id);
      await updateDoc(docRef, {
        nombre,
        edad,
        motivoConsulta,
      });
      setMensaje("Paciente actualizado correctamente.");
      setTimeout(() => {
        navigate("/pacientes");
      }, 1500);
    } catch (error) {
      console.error("Error al actualizar paciente:", error);
      setMensaje("Error al actualizar paciente. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="editar-container">
      <h2>Editar Paciente</h2>
      {mensaje && <p className="mensaje">{mensaje}</p>}

      <form onSubmit={handleSubmit} className="form-editar">
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>

        <label>
          Edad:
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
          />
        </label>

        <label>
          Motivo de consulta:
          <textarea
            value={motivoConsulta}
            onChange={(e) => setMotivoConsulta(e.target.value)}
            required
          />
        </label>

        <button type="submit">Guardar Cambios</button>
        <button
          type="button"
          onClick={() => navigate("/pacientes")}
          className="btn-cancelar"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default EditarPaciente;
