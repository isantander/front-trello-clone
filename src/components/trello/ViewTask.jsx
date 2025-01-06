import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useTaskContext } from "../../context/TaskContext";
import { useNavigate } from "react-router-dom";
import  Modal  from  "../utils/Modal";

const ViewTask = () => {   
    const { idTask } = useParams();
    const { accessToken } = useContext(AuthContext);
    const {  deleteTask, fetchTaskId, task } = useTaskContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [ nameAutor, setNameAutor] = useState();

    useEffect( () => {
        const fetchTask = async () => {
            try {
                await fetchTaskId(accessToken, idTask);    
            } catch (error) {
                console.error("Error al obtener la tarea:", error);
            }
        };
        fetchTask();        
    }, [idTask]);

    useEffect(() => {
        if(task ==! []){
            console.log("Task aun no fue cargado")
        }else{
            setNameAutor(task.autor.name);
            console.log("seteando nombre autor");
        }
    }, [task]);

    const handleCloseModal = async () => {
        setIsModalOpen(false);
        const response = await deleteTask(accessToken, idTask);

        if (response.ok) {
            // Espera a que MongoDB confirme la operación
            await new Promise(resolve => setTimeout(resolve, 100)); // Ajusta según la latencia
        } else {
            console.error("Error al eliminar la tarea");
        }

        navigate("/taskboard");
    };

    const handleDeleteTask2 = async (taskId) => {
        try {
            const response = await deleteTaskById(accessToken, taskId); // Llama a la API para eliminar
            if (response.ok) {
                // Espera a que MongoDB confirme la operación
                await new Promise(resolve => setTimeout(resolve, 100)); // Ajusta según la latencia
                const updatedTasks = taskByAutor.filter(task => task.id !== taskId);
                setTaskByAutor(updatedTasks);
            } else {
                console.error("Error al eliminar la tarea");
            }
        } catch (error) {
            console.error("Error en la eliminación:", error);
        }
    };

    const handleDeleteTask = () => {
        setIsModalOpen(true);
    }

  

    return (
        <div className="flex items-center justify-center pt-6">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-center text-yellow-400 text-xl font-bold mb-6">
              Detalles de la Tarea
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-300">
                  Nombre:
                </label>
                <p className="bg-gray-700 p-3 rounded-md text-gray-200">
                  {task.nombre}
                </p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300">
                  Descripción:
                </label>
                <p className="bg-gray-700 p-3 rounded-md text-gray-200">
                  {task.descripcion}
                </p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300">
                  Estado:
                </label>
                <p className="bg-gray-700 p-3 rounded-md text-gray-200">
                  {task.estado}
                </p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300">
                  Autor:
                </label>
                <p className="bg-gray-700 p-3 rounded-md text-gray-200">
                    {nameAutor}
                </p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300">
                  Fecha de Creación:
                </label>
                <p className="bg-gray-700 p-3 rounded-md text-gray-200">
                  {new Date(task.created_at).toLocaleDateString()}

                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
            <a href={`/edit-task/${task.id}`} className="text-yellow-500 hover:text-orange-600">Editar</a>

              <button className="py-1 px-2 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
                                 onClick={(e) => handleDeleteTask(e)}
                >Eliminar</button>
            </div>
          </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Eliminación de tarea</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Atención, está a punto de eliminar una tarea. 
                    <br />
                    Dicho proceso es irreversible. Por favor confirme su acción
                </p>
                <button
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleCloseModal}
                >
                    Cerrar
                </button>
            </Modal>

        </div>
      );

};

export default ViewTask;
