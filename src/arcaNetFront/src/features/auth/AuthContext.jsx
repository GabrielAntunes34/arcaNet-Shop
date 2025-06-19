import { createContext, useContext, useEffect, useState } from "react";
import {loginMock, registerMock} from '../../tests/mockAuth';
import {makeLogin, makeRegister} from '../../services/authServices';

// Creating a new context to encapsulate information about our user state
const authContext = createContext();

// This is a customized component to encapsulate the context's provider and
// the authentication handlers
const AuthProvider = ({ children }) => {
    // Defining a state for logged users (This is reloaded at every change of "page")
    const [user, setUser] = useState(null);

     // Resets user from localStorage at each reload
    

    // Saves user at localStorage when it changes
  

    // Defining a local login function --> Should become our real logic
    const login = async (email, password) => {
        const newUser = await makeLogin(email, password);
        if(!newUser)
            return false

        setUser(newUser);
        return true;
    }

    // Defining a local logout function
    const logout = async () => {
        setUser(null);

        // Limpando o cookie
        document.cookie = 'authToken=; Max-Age=0; Path=/; SameSite=Lax';
    }

    const register = async(formData) => {
        const res = await makeRegister(formData);
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