import { useContext } from 'react';
import { createContext } from 'react';
import axios from "axios";
import httpStatus from 'http-status';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({})
const client = axios.create({
    baseURL: "http://localhost:8080/users"
})
export const AuthProvider = ({children}) => {
    const authContext = useContext(AuthContext);
    let [userData, setUserData] = useState(authContext);
    let handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name, 
                username: username,
                password: password,
            })
            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }
        } catch (err) {
            console.log(err)
            throw err;
        }
    }


    const handleLogin=async(username,password)=>{
        try{
            let request=await client.post("/login",{
                username:username,
                password:password,
            })
            if(request.status===httpStatus.OK){
                localStorage.setItem("token",request.data.token);
                router("/home")
            }
        }catch(err){
            console.log(err)
            throw err;
        }
    }

    const router = useNavigate();
    const data = {
        userData, setUserData, handleRegister,handleLogin
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}
// export function AuthContext() {
//     return (<>

//     </>);
// }

