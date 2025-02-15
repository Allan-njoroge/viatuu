import { createContext, useState, useEffect } from "react"
import axios from "axios"

interface AuthContextType {
    user: object | null;
    login: (inputs: object) => Promise<any>;
    logout: () => Promise<any>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => Promise.resolve(),
    logout: async () => Promise.resolve(),
})

export const AuthProvider: React.FC<{ children: React.ReactNode }>  = ({ children }) => {
    const [user, setUser] = useState<object | null>(
        () => JSON.parse(localStorage.getItem("user") || "null"
    ))

    // Create A Login Function
    const login = async (inputs: object) => {
        try{
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/users/login`, 
                inputs, 
                { withCredentials: true }
            );
    
            if (response?.data?.user) {
                setUser(response.data.user);
            }
    
            return response;
        } catch(e: any) {
            throw e
        }
    }

    const logout = async () => {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/login`, { withCredentials: true })
        setUser(null)
        return response
    }

    // useEffect(() => {
    //     if (user) {
    //         localStorage.setItem("user", JSON.stringify(user));
    //         setLoggedIn(true);
    //     } else {
    //         localStorage.removeItem("user"); // Ensure old data is removed
    //         setLoggedIn(false);
    //     }
    // }, [user])

    return (
        <AuthContext.Provider value={{ login, logout, user }}>
            {children}
        </AuthContext.Provider>
    )
}