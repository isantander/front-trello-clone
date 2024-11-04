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

      // Función para generar un nuevo ID
    const generateId = () => {
        // Convierte initialTask a un solo array
        const allTasks = Object.values(tasks).flat(); 
        // convierte los IDs de allTasks a números
        const ids = allTasks.map(task => parseInt(task.id, 10));
        // Usa Math.max para obtener el id alto
        const maxId = Math.max(...ids); 
        // devuelve el maxId + 1 y lo convierte en string, posteriormente el campo id será numérico
        return (maxId + 1).toString(); 
    };

    // función para agregar una nueva tarea
    const addTask = (category, newTask) => {
        const taskWithId = { ...newTask, id: generateId() };

        // prevTasks representa el estado actual de tasks
        setTasks((prevTasks) => ({
        ...prevTasks,
        [category]: [...prevTasks[category], taskWithId],
        }));
    };

    return (
        <TasksContext.Provider value={{ tasks, setTasks, addTask }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = () => useContext(TasksContext);
