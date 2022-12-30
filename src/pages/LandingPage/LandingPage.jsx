import './LandingPage.scss'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { SignUp } from '../../cmps/SignUp/SignUp';
import { utilService } from '../../services/utilService';
import { userService } from '../../services/userService';


export const LandingPage = () => {
    const navigate = useNavigate();
    const loggedinUser = utilService.storage.loadUserFromStorage()


    useEffect(() => {
        const container = document.getElementById('container')
        if (loggedinUser) container.classList.add("right-panel-active");
        else container.classList.remove("right-panel-active");
    },[])

    const loginAsGuest = () => {
        const guest = utilService.getGuestUser()
        utilService.storage.saveUserToStorage(guest)
        userService.save(guest)
        navigate("/feed")
    }

    return (
        <div className='landing-page'>
            <div className="container"  id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Do you want to log out?</h1>
                        <button className='log-out' onClick={() => { localStorage.clear(); navigate('/') }}>Log out</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                        <SignUp />
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back {loggedinUser?.firstName}!</h1>
                            <p>To keep connected with us please continue with your personal info</p>
                            <button onClick={() => navigate('/feed')} className="ghost" id="signIn">Continue</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>If you dont want to sign up, you can continue as a guest</p>
                            <button onClick={() => loginAsGuest()} className="ghost" id="signUp">Continue</button>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <p>
                    Created with by
                    <a target="_blank" href="https://oshriyoktan.github.io/Portfolio/#/"> Oshri Yoktan </a>
                     My Linkedin is 
                    <a target="_blank" href="https://www.linkedin.com/in/oshri-yoktan/"> here</a>.
                </p>
            </footer>
        </div>
    )
}
