// Column.jsx
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

function Column({ estado, tasks }) {
  const titleMap = {
    pendiente: "Pendiente",
    proceso: "En Proceso",
    terminada: "Terminada",
  };

  return (
    <Droppable droppableId={estado}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="bg-gray-900 rounded-md shadow-xl p-4 min-h-[300px] ml-3 mr-3"
        >
          <h2 className="text-md lg:text-xl font-semibold text-white mb-3">{titleMap[estado]}</h2>
          <div className="space-y-2">
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default Column;
