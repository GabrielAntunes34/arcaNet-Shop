import { createContext, useContext, useState } from "react";
import {loginMock, logoutMock, registerMock} from '../../tests/mockAuth';

// Creating a new context to encapsulate information about our user state
const authContext = createContext();

// This is a customized component to encapsulate the context's provider and
// the authentication handlers
const AuthProvider = ({ children }) => {
    // Defining a state for logged users
    const [user, setUser] = useState({});

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
        console.log('logged out');
        //setUser(null);
    }

    const register = async(formData) => {
        console.log('registered');
    }

    return (
        <>
            {/* isAuth will be false if user === null */}
            <authContext.Provider value={{ user, setUser, login, logout, register, isAuth: !!user }}>
                {children}
            </authContext.Provider>
        </>
    );
};

// Just defining a hook to facilitate the use of this context
const useAuth = () => useContext(authContext);

export { AuthProvider, useAuth};