import { createContext, useContext, useEffect, useState } from "react";

import {makeLogin, makeRegister, checkAuth} from '../../services/authServices';

// Creating a new context to encapsulate information about our user state
const authContext = createContext();

// This is a customized component to encapsulate the context's provider and
// the authentication handlers
const AuthProvider = ({ children }) => {
    // Defining a state for logged users (This is reloaded at every change of "page")
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check authentication on app load
    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const userData = await checkAuth();
                if (userData) {
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error while trying to verify authentication:', error);
            } finally {
                setLoading(false);
            }
        };

        verifyAuth();
    }, []);

    // Defining a local login function --> Should become our real logic
    const login = async (email, password) => {
        try {
            const newUser = await makeLogin(email, password);
            if(!newUser) {
                return false;
            }

            setUser(newUser);
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    }

    // Defining a local logout function
    const logout = async () => {
        try {
            // Call backend to clear cookie
            await fetch('http://localhost:3000/auth/logout', {
                method: 'GET',
                credentials: 'include',
            });
        } catch (error) {
            console.error('Error while trying to logout on backend:', error);
        }

        setUser(null);

        // clearing the cookie on the frontend
        document.cookie = 'authToken=; Max-Age=0; Path=/; SameSite=Lax';
    }

    const register = async(formData) => {
        const res = await makeRegister(formData);
    }

    return (
        <>
            {/* isAuth will be false if user === null */}
            <authContext.Provider value={{ user, setUser, login, logout, register, loading}}>
                {children}
            </authContext.Provider>
        </>
    );
};

// Just defining a hook to facilitate the use of this context
const useAuth = () => useContext(authContext);

export { AuthProvider, useAuth};