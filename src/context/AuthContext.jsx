import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
    const [authData, setAuthData] = useState(() => {

    const storedAuthData = localStorage.getItem("authData");

    return storedAuthData
        ? JSON.parse(storedAuthData)
        : { isLogged: false, userName: "", nikName: "" };
    });

    useEffect(() => {
        localStorage.setItem("authData", JSON.stringify(authData));
    }, [authData]);

    const updateAuthData = (newData) => {
        setAuthData((prevData) => ({ ...prevData, ...newData }));
    };

    const clearAuthData = () => {
        setAuthData({ isLogged: false, userName: "", nikName: "" });
        localStorage.removeItem("authData");
    };

    return (
        <AuthContext.Provider value={{ authData, updateAuthData, clearAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};