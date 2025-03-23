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
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function Authentication() {
    const navigate = useNavigate("");

    let handleSubmit = (event) => {
        event.preventDefault();
        setName("");
        setPassword('');
        setUserName('');
        console.log(userInfo)
    }

    let [currState, setCurrState] = useState(0);
    let [name, setName] = useState("");
    let [userName, setUserName] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState();
    let [message, SetMessage] = useState();
    let [open, setOpen] = useState(false);

    const { handleRegister, handleLogin } = useContext(AuthContext)



    let handleAuth = async (e) => {
        e.preventDefault();
        console.log(name, password, userName);
        try {
            if (currState == 0) {
                //login
                let result = await handleLogin(userName, password);

                console.log("in authentication file", result);

                if (result.data.success) {
                    toast.success(result)
                    setUserName("");
                    setError("");
                    setPassword("");
                    navigate("/home")
                } else {
                    setError(request.data.message);
                }


            } else
                if (currState === 1) {
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
                    }else{
                        setError(result.message)
                        toast.error("ok")
                    }


                }
        } catch (err) {
            toast.error(err)
            console.log(err)
            return;

        }
    }



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
        <div className="m-5">
            <div className="authentiactionPage mt-3  m-auto p-5" style={{ borderRadius: "2rem", backgroundColor: "gray" }}>
                <h2>You need to Login <HttpsIcon sx={{ color: "black", fontSize: "2rem" }} /> </h2>
                <Button className="m-2" variant={currState == 0 ? "contained" : "text"} onClick={() => { setCurrState(0) }} >
                    Log in
                </Button>
                <Button className="m-2" variant={currState == 1 ? "contained" : "text"} onClick={() => { setCurrState(1) }}>
                    Register
                </Button>
                <div>
                    <form className=" needs-validation" >


                        {currState == 1 && (<TextField
                            sx={{ fontSize: "1rem" }}
                            id="outlined-multiline-flexible"
                            label="Full Name"
                            fullWidth
                            required
                            margin="normal"
                            onChange={(e) => { setName(e.target.value) }}
                            size="small"
                            value={name}
                        />)} <br />
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
                        /> <br />

                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                size="small"
                                required
                                fullWidth
                                onChange={(e) => { setPassword(e.target.value) }}
                                value={password}
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


                        <br />
                        {
                            currState == 0 && <p className="forgotPassword" style={{ color: "blue" }} onClick={() => navigate("/reset-password")} >Forgot Password</p>
                        }
                        <p style={{ color: "red" }}>
                            {error}
                        </p>
                        <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                                <label className="form-check-label" htmlFor="invalidCheck">
                                    Agree to terms and conditions
                                </label>
                                <div className="invalid-feedback">
                                    You must agree before submitting.
                                </div>
                            </div>
                        </div>
                        <Button type="submit" variant="outlined" onClick={handleAuth}  >
                            {currState == 0 ? "Sign in" : "Register"}
                        </Button>



                    </form>
                </div>
                {/* <Snackbar
                    open={open}
                    autoHideDuration={4000}
                    message={message}
                /> */}

            </div >
        </div >
    );
}

export default Authentication;