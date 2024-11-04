// TaskCard.jsx
import { Draggable } from "@hello-pangea/dnd";
import { FaTasks } from "react-icons/fa";

function TaskCard({ task, index }) {
  console.log("taskId", task.id, "index", index);
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="p-4 bg-gray-800 rounded-lg flex items-center space-x-3 "
        >
          
          <div className="w-full">
            <h3 className="text-sm lg:text-md font-bold text-white">{task.nombre}</h3>
            <p className="pl-2 text-sm text-gray-100 mb-4">{task.descripcion}</p>
            <h3 className="text-sm lg:text-md font-bold text-white text-right">
              <a href="/" className="text-yellow-500 hover:text-orange-600">Ver Tarea</a>
            </h3>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
