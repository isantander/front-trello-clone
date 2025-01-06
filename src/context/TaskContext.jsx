import React, { createContext, useContext, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext.jsx';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getNewToken, refreshToken, setAccessToken } = useContext(AuthContext);

    const URL_BACKEND = import.meta.env.VITE_URL_BACKEND;

    /**
     * Implemento en cada llamaa a la API un bucle while
     * para que en caso de que la respuesta no sea ok actualice el token y 
     * envié nuevamente la petición esta vez con un troken válido.
    */

    const fetchTasks = async (accessToken) => {
        setLoading(true);
        setError(null);
    
        let intentos = 0; 
    
        while (intentos < 2) {
            try {
                const response = await fetch(`${URL_BACKEND}/tareas`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': accessToken,
                    },
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setTasks(data.data); 
                    return;
                }
    
                const responseJson = await response.json();
    
                // Si el token expiró y estamos en el primer intento, renueva y reintenta
                if (responseJson.code === "TOKEN_EXPIRED" && intentos === 0) {
                    const newToken = await getNewToken(refreshToken);
                    setAccessToken(newToken);
                    accessToken = newToken;
                    intentos++;
                    continue;
                }
    
                throw new Error(responseJson.message || 'Error desconocido al cargar las tareas.');
    
            } catch (err) {
                setError(err.message);
                console.error('Error en fetchTasks:', err);
                return;
            } finally {
                setLoading(false); 
            }
        }
    
        // Si llegamos acá hay quilombo
        setError('No se pudieron cargar las tareas después de renovar el token.');
    };
    
    const fetchTaskId = async (accessToken, id) => {
        setLoading(true);
        setError(null);
    
        let intentos = 0; 
    
        while (intentos < 2) {
            try {
                const response = await fetch(`${URL_BACKEND}/tareas/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': accessToken,
                    },
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setTask(data.data); 
                    return;
                }
    
                const responseJson = await response.json();
    
                if (responseJson.code === "TOKEN_EXPIRED" && intentos === 0) {
                    const newToken = await getNewToken(refreshToken);
                    setAccessToken(newToken);
                    accessToken = newToken;
                    intentos++;
                    continue;
                }
    
                throw new Error(responseJson.message || 'Error desconocido al cargar las tareas.');
    
            } catch (err) {
                setError(err.message);
                console.error('Error en fetchTasks:', err);
                return;
            } finally {
                setLoading(false); 
            }
        }
    
        // Si llegamos acá hay quilombo
        setError('No se pudieron cargar las tareas después de renovar el token.');
    };

    const updateTask = async (accessToken, taskId, updatedTask) => {
        let intentos = 0;
        while (intentos < 2) { 
            try {
                console.log("acaaa en updateTask en Context");
                const response = await fetch(`${URL_BACKEND}/tareas/${taskId}`, {
                    method: 'PATCH',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': accessToken,
                    },
                    body: JSON.stringify(updatedTask),
                });

                if (response.ok) {
                    return;
                }

                const responseJson = await response.json();
    
                if (responseJson.code === "TOKEN_EXPIRED" && intentos === 0) {
                    accessToken = await getNewToken(refreshToken);
                    setAccessToken(accessToken); 
                    intentos++;
                    continue;
                }else{
                    console.log("en el else", responseJson);
                }

            } catch (err) {
                console.error('Error al actualizar la tarea:', err);
            }
        }

        setError('No se pudieron cargar las tareas después de renovar el token.');

    };

    const createTask = async (accessToken, taskTitle, taskDescription, usuarioId) => {
        let intentos = 0;
        while (intentos < 2) { 
            try {
                const response = await fetch(`${URL_BACKEND}/tareas`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': accessToken,
                    },
                    body: JSON.stringify({
                        nombre: taskTitle,
                        descripcion: taskDescription,
                        estado: 'pendiente',
                        autor: usuarioId
                    }),
                });
    
                if (response.ok) {
                    fetchTasks(accessToken);
                    return await response.json();
                }
    
                const responseJson = await response.json();
    
                if (responseJson.code === "TOKEN_EXPIRED" && intentos === 0) {
                    accessToken = await getNewToken(refreshToken);
                    setAccessToken(accessToken); 
                    intentos++;
                    continue;
                }
    
                throw new Error(responseJson.message || 'Error desconocido al crear la tarea');
            } catch (err) {
                console.error('Error en createTask:', err);
                throw err; 
            }
        }
    
        throw new Error('No se pudo crear la tarea tras varios intentos');
    };


    const deleteTask = async(accessToken, taskId) => {
        let intentos = 0;
    
        while (intentos < 2) { 
            try {
                const response = await fetch(`${URL_BACKEND}/tareas/${taskId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': accessToken,
                    },
                });
    
                if (response.ok) {
                    return response;
                }
    
                const responseJson = await response.json();
    
                if (responseJson.code === "TOKEN_EXPIRED" && intentos === 0) {
                    accessToken = await getNewToken(refreshToken);
                    setAccessToken(accessToken); 
                    intentos++;
                    continue;
                }
    
                throw new Error(responseJson.message || 'Error desconocido al eliminar la tarea');
            } catch (err) {
                console.error('Error en deleteTask:', err);
                throw err; 
            }
        }
    
        throw new Error('No se pudo eliminar la tarea tras varios intentos');
    }

    const fetchTaskByAutor = async (accessToken, autor) => {
        let intentos = 0;
        
        while (intentos < 2) { 
            try {
                const response = await fetch(`${URL_BACKEND}/tareas/autor/${autor}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': accessToken,
                    },
                });
    
                if (response.ok) {
                    return response;
                }
    
                const responseJson = await response.json();
    
                if (responseJson.code === "TOKEN_EXPIRED" && intentos === 0) {
                    accessToken = await getNewToken(refreshToken);
                    setAccessToken(accessToken); 
                    intentos++;
                    continue;
                }
    
                throw new Error(responseJson.message || 'Error desconocido al eliminar la tarea');
            } catch (err) {
                console.error('Error en deleteTask:', err);
                throw err; 
            }
        }
    
        throw new Error('No se pudo cargar las tareas del usuario tras varios intentos');
    }

    const taskContextValue = useMemo(() => ({ 
        task,
        tasks, 
        setTasks, 
        setTask,
        fetchTasks,
        fetchTaskId, 
        updateTask,
        createTask,
        deleteTask,
        loading, 
        fetchTaskByAutor,
        error }), [task, tasks, loading, error]);
    
    return (
        <TaskContext.Provider value={ taskContextValue}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => useContext(TaskContext);
