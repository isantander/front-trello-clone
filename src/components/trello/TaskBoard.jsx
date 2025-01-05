import React, { useContext, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Column from './Column';
import { AuthContext } from '../../context/AuthContext.jsx';
import { useTaskContext } from '../../context/TaskContext.jsx';
import { useNavigate } from 'react-router-dom';

const estadosFijos = ['pendiente', 'proceso', 'terminada'];

const TaskBoard = () => {
    const { accessToken } = useContext(AuthContext);
    const { tasks, setTasks, fetchTasks, updateTask, loading, error } = useTaskContext();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (accessToken) {
            fetchTasks(accessToken);
        }else{
            navigate("/login"); 
        }
    }, [accessToken]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination, draggableId } = result;

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        const newColumn = destination.droppableId;
        const newPosition = destination.index;

        const updatedTasks = tasks.map((task) => {
            if (task.id === draggableId) {
                return { ...task, estado: newColumn, orden: newPosition };
            }
            if (task.estado === newColumn && task.orden >= newPosition) {
                return { ...task, orden: task.orden + 1 };
            }
            if (task.estado === source.droppableId && task.orden > source.index) {
                return { ...task, orden: task.orden - 1 };
            }
            return task;
        });

        setTasks(updatedTasks.sort((a, b) => a.orden - b.orden));

        updateTask(accessToken, draggableId, { estado: newColumn, orden: newPosition });
    };

    if (loading) {
        return <div className="text-center text-white">Cargando tareas...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full max-w-5xl mt-10">
                    {estadosFijos.map((estado) => (
                        <Column key={estado} estado={estado} tasks={tasks} setTasks={setTasks} />
                    ))}
                </div>
            </div>
        </DragDropContext>
    );
};

export default TaskBoard;
