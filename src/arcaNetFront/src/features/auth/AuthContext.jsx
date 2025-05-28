import { createContext, useContext, useEffect, useState } from "react";
import {loginMock, registerMock} from '../../tests/mockAuth';

// Creating a new context to encapsulate information about our user state
const authContext = createContext();

// This is a customized component to encapsulate the context's provider and
// the authentication handlers
const AuthProvider = ({ children }) => {
    // Defining a state for logged users (This is reloaded at every change of "page")
    const [user, setUser] = useState(null);

     // Resets user from localStorage at each reload
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser)
            setUser(JSON.parse(storedUser));
    }, []);

    // Saves user at localStorage when it changes
    useEffect(() => {
        if (user)
            localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    // Defining a local login function --> Should become our real logic
    const login = async (email, password) => {
        const newUser = await loginMock(email, password);
        if(!newUser)
            return false

        setUser(newUser);
        return true;
    }

    // Defining a local logout function
    const logout = async () => {
        setUser(null);
    }

    const register = async(formData) => {
        const res = await registerMock(formData);
    }

    return (
        <>
            {/* isAuth will be false if user === null */}
            <authContext.Provider value={{ user, setUser, login, logout, register}}>
                {children}
            </authContext.Provider>
        </>
    );
};

// Just defining a hook to facilitate the use of this context
const useAuth = () => useContext(authContext);

export { AuthProvider, useAuth};