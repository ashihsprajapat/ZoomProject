//import React from 'react
import { Link } from 'react-router-dom';


export function Landing() {
    return (
        <div className="landingPageContainer">
            <nav>
                <div className="navHeader">
                    <h2> Start Video Call</h2>
                </div>
                <div className="navList">
                    <p>Join as Guest</p>
                    <p>Register</p>
                    <div role="button">
                        <p>Login</p>
                    </div>

                </div>
            </nav>
            <div className="landingMainCotainer">
                <div>
                    <h1><span style={{ color: "yellow" }}>Connect  </span> with your loved ones</h1>
                    <p>
                        Cover a distance by Zoom Video Call
                    </p>
<br /> <br />
                    <div role='button'>
                        <Link className='landingButton' to={"/auth"}> Get Start</Link>
                    </div>
                </div>
                <div>
                    <img className="landingImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2sdkyhm3jdW871t6s1tDQhFbXj0G_2Y2xdA&s" alt="" />
                </div>
            </div>
        </div>
    )
}