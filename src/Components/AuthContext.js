import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();
 

const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return JSON.parse(localStorage.getItem('isAuthenticated')) || false;
      });
      
      useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
      }, [isAuthenticated]);

    const login = () => { setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', JSON.stringify(true)); };

    const logout = () => {setIsAuthenticated(false);
        localStorage.setItem('isAuthenticated', JSON.stringify(false)); };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
             {children}
        </AuthContext.Provider> );
};

export { AuthContext, AuthProvider };