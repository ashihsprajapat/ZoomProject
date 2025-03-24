//import React from 'react
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import VideocamIcon from '@mui/icons-material/Videocam';


export function Landing() {
    const navigate = useNavigate("");
    return (
        <div className="landingPageContainer ">
            <nav>
                <div className="navHeader">
                    <h2> Start Video Call <VideocamIcon sx={{ fontSize: "3rem", color: "yellow" }} /> </h2>
                </div>
                <div className="navList">
                    <Button variant='text' color='white' sx={{ textTransform: 'none' }} >Join as Guest</Button>
                    <Button variant='text' color='white' sx={{ textTransform: 'none' }} >Register</Button>

                    <Button variant='contained' sx={{ textTransform: 'none' }} >Login<ArrowRightAltIcon /> </Button>


                </div>
            </nav>
            <div className="landingMainCotainer container row ">
                <div className=' m-auto col-lg-5 col-md-6 col-sm-10 ' >
                    <h1 className='mb-3'><span style={{ color: "yellow" }}>Connect  </span> with your loved ones</h1>
                    <p className='mb-4'>
                        Cover a distance by Zoom Video Call
                    </p>


                    <Button size='large' color="success" variant='contained'
                        onClick={() => navigate("/auth")} >Get Start</Button>

                </div>
                <div className='col-lg-5 col-md-6 col-sm-10 '>
                    <img className="landingImg"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2sdkyhm3jdW871t6s1tDQhFbXj0G_2Y2xdA&s"
                        alt="" />
                </div>
            </div>
        </div>
    )
}