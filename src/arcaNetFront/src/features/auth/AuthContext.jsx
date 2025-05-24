/*
CRIANDO CONTEXTOS:
 - createContext() --> Gera um novo objeto contexto
 - .provider --> Componente que vem como atributo do contexto que utilizamos
 para demarcar quais componentes o utilizarão
 - userContext(): Permite obter o valor atual do contexto

 - Geralmente context guarda um state e o provider passa tanto
 o state em si quanto o setState envolvido

 - Podemos criar em cima disso um provider personalizado que
 encapsule o controle do estado
*/

import { createContext, useContext, useState } from "react";


// Creating a new context to encapsulate information about our user state
const authContext = createContext();


// This is a customized component to encapsulate the context's provider and
// the authentication handlers
const AuthProvider = ({ children }) => {
    // Defining a state for logged users
    const [user, setUser] = useState(null);

    // Defining a local login function --> Should become our real logic
    const login = (userData) => {
        console.log('logged in!')
        //setUser(...)
    }

    // Defining a local logout function
    const logout = () => {
        console.log('logged out');
        //setUser(null);
    }

    return (
        <>
            {/* isAuth will be false if user === null */}
            <authContext.Provider value={{ user, login, logout, isAuth: !!user }}>
                {children}
            </authContext.Provider>
        </>
    );
};

// Just defining a hook to facilitate the use of this context
const useAuth = () => useContext(authContext);

export { AuthProvider, useAuth};