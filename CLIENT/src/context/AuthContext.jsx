import { createContext, useState,useEffect } from "react";

export const AuthContext = createContext();


export default function AuthProvider({children}){
    const [user, setUser] = useState(null)
    useEffect(() => {
        let storedUser = JSON.parse(localStorage.getItem('user'))
        console.log("User: ", storedUser)
        if(storedUser){
            setUser(storedUser)
        }
    }, [])
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}