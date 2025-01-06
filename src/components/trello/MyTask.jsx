import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useTaskContext } from "../../context/TaskContext";


const MyTask = () => {   
    const { idTask } = useParams();
    const { accessToken, usuarioId } = useContext(AuthContext);
    const { deleteTask, task, fetchTaskByAutor } = useTaskContext();
    const [ idTaskDelete, setIdTaskDelete ] = useState();
    const [ taskByAutor, setTaskByAutor ] = useState([]);
    
    const navigate = useNavigate();

    useEffect( () => {
        const fetchTask = async () => {
            try {
                const response = await fetchTaskByAutor(accessToken, usuarioId); 
                const responseJson = await response.json();
                setTaskByAutor(responseJson.data);
            } catch (error) {
                console.error("Error al obtener la tarea:", error);
            }
        };
        fetchTask();
    }, [idTask]);


    return (

         <div className="flex flex-wrap justify-center gap-4 p-6 ">
          {taskByAutor.map((task) => (
            <div
              key={task.id}
              className="w-full max-w-xs p-4 bg-white rounded-lg shadow-md border border-gray-300"
            >
              <h2 className="text-lg font-bold text-gray-800">{task.nombre.toUpperCase()}</h2>
              <p className="text-sm text-gray-600 mt-2">{task.descripcion}</p>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-bold">Estado:</span> {task.estado}
                </p>
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-bold">Creado:</span> {new Date(task.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="flex justify-between">
              <h3 className="text-sm lg:text-md font-bold text-white text-right">
              <a href={`/view-task/${task.id}`} className="text-yellow-500 hover:text-orange-600">Ver Tarea</a>
            </h3>
            </div>

            </div>
            
          ))}
        </div>
      );




}

export default MyTask;