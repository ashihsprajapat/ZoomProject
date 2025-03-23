import { useContext } from 'react';
import { createContext } from 'react';
import axios from "axios";
import httpStatus from 'http-status';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export const AuthContext = createContext({})

// const client = axios.create({
const baseURL = "http://localhost:8080/users"
// })

export const AuthProvider = ({ children }) => {

    const authContext = useContext(AuthContext);

    let [userData, setUserData] = useState(authContext);

    const router = useNavigate();


    let handleRegister = async (name, username, password) => {
        try {
            const registerUrl = `${baseURL}/register`;
            console.log(registerUrl)

            let request = await axios.post(registerUrl, {
                name,
                username,
                password
            })
            console.log("request after api call", request)
            console.log(request.data)
            if (request.data.success) {
                toast.success("ok")

                return request.data;
            } else {
                toast.error(request.data);
            }
        } catch (err) {
            toast.error(err)
            console.log(err.response.data)
            return err.response.data
        }
    }


    const handleLogin = async (username, password) => {
        try {
            const loginUrl = `${baseURL}/login`;
            let request = await axios.post(loginUrl, {
                username: username,
                password: password,
            })
            console.log("response after calling ", request)
            console.log(request.data.message, request.data.success
            )
            if (request.data.success) {

                localStorage.setItem("token", request.data.token);

                router("/home")
                toast.success(request.data.message)

                return request;
            } else {
                toast.error(data.message)
                return request;
            }
        } catch (err) {
            toast.error(err)
            console.log(err)
            throw err;
        }
    }


    const data = {
        userData, setUserData, handleRegister, handleLogin
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}
