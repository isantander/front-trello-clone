import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import { useTaskContext } from '../../context/TasksContext';

const Column = ({ estado }) => {
  const { tasks } = useTaskContext();
  const tasksFiltradas = tasks.filter((task) => task.estado === estado);

  console.log(tasks);
  return (
    <Droppable droppableId={estado}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="bg-gray-900 rounded-md shadow-xl p-4 min-h-[300px] ml-3 mr-3"
        >
          <h2 className="text-md lg:text-xl font-semibold text-white mb-3">{estado.charAt(0).toUpperCase() + estado.slice(1)}</h2>
            <div className="space-y-2"></div>
              {tasksFiltradas.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))}
            {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
