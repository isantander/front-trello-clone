import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import  Modal  from  "../utils/Modal";

const Register = () => {
    const { register } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await register(email, password, name);
        const responseJson = await response.json();

        if (response.ok) {
            setIsModalOpen(true);
        }else{
            console.log("fail", responseJson);   
        }
        
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        navigate("/login");
    };
    

    return (
        <>
        <div className="w-screen min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="relative py-3 sm:max-w-xs sm:mx-auto">
                <div className="min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gray-900  rounded-xl shadow-lg">
                    <div className="flex flex-col justify-center items-center h-full select-none">
                        <div className="flex flex-col items-center justify-center gap-2 mb-8">
                            <p className="m-0 text-[16px] font-semibold dark:text-white">Registro de usuarios</p>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-400 ">E-mail</label>
                            <input className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none text-white dark:border-gray-500 dark:bg-gray-900" 
                                id="email"
                                placeholder="email" 
                                onChange={(e) => setEmail(e.target.value)}
                                />
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label className="font-semibold text-xs text-gray-400 ">Nombre</label>
                        <input className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none text-white dark:border-gray-500 dark:bg-gray-900" 
                            id="name"
                            placeholder="Nombre" 
                            onChange={(e) => setName(e.target.value)}
                            />
                    </div>                    
                    <div className="w-full flex flex-col gap-2">
                        <label className="font-semibold text-xs text-gray-400 ">Password</label>
                        <input type="password" 
                            id="password"
                            className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none text-white dark:border-gray-500 dark:bg-gray-900" 
                            placeholder="••••••••" 
                            onChange={(e) => setPassword(e.target.value)}
                            />
                    </div>
                    <div className="mt-5">
                        <button className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
                                 onClick={(e) => handleSubmit(e)}
                        >Ingresar</button>
                    </div>

                </div>
            </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Usuario creado correctamente</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Se ha enviado un email a su casilla de correo para que finalice el proceso de activación de su cuenta.
                <br />
                No implementado en esta versión.
            </p>
            <button
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleCloseModal}
            >
                Cerrar
            </button>
        </Modal>
        </>
    );
};

export default Register;