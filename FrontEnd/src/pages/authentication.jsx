import { useContext, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AuthContext } from './../contexts/AuthContext';
import { Snackbar } from "@mui/material";

function Authentication() {


    let [userInfo, setUserInfo] = useState({
        fullName: "",
        username: "",
        password: "",
    })
    // let handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setUserInfo((prev) => ({ ...prev, [name]: value }));
    // }
    let handleSubmit = (event) => {
        event.preventDefault();
        setUserInfo({
            fullName: name,
            username: userName,
            password: password,
        })
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

    // useEffect(() => {
    //     console.log(userInfo);
    // }, [userInfo]);

    let handleAuth = async () => {
        try {
            if (currState == 0) {
                //login
                await handleLogin(userName,password);
                
            }
            if (currState == 1) {
                //register
                let result=await handleRegister(name,userName,password);
                console.log(result);
                SetMessage(result);
                setOpen(true);
                setCurrState(0);
                setUserName("");
                setError("");
                setPassword("");
            }
        } catch(err) {
            console.log(err)
            setError("user Register");
            return ;
            //let message=err.response.data.message;
            
        }
    }





    return (
        <>
            <div>
                <h2>Authentications</h2>
                <Button variant={currState == 0 ? "contained" : ""} onClick={() => { setCurrState(0) }} >
                    Log in
                </Button>
                <Button variant={currState == 1 ? "contained" : ""} onClick={() => { setCurrState(1) }}>
                    Register
                </Button>
                {/* <form onSubmit={handleSubmit}> */}
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <div>
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
                        <TextField
                            id="outlined-textarea"
                            label="password"
                            required
                            type="password"
                            onChange={(e) => { setPassword(e.target.value) }}
                            size="small"
                            value={password}
                            placeholder="password"
                            multiline
                        /> <br />
                        <p style={{ color: "red" }}>
                            {error}
                        </p>
                        <Button type="submit" variant="outlined" onClick={handleAuth}   >
                            {currState == 0 ? "Sign in" : "Register"}
                        </Button>

                    </div>


                </Box>
                <Snackbar
                    open={open}
                    autoHideDuration={4000}
                    message={message}
                />

            </div >
        </>
    );
}

export default Authentication;