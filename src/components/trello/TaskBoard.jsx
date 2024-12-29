import React, { useEffect, useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Column from './Column';

const estadosFijos = ["pendiente", "proceso", "terminada"]; // Estados predefinidos.

const TaskBoard = () => {
    const [tasks, setTasks] = useState([]); // Estado global de las tareas.
    const [loading, setLoading] = useState(true); // Para mostrar un indicador de carga.
    const [error, setError] = useState(null); // Manejo de errores.

    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://127.0.0.1:3000/tareas');
            if (!response.ok) {
                throw new Error('Error al cargar las tareas.');
            }
            const data = await response.json();
            setTasks(data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Manejar el evento de arrastrar y soltar.
    const handleDragEnd = async (result) => {
        if (!result.destination) return; // Si no hay destino, salir.

        const { source, destination, draggableId } = result;

        const nuevaColumna = destination.droppableId; // Nueva columna destino.
        const nuevaPosicion = destination.index; // Índice en la nueva columna.

        // Si no hay cambios, no hacemos nada.
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        // Obtener la tarea movida.
        const tareaMovida = tasks.find((task) => task.id === draggableId);

        // Actualizar tareas localmente para feedback inmediato.
        const nuevasTareas = tasks.map((task) => {
            if (task.id === draggableId) {
                return { ...task, estado: nuevaColumna, orden: nuevaPosicion };
            }
            if (task.estado === nuevaColumna && task.orden >= nuevaPosicion) {
                return { ...task, orden: task.orden + 1 };
            }
            if (task.estado === source.droppableId && task.orden > source.index) {
                return { ...task, orden: task.orden - 1 };
            }
            return task;
        });

        const tareasOrdenadas = nuevasTareas.sort((a, b) => a.orden - b.orden);
        setTasks(tareasOrdenadas);

        // Enviar cambios al backend.
        try {
            console.log(`Moviendo tarea ${draggableId} a ${nuevaColumna} en la posición ${nuevaPosicion}`);
            const response = await fetch(`http://127.0.0.1:3000/tareas/${draggableId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    estado: nuevaColumna,
                    orden: nuevaPosicion,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar la tarea en el backend.');
            }
        } catch (error) {
            console.error('Error al mover la tarea:', error);
        }
    };

    // Renderizar mientras se cargan las tareas o si hay un error.
    if (loading) {
        return <div className="text-center text-white">Cargando tareas...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    // Renderizar el tablero de tareas.
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="min-h-screen flex justify-center items-center">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full max-w-5xl">
                    {estadosFijos.map((estado) => (
                        <Column
                            key={estado}
                            estado={estado}
                            tasks={tasks}
                            setTasks={setTasks}
                        />
                    ))}
                </div>
            </div>
        </DragDropContext>
    );
};

export default TaskBoard;
