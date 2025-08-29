import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const AppContext = createContext()

export const AppContextProvider = ( {children} ) => {

    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [chat, setChat] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const fetchUser = async () => {
        try {
            const response = await fetch('/api/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                setUser(null);
            }       
        } catch (error) {
            console.error('Error fetching user:', error);
            setUser(null);
        }
    };

    const value = {}

    return (
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
    )
    
}

export const useAppContext = () => {
    return useContext(AppContext)
}