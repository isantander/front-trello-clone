// TaskBoard.jsx
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import { useState } from "react";
import { useTasks } from "../../context/TasksContext";

function TaskBoard() {
  //const [columns, setColumns] = useState(initialColumns);
  const { tasks, setTasks } = useTasks();
  console.log(tasks);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    console.log("source",source, "destination", destination); 

    // Validar si no hay destino o el destino es el mismo que el origen
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    // Clonar el estado actual de columnas para mantener inmutabilidad
    const sourceColumn = [...tasks[source.droppableId]];
    console.log("sourceColumn", sourceColumn);

    const destColumn = source.droppableId === destination.droppableId
      ? sourceColumn
      : [...tasks[destination.droppableId]];
    console.log("destColumn", destColumn);

    // Extraer la tarea movida de la columna de origen
    const [movedTask] = sourceColumn.splice(source.index, 1);

    // Insertar la tarea en la nueva posición
    destColumn.splice(destination.index, 0, movedTask);

    // Actualizar el estado de columnas
    setTasks({
      ...tasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });
  };

  return (

    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen flex justify-center items-center">            
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full max-w-5xl">
          {Object.keys(tasks).map((estado) => (
            <Column key={estado} estado={estado} tasks={tasks[estado]} />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}

export default TaskBoard;
