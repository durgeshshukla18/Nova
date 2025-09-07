import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { dummyUserChats, dummyUserData } from '../assets/assets'
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;


const AppContext = createContext()

export const AppContextProvider = ( {children} ) => {

    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loadingUser, setLoadingUser] = useState(true);

    const fetchUser = async () => {
       try {
        const { data } = await axios.get('/api/user/data', {headers: {Authorization: token}});
        if(data.success){
            setUser(data.user);
        }else{
            toast.error(data.message);
        }
       } catch (error) {
            toast.error(error.message);
       }finally{
        setLoadingUser(false);
       }
    };

    const createNewChat = async() => {
        // console.log("Token being sent:", token);

        try {
            if(!user) return toast('Loging to create a new Chat');
            navigate('/');
            await axios.post('/api/chat/create',{}, {headers: {Authorization: token}});
            await fetchUserChats();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const fetchUserChats = async () => {
        try {
            const { data } = await axios.get('/api/chat/get', {headers: {Authorization: token}});
            if(data.success){
                setChats(data.chats);
                // If user has no chats
                if(data.chats.length === 0){
                    await createNewChat();
                    return fetchUserChats();
                }else{
                    setSelectedChat(data.chats[0]);
                }
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        if (user) {
            fetchUserChats();
        }else {
            setChats([]);
            setSelectedChat(null);
        }
    }, [user]);

    useEffect(() => {
        if(token){
            fetchUser();
        }else{
            setUser(null);
            setLoadingUser(false);
        }
    }, [token]);

    const value = {
        navigate,
        user,
        setUser,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        theme,
        setTheme,
        fetchUser,
        createNewChat,
        loadingUser,
        fetchUserChats, 
        token, 
        setToken,
        axios
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
    
}

export const useAppContext = () => {
    return useContext(AppContext)
}