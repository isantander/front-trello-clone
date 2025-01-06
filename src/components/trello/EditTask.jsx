import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useTaskContext } from "../../context/TaskContext";

const EditTask = () => {
    const { idTask } = useParams();
    const { accessToken } = useContext(AuthContext);
    const { updateTask, fetchTaskId, task } = useTaskContext();
    const navigate = useNavigate();

    // Estado local independiente
    const [formValues, setFormValues] = useState({
        nombre: "",
        descripcion: "",
    });
    const [error, setError] = useState("");
    const [isFormDirty, setIsFormDirty] = useState(false); // Nuevo estado para controlar cambios manuales

    // Efecto para cargar la tarea una sola vez al montar
    useEffect(() => {
        const fetchTask = async () => {
            try {
                await fetchTaskId(accessToken, idTask);
            } catch (error) {
                console.error("Error al obtener la tarea:", error);
                setError("No se pudo cargar la tarea.");
            }
        };
        fetchTask();
    }, [idTask, accessToken, fetchTaskId]);

    useEffect(() => {
        if (task && !isFormDirty) {
            setFormValues({
                nombre: task.nombre || "",
                descripcion: task.descripcion || "",
            });
        }
    }, [task, isFormDirty]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
        // Marca el formulario como modificado
        setIsFormDirty(true); 
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();

        if (!formValues.nombre.trim() || !formValues.descripcion.trim()) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        try {
            await updateTask(accessToken, idTask, formValues);
            navigate("/tasksbard"); 
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
            setError("No se pudo actualizar la tarea.");
        }
    };

    return (
        <div className="w-screen flex items-center justify-center">
            <div className="relative py-3 sm:max-w-md lg:max-w-lg sm:mx-auto w-full mt-20">
                <div className="px-8 py-6 mt-4 text-left bg-white dark:bg-gray-900 rounded-xl shadow-lg">
                    <div className="flex flex-col justify-center items-center h-full select-none">
                        <div className="flex flex-col items-center justify-center gap-2 mb-8">
                            <p className="m-0 text-[16px] font-semibold dark:text-white">Editar Tarea</p>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-400">Título</label>
                            <input
                                type="text"
                                name="nombre"
                                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none text-white dark:border-gray-500 dark:bg-gray-900"
                                onChange={handleInputChange}
                                value={formValues.nombre}
                            />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-400">Descripción</label>
                            <textarea
                                name="descripcion"
                                rows="4"
                                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none text-white dark:border-gray-500 dark:bg-gray-900"
                                onChange={handleInputChange}
                                value={formValues.descripcion}
                            />
                        </div>
                        <div className="mt-5">
                            <button
                                className="py-2 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
                                onClick={handleUpdateTask}
                            >
                                Actualizar tarea
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTask;
