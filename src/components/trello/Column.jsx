import React, { useState, useEffect } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

const Column = ({ estado, tasks, setTasks }) => {
    // Filtrar las tareas por el estado actual y ordenarlas según su atributo `orden`.
    const tasksFiltradas = tasks
        .filter((task) => task.estado === estado)
        .sort((a, b) => a.orden - b.orden);

    return (
        <Droppable droppableId={estado}>
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-gray-900 rounded-md shadow-xl p-4 min-h-[300px] ml-3 mr-3"
                >
                    {/* Título de la columna */}
                    <h2 className="text-md lg:text-xl font-semibold text-white mb-3">
                        {estado.charAt(0).toUpperCase() + estado.slice(1)}
                    </h2>
                    {/* Lista de tareas */}
                    <div className="space-y-2">
                        {tasksFiltradas.map((task, index) => (
                            <TaskCard key={task.id} task={task} index={index} />
                        ))}
                    </div>
                    {/* Espacio reservado para el área de soltado */}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default Column;
