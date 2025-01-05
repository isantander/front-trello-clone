import { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const NavBar = () => {
    
    const [isOpen, setIsOpen] = useState(false);
    const { isLogged, setIsLogged, setAccessToken, setRefreshToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const linksLogin = [
        { to: 'add-task', label: 'Add Task' },
        { to: 'taskboard', label: 'Task Board' },
    ]

    const linksLogout = [
        { to: 'login', label: 'Login' },
        { to: 'register', label: 'Register' },
    ]

    const handleLogOut = () => {
        setIsLogged(false);
        setAccessToken(null);
        setRefreshToken(null);
        navigate("/login");
    }

    return (
        <div>
            <nav className="bg-black p-4">
                <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="text-white font-bold text-3xl mb-4 lg:mb-0 hover:text-orange-600 hover:cursor-pointer">
                        Clone Trello by Patagonia Team
                    </div>

                    <div className="lg:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                    <div className={`lg:flex flex-col lg:flex-row ${isOpen ? 'block' : 'hidden'} lg:space-x-4 lg:mt-0 mt-4 flex flex-col items-center text-xl`}>
                        {isLogged && linksLogin.map((link) => (
                            <NavLink key={link.to} className="text-white  px-4 py-2 hover:text-orange-600 " to={`/${link.to}`}>{link.label}</NavLink>
                        ))}
                        {isLogged && <button onClick={handleLogOut} className="text-white  px-4 py-2 hover:text-orange-600 ">Logout</button>}
                        {!isLogged && linksLogout.map((link) => (
                            <NavLink key={link.to} className="text-white  px-4 py-2 hover:text-orange-600 " to={`/${link.to}`}>{link.label}</NavLink>
                        ))}

                    </div>
                </div>                
            </nav>
            <div className="bg-black opacity-35">
                {isLogged && (
                    <div className="text-white p-4 text-right">
                        Bienvenido <strong>xx</strong>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NavBar; 