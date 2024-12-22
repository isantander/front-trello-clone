import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import { useState, useEffect } from 'react';

const Column = ({ estado }) => {

  const [tasks, setTasks] = useState([]); 

  const fetchTasks = async () => {
    try {
      // Por ahora la ip hardcodeada, luego va parametrizada
      const response = await fetch('http://127.0.0.1:3000/tareas');
      const data = await response.json();
      setTasks(data.data); 
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []); 


  const tasksFiltradas = tasks.filter((task) => task.estado === estado);

  console.log("tareaas" , tasks);
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
