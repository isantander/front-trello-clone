import { createContext, useEffect, useState } from "react";

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
    
    
    // Login 
    const loginBackend = async (email, password) => {
        
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
    
    useEffect(() => {
        localStorage.setItem("isLogged", isLogged);
    }, [isLogged]);
    
    return (
        // ver useMemo hook
        <AuthContext.Provider value={{ isLogged, setIsLogged, accessToken, setAccessToken, refreshToken, setRefreshToken, loginBackend }}>
            {children}
        </AuthContext.Provider>
    );
};


