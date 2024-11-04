import { useTasks} from "../../context/TasksContext"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTask = () => {

    const { addTask} = useTasks();
    const [newTaskTitle, setNewTaskTitle] = useState();
    const [newTaskDescription, setNewTaskDescription] = useState();  
    const navigate = useNavigate();

    const handleAddTask = () => {
        const newTask = { nombre: newTaskTitle, descripcion: newTaskDescription};
        addTask("pendiente", newTask); 
        navigate("/taskboard");
    };
    
    return (
        <div className="w-screen min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="relative py-3 sm:max-w-xs sm:mx-auto">
                <div className="min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gray-900  rounded-xl shadow-lg">
                    <div className="flex flex-col justify-center items-center h-full select-none">
                        <div className="flex flex-col items-center justify-center gap-2 mb-8">
                            <p className="m-0 text-[16px] font-semibold dark:text-white">Agregar Tarea</p>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-400 ">Título</label>
                            <input className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none text-white dark:border-gray-500 dark:bg-gray-900" 
                                    id="newTaskTitle"
                                    onChange={(e) => setNewTaskTitle(e.target.value)}/>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label className="font-semibold text-xs text-gray-400 ">Descripción</label>
                        <textarea        
                                id="newTaskTitle"
                                rows="4"
                                columns="50"
                                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none text-white dark:border-gray-500 dark:bg-gray-900" 
                                onChange={(e) => setNewTaskDescription(e.target.value)}
                                >
                        </textarea>
                    </div>
                    <div className="mt-5">
                        <button className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
                                    onClick={(e) => handleAddTask(e)}
                        >Agregar tarea</button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default AddTask