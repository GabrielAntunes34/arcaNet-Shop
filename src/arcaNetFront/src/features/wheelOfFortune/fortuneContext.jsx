import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

// Creating a new context to encapsulate information about our user state
const fortuneContext = createContext();

// This is a customized component to encapsulate the context's provider and
// the authentication handlers
const FortuneProvider = ({ children }) => {
    // Defining a state for logged users (This is reloaded at every change of "page")
    const { user } = useAuth();
    const [numbers, setNumbers] = useState(null);
    const [gameMessage, setGameMessage] = useState('');
    const [alreadyPlayed, setAlreadyPlayed] = useState(false);

    // Draw fetch, if the user is logged and it's the first time playint
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch('http://localhost:3000/fortune/draw', {
                    method: 'GET',
                    headers: {
                        'content-type':'application/json'
                    },
                    credentials:'include'
                });

                // Verifying the response
                if(!response.ok) {
                    console.log('aquiiii');
                    console.log(response);
                }
                const data = await response.json();

                // If the player already played
                if(response.status === 403) {
                    setNumbers(false);
                    setGameMessage(data.message)
                }

                console.log(data.data);

                setNumbers(data.data);
                setAlreadyPlayed(true);
            }
            catch(err) {
                console.log(err.message);
                console.error('Error fetching users from API:', err);
            }
        };

        // Draw cards if user hasn't played yet
        if(user && !alreadyPlayed) {
            fetchCards();
        }
    }, [user]);

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

    const claimCupon = async () => {
        try {
            const response = await fetch('http://localhost:3000/fortune/claim', {
                method: 'GET',
                    headers: {
                        'content-type':'application/json'
                    },
                credentials:'include'
            });

            const data = await response.json();
            setGameMessage(data.message);
        }
        catch(err) {
            console.log(err.message);
            console.error('Error fetching users from API:', err);      
        }

    }

    return (
        <>
            <fortuneContext.Provider value={{ numbers, gameMessage, claimCupon, alreadyPlayed}}>
                {children}
            </fortuneContext.Provider>
        </>
    );
};

// Just defining a hook to facilitate the use of this context
const useFortune = () => useContext(fortuneContext);

export { FortuneProvider, useFortune};