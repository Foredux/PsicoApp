import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";

function Calendario() {
  const [citas, setCitas] = useState([]);

  // Cargar citas desde Firebase
  useEffect(() => {
    const cargarCitas = async () => {
      try {
        const snapshot = await getDocs(collection(db, "citas"));
        const datos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCitas(datos);
      } catch (error) {
        console.error("Error al obtener citas:", error);
      }
    };

    cargarCitas();
  }, []);

  // Crear nueva cita al hacer clic en una fecha
  const handleDateClick = async (info) => {
    const nombre = prompt("Nombre del paciente:");
    if (!nombre) return;

    const nuevaCita = {
      title: nombre,
      date: info.dateStr,
    };

    try {
      const docRef = await addDoc(collection(db, "citas"), nuevaCita);
      setCitas([...citas, { ...nuevaCita, id: docRef.id }]);
    } catch (error) {
      console.error("Error al agregar cita:", error);
    }
  };

  // Eliminar cita
  const handleEventClick = async (info) => {
    const confirmar = window.confirm(
      `¿Eliminar la cita con ${info.event.title}?`
    );
    if (!confirmar) return;

    try {
      await deleteDoc(doc(db, "citas", info.event.id));
      setCitas(citas.filter((cita) => cita.id !== info.event.id));
    } catch (error) {
      console.error("Error al eliminar cita:", error);
    }
  };

  return (
    <div className="calendario-container">
      <h2>Calendario de Citas</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={citas}
        height="auto"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />
    </div>
  );
}

export default Calendario;
