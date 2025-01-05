import React, { createContext, useContext, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext.jsx';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getNewToken, refreshToken, setAccessToken } = useContext(AuthContext);

    const URL_BACKEND = import.meta.env.VITE_URL_BACKEND;

    const fetchTasks2 = async (accessToken) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${URL_BACKEND}/tareas`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken,
                },
            });

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

    const fetchTasks = async (accessToken) => {
        setLoading(true);
        setError(null);
    
        let attempts = 0; // Limitará a 2 intentos: uno inicial y uno tras renovar token
    
        while (attempts < 2) {
            try {
                // Realiza la solicitud para obtener las tareas
                const response = await fetch(`${URL_BACKEND}/tareas`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': accessToken,
                    },
                });
    
                // Si la respuesta es exitosa, parsea y asigna las tareas
                if (response.ok) {
                    const data = await response.json();
                    setTasks(data.data); // Asigna las tareas al estado
                    return; // Finaliza la función, ya que todo fue exitoso
                }
    
                const responseJson = await response.json();
    
                // Si el token expiró y estamos en el primer intento, renueva y reintenta
                if (responseJson.code === "TOKEN_EXPIRED" && attempts === 0) {
                    const newToken = await getNewToken(refreshToken); // Renueva el token
                    setAccessToken(newToken); // Actualiza el token en tu almacenamiento
                    accessToken = newToken; // Usa el nuevo token para el siguiente intento
                    attempts++; // Incrementa el intento para evitar loops
                    continue; // Reintenta con el nuevo token
                }
    
                // Si es otro error, lo lanzamos para ser manejado en el bloque catch
                throw new Error(responseJson.message || 'Error desconocido al cargar las tareas.');
    
            } catch (err) {
                // Maneja cualquier error durante la solicitud o el procesamiento
                setError(err.message);
                console.error('Error en fetchTasks:', err);
                return; // Finaliza la ejecución si algo falla
            } finally {
                setLoading(false); // Asegura que se detenga el estado de carga
            }
        }
    
        // Si llega aquí, significa que no pudo recuperar tareas tras varios intentos
        setError('No se pudieron cargar las tareas después de renovar el token.');
    };
    
    const updateTask = async (accessToken, taskId, updatedTask) => {
        try {
            const response = await fetch(`${URL_BACKEND}/tareas/${taskId}`, {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': accessToken,
                },
                body: JSON.stringify(updatedTask),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar la tarea.');
            }
        } catch (err) {
            console.error('Error al actualizar la tarea:', err);
        }
    };

    const createTask = async (accessToken, taskTitle, taskDescription) => {
        let attempts = 0;
    
        // SOlo 2 intentos para evitar un bucle infinito
        while (attempts < 2) { 
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
                    }),
                });
    
                if (response.ok) {
                    fetchTasks(accessToken);
                    return await response.json(); // Retorna si todo va bien
                }
    
                const responseJson = await response.json();
    
                if (responseJson.code === "TOKEN_EXPIRED" && attempts === 0) {
                    // Si el token expiró y es el primer intento
                    accessToken = await getNewToken(refreshToken);
                    setAccessToken(accessToken); // Actualiza el token en tu almacenamiento
                    attempts++; // Incrementa el intento para evitar loops
                    continue; // Reintenta la operación con el nuevo token
                }
    
                // Si no es un error manejable, lanza un error
                throw new Error(responseJson.message || 'Error desconocido al crear la tarea');
            } catch (err) {
                console.error('Error en createTask:', err);
                throw err; // Propaga el error para manejarlo donde se llame
            }
        }
    
        throw new Error('No se pudo crear la tarea tras varios intentos');
    };


    const taskContextValue = useMemo(() => ({ 
        tasks, 
        setTasks, 
        fetchTasks, 
        updateTask,
        createTask,
        loading, 
        error }), [tasks, loading, error]);
    
    return (
        <TaskContext.Provider value={ taskContextValue}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => useContext(TaskContext);
