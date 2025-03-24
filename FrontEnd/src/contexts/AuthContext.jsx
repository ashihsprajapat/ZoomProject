import { useContext } from 'react';
import { createContext } from 'react';
import axios from "axios";
import httpStatus from 'http-status';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const AuthContext = createContext({})

const client = axios.create({
    baseURL: "http://localhost:8084/users"
})

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate("");

    const authContext = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);

    let [userData, setUserData] = useState(authContext);

    const router = useNavigate();


    let handleRegister = async (name, username, password) => {
        try {

            console.log(username, password, name)

            let request = await client.post(`/register`, {
                name,
                username,
                password
            })
            console.log("request after api call", request)

            if (request.data.success) {
                toast.success(request.data.message)

                return request.data;
            } else {
                toast.error(request.data);
            }
        } catch (err) {

            console.log(err)
            throw err;
        }
    }


    const handleLogin = async (username, password) => {
        try {
            console.log(username, password)
            
            let request = await client.post(`/login`, {
                username,
                password,
            })
            console.log("response after calling ", request)
            if (request.data.success) {

                localStorage.setItem("zoom_token", request.data.token);

                router("/home")
                toast.success(request.data.message)

                return request;
            } else {
                toast.error(data.message)
                return request;
            }
        } catch (err) {

            console.log(err)
            toast.error(err)
            throw err;
        }
    }


    const data = {
        userData, setUserData, handleRegister, handleLogin,
        navigate,
        isLoading, setIsLoading
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

