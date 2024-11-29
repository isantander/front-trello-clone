import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
    const { authData, updateAuthData } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === "ivan" && password === "123") {
          toast.success("sesion iniciada");
          updateAuthData({ isLogged: true, userName: "Ivan Santander", nikName: "isantander" });
          navigate("/taskboard");    
        }  else if (username === "javier" && password === "123") {
            toast.success("sesion iniciada");
            updateAuthData({ isLogged: true, userName: "Javier Latini", nikName: "jlatini" });
            navigate("/taskboard");    
        } else {
          toast.error("ingrese usuario y contraseña");
          navigate("/login"); 
        }
    };

    return (
        <div className="w-screen min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="relative py-3 sm:max-w-xs sm:mx-auto">
                <div className="min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gray-900  rounded-xl shadow-lg">
                    <div className="flex flex-col justify-center items-center h-full select-none">
                        <div className="flex flex-col items-center justify-center gap-2 mb-8">
                            <p className="m-0 text-[16px] font-semibold dark:text-white">Login de usuarios</p>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-400 ">Usuario</label>
                            <input className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none text-white dark:border-gray-500 dark:bg-gray-900" 
                                   id="username"
                                   placeholder="Username" 
                                   onChange={(e) => setUsername(e.target.value)}/>
                        </div>
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
                    <div className="text-white pt-3">
                        USUARIOS:
                        <ul className="list-disc list-inside text-sm pt-2 pl-4">
                            <li>ivan/123</li>
                            <li>javier/123</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;