import { prepareStackTrace } from "postcss/lib/css-syntax-error";
import { createContext, useContext, useState } from "react";

// Tareas iniciales

const initialTask = [
    { id: "0", nombre: "Tarea 1", descripcion: "Descripción de la tarea 1", estado: "pendiente" },
    { id: "1", nombre: "Tarea 4", descripcion: "Descripción de la tarea 4", estado: "pendiente" },
    { id: "2", nombre: "Tarea 2", descripcion: "Descripción de la tarea 2", estado: "proceso" },
    { id: "3", nombre: "Tarea 5", descripcion: "Descripción de la tarea 5", estado: "proceso" },
    { id: "4", nombre: "Tarea 3", descripcion: "Descripción de la tarea 3", estado: "terminada" },
    { id: "5", nombre: "Tarea 6", descripcion: "Descripción de la tarea 6", estado: "terminada" },
];

const TasksContext = createContext();


export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState(initialTask);
    
    // función para agregar una nueva tarea
    const addTask = (category, newTask) => {
        const cantidadTareas = tasks.length;
        const taskWithId = {id: String(Date.now()), ...newTask,  estado: category };
        setTasks((prevTasks) => [...prevTasks, taskWithId]);
        console.log(tasks);
    };

    return (
        <TasksContext.Provider value={{ tasks, setTasks, addTask }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTaskContext = () => useContext(TasksContext);
