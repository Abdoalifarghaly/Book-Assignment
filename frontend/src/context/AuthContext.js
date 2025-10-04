import { Children, createContext, useEffect, useState } from "react";



export const AuthContext=createContext();
export const Authprovider=({Children})=>{
    const [token,settoken]=useState(localStorage.getItem("token"))
    const [user,setuser]=useState(null)

    useEffect(()=>{
        if(token){
            localStorage.setItem("token")
        }else{
            localStorage.removeItem("token")

        }

    },[token])
    const login=(jwt,userData)=>{
        settoken(jwt)
        setuser(userData)
    }
    const logout=()=>{
        settoken(null)
        setuser(null)
    }

    return(
        <AuthContext.Provider value={{token,user,login,logout}}>
            {Children}
        </AuthContext.Provider>
    )

}