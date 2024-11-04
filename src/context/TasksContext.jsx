import { createContext, useContext, useState } from "react";

// Tareas iniciales
const initialTask = {
    pendiente: [
        { id: "1", nombre: "Tarea 1", descripcion: "Descripción de la tarea 1" },
        { id: "4", nombre: "Tarea 4", descripcion: "Descripción de la tarea 4" },
    ],
    proceso: [
        { id: "2", nombre: "Tarea 2", descripcion: "Descripción de la tarea 2" },
        { id: "5", nombre: "Tarea 5", descripcion: "Descripción de la tarea 5" },
    ],
    terminada: [
        { id: "3", nombre: "Tarea 3", descripcion: "Descripción de la tarea 3" },
        { id: "6", nombre: "Tarea 6", descripcion: "Descripción de la tarea 6" },
    ],
};
const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState(initialTask);

    return (
        <TasksContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = () => useContext(TasksContext);
