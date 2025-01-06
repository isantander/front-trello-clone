import { FaTasks } from "react-icons/fa";
import { Draggable } from '@hello-pangea/dnd';
import { useTaskContext } from "../../context/TaskContext";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";

const TaskCard = ({ task, index }) => {
  const { deleteTask, fetchTasks } = useTaskContext();
  const { accessToken } = useContext(AuthContext);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="p-4 bg-gray-800 rounded-md flex items-center space-x-3 mb-3"
        >
          <div className="w-full">
            <h3 className="text-sm lg:text-md font-bold text-white">{task.nombre}</h3>
            <p className="pl-2 text-sm text-gray-100 mb-4">{task.descripcion}</p>
            <h3 className="text-sm lg:text-md font-bold text-white text-right">
              <a href={`/view-task/${task.id}`} className="text-yellow-500 hover:text-orange-600">Ver Tarea</a>
            </h3>
          </div>          
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
