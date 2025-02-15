import { createContext, useState, useEffect } from "react"
import axios from "axios"

interface AuthContextType {
    user: object | null;
    loggedIn: boolean;
    login: (inputs: object) => Promise<any>;
    logout: () => Promise<any>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loggedIn: false,
    login: async () => Promise.resolve(),
    logout: async () => Promise.resolve(),
})

export const AuthProvider: React.FC<{ children: React.ReactNode }>  = ({ children }) => {
    const [user, setUser] = useState<object | null>(
        () => JSON.parse(localStorage.getItem("user") || "null"
    ))
    const [loggedIn, setLoggedIn] = useState<boolean>(false)

    // Create A Login Function
    const login = async (inputs: object) => {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/login`, inputs, { withCredentials: true })
        setUser(response.data.user)
        return response
    }

    const logout = async () => {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/login`, { withCredentials: true })
        setUser(null)
        return response
    }

    // useEffect(() => {
    //     // Store user in localStorage when user state changes
    //     localStorage.setItem("user", JSON.stringify(user));

    //     if(user !== null) {
    //         setLoggedIn(true)
    //     } else {
    //         setLoggedIn(false)
    //     }
    // }, [user])

    return (
        <AuthContext.Provider value={{ login, logout, loggedIn, user }}>
            {children}
        </AuthContext.Provider>
    )
}