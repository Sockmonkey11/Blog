import { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";



export const AuthContext= createContext()

export const AuthConextProvider=({children})=>{
    const [currentUser, setCurrentUser]=useState(JSON.parse(localStorage.getItem("user") || null))

    const login= async (inputs)=> {
        const res =await axios.post("http://localhost:8800/api/auth/login",inputs)
        setCurrentUser(res.data)
    }
    const logout= async (inputs)=> {
        await axios.post("http://localhost:8800/api/auth/logout",
            {},
            {
                withCredentials: true,
                credentials: "include",
              }
        )
        setCurrentUser(null)
    }

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser))
    },[currentUser])

return (
    <AuthContext.Provider value={{currentUser,login,logout}}>{children}</AuthContext.Provider>
)

}
