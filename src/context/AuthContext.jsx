import { createContext, useEffect, useState, useMemo } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const URL_BACKEND = import.meta.env.VITE_URL_BACKEND;

    const [isLogged, setIsLogged] = useState(() => {
        const store = localStorage.getItem("isLogged");
        return store ? store : false;
    });
    
    
    const [ accessToken, setAccessToken ] = useState(
        localStorage.getItem("accessToken")
    );
    
    const [ refreshToken, setRefreshToken ] = useState(
        localStorage.getItem("refreshToken")
    );
    
    const [usuarioId, setUsuarioId] = useState(
        localStorage.getItem("usuarioId")
    );
    
    const [userName, setUserName] = useState(
        localStorage.getItem("userName")
    );
    
    useEffect(() => {
        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
        } else {
            localStorage.removeItem("accessToken");
        }
    }, [accessToken]);
    
    useEffect(() => {
        if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
        }else {
            localStorage.removeItem("refreshToken");
        }
    }, [refreshToken]);
    
    useEffect(() => {
        if (usuarioId) {
            localStorage.setItem("usuarioId", usuarioId);
        } else {
            localStorage.removeItem("usuarioId");
        }
    }, [usuarioId]);

    useEffect(() => {
        if (userName) {
            localStorage.setItem("userName", userName);
        } else {
            localStorage.removeItem("userName");
        }
    }, [userName]);
    
    // Login 
    const login = async (email, password) => {
        
        const payload = {
            email: email,
            password: password
        }
        const response = await fetch(`${URL_BACKEND}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( payload ),
        });
        
        return response;
    }
    
    const register = async (email, password, name) => {
        
        const payload = {
            email: email,
            name: name,
            password: password
        }

        const response = await fetch(`${URL_BACKEND}/auth/registro`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( payload ),
        });
        
        return response;
    }

    const getNewToken = async (refreshToken) => {
        try {
            const response = await fetch(`${URL_BACKEND}/auth/actualizar-token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-refresh-token": refreshToken
                }
            });
        
            if (!response.ok) {
                throw new Error('Error al renovar el token');
            }
    
            const responseJson = await response.json();
            return responseJson.data.accessToken; 
        } catch (err) {
            console.error('Error al renovar el token:', err);
            throw err; 
        }
    };

    // Memorizar el valor del contexto para mejorar el rendimiento
    const authContextValue = useMemo(() => ({
        isLogged,
        setIsLogged,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        login,
        register,
        getNewToken,
        setUsuarioId,
        setUserName,
        usuarioId,
        userName
    }), [isLogged, userName, accessToken, refreshToken, usuarioId]);
    
    useEffect(() => {
        localStorage.setItem("isLogged", isLogged);
    }, [isLogged]);
    
    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};


