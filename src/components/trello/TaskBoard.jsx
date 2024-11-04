// TaskBoard.jsx
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import { useState } from "react";

// Estado inicial organizado por columnas
const initialColumns = {
  pendiente: [
    { id: "1", nombre: "Tarea 1", descripcion: "Descripción de la tarea 1" },
    { id: "4", nombre: "Tarea 4", descripcion: "Descripción de la tarea 4" },
  ],
  proceso: [
    { id: "2", nombre: "Tarea 2", descripcion: "Descripción de la tarea 2" },
    { id: "5", nombre: "Tarea 5", descripcion: "Descripción de la tarea 5" },
  ],
  terminada: [
    { id: "3", nombre: "Tarea 3", descripcion: "Descripción de la tarea 3" },
    { id: "6", nombre: "Tarea 6", descripcion: "Descripción de la tarea 6" },
  ],
};

function TaskBoard() {
  const [columns, setColumns] = useState(initialColumns);
  console.log(columns);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    console.log("source",source, "destination", destination); 

    // Validar si no hay destino o el destino es el mismo que el origen
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    // Clonar el estado actual de columnas para mantener inmutabilidad
    const sourceColumn = [...columns[source.droppableId]];
    console.log("sourceColumn", sourceColumn);

    const destColumn = source.droppableId === destination.droppableId
      ? sourceColumn
      : [...columns[destination.droppableId]];
    console.log("destColumn", destColumn);

    // Extraer la tarea movida de la columna de origen
    const [movedTask] = sourceColumn.splice(source.index, 1);

    // Insertar la tarea en la nueva posición
    destColumn.splice(destination.index, 0, movedTask);

    // Actualizar el estado de columnas
    setColumns({
      ...columns,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });
  };

  return (

    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen flex justify-center items-center">            
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full max-w-5xl">
          {Object.keys(columns).map((estado) => (
            <Column key={estado} estado={estado} tasks={columns[estado]} />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}

export default TaskBoard;
