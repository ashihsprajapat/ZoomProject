import { useContext, useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AuthContext } from './../contexts/AuthContext';
import { Snackbar } from "@mui/material";
import './authenticationStyle.css'
import IconButton from '@mui/material/IconButton';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import HttpsIcon from '@mui/icons-material/Https';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { toast } from 'react-hot-toast';


function Authentication() {

    const { navigate, handleRegister, handleLogin, isLoading, setIsLoading } = useContext(AuthContext)

    let handleSubmit = (event) => {
        event.preventDefault();
        setName("");
        setPassword('');
        setUserName('');
        console.log(userInfo)
    }

    let [currState, setCurrState] = useState('login');
    let [name, setName] = useState("");
    let [userName, setUserName] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState();
    let [message, SetMessage] = useState();
    let [open, setOpen] = useState(false);





    let handleAuth = async (e) => {
        e.preventDefault();
        console.log(name, password, userName);
        try {
            setIsLoading(true);

            if (currState == 'login') {
                //login
                let result = await handleLogin(userName, password);

                console.log("in authentication file", result);

                if (result.data.success) {
                    toast.success(result.data.message)
                    setUserName("");
                    setError("");
                    setPassword("");
                    navigate("/home")
                } else {
                    setError(request.data.message);
                }


            } else
                if (currState === 'signup') {
                    //register
                    let result = await handleRegister(name, userName, password);
                    console.log(result);

                    if (result.success) {
                        setError(result);
                        setOpen(true);
                        setCurrState(0);
                        setUserName("");
                        setPassword("");
                        navigate("/home")
                    } else {
                        setError(result.message)
                        toast.error(result.message)
                    }


                }
        } catch (err) {
            let mesage=err.response.data.message;
            console.log(message);
            toast.error(message)


        } finally {
            setIsLoading(false);
        }
    }


    // password show 
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };


    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    })()




    return (
        <div className="  min-h-screen w-full  p-3 bg-green-200  border border-green-800 items-center">
            <div className="authentiactionPage mt-3   p-5 rounded-3xl bg-gray-400  "
            >
                <h2 className="text-3xl font-semibold w-fit mx-auto my-3" >You need to {currState} <HttpsIcon sx={{ color: "black", fontSize: "2rem" }} /> </h2>
                <Button className="m-2  "
                    variant={currState == 'login' ? "contained" : "text"}
                    onClick={() => { setCurrState('login') }} >
                    Log in
                </Button>
                <Button className="m-2"
                    variant={currState == 'signup' ? "contained" : "text"}
                    onClick={() => { setCurrState('signup') }}>
                    Register
                </Button>
                <div className="w-full" >
                    <form className=" needs-validation flex flex-col w-full gap-2 " onSubmit={handleAuth}  >


                        {currState == 'signup' && (<TextField
                            sx={{ fontSize: "1rem" }}
                            id="outlined-multiline-flexible"
                            label="Full Name"
                            fullWidth
                            required
                            margin="normal"
                            onChange={(e) => { setName(e.target.value) }}
                            size="small"
                            value={name}
                            className="max-w-3xl"
                        />)}


                        <TextField
                            sx={{ fontSize: "1rem" }}
                            id="outlined-multiline-flexible"
                            label="@username"
                            fullWidth
                            required
                            margin="normal"
                            onChange={(e) => { setUserName(e.target.value) }}
                            size="small"
                            value={userName}
                            className="max-w-3xl  "
                        />

                        <FormControl className="w-full" variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                size="small"
                                required
                                fullWidth
                                onChange={(e) => { setPassword(e.target.value) }}
                                value={password}
                                className="max-w-3xl"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>


                        {
                            currState == 0 && <p className="forgotPassword" style={{ color: "blue" }} onClick={() => navigate("/reset-password")} >Forgot Password</p>
                        }
                        <p style={{ color: "red" }}>
                            {error}
                        </p>
                        <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                                <label className="form-check-label text-sm" htmlFor="invalidCheck">
                                    Agree to terms and conditions
                                </label>
                                <div className="invalid-feedback">
                                    You must agree before submitting.
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="bg-blue-600 btn  text-white  " disabled={isLoading}  >
                            {
                                isLoading &&
                                <RotateLeftIcon className="animate-spin" />
                            }

                            {currState == 'login' ? "Sign in" : "Register"}
                        </button>



                    </form>
                </div>


            </div>
        </div >
    );
}

export default Authentication;