import React from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Column from './Column';
import { useTaskContext } from '../../context/TasksContext';

const estadosFijos = ["pendiente", "proceso", "terminada"]; // Estados predefinidos

const TaskBoard = () => {
  const { tasks, setTasks } = useTaskContext();

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Si no hay cambio de posición
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    setTasks((prevTasks) => {
      // Crear copias separadas de las tareas por estado
      const tasksByState = estadosFijos.reduce((acc, estado) => {
        acc[estado] = prevTasks.filter((task) => task.estado === estado);
        return acc;
      }, {});

      // Obtener la tarea que se está moviendo
      const [movedTask] = tasksByState[source.droppableId].splice(source.index, 1);

      // Actualizar el estado de la tarea si cambió de columna
      if (source.droppableId !== destination.droppableId) {
        movedTask.estado = destination.droppableId;
      }

      // Insertar la tarea en la columna de destino
      tasksByState[destination.droppableId].splice(destination.index, 0, movedTask);

      // Reconstruir la lista de tareas unificando todas las columnas
      return estadosFijos.flatMap((estado) => tasksByState[estado]);
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen flex justify-center items-center">            
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full max-w-5xl">
        {estadosFijos.map((estado) => (
          <Column key={estado} estado={estado} />
        ))}
      </div>
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
