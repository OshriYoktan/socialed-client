import './Header.scss'
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import LightModeIcon from '@mui/icons-material/LightMode';
import ChatIcon from '@mui/icons-material/Chat';
import { Avatar, IconButton, InputAdornment, TextField } from '@mui/material';
import { utilService } from '../../services/utilService';
import { useNavigate } from 'react-router-dom';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useEffect, useRef, useState } from 'react';
import { Cloudinary } from '../Cloudinary/Cloudinary';
import { Chats } from '../Chats/Chats';
import Search from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';



export const Header = (props) => {
    const { changeTheme, searchPosts, changeUser } = props
    const loggedinUser = utilService.storage.loadUserFromStorage()
    const theme = utilService.storage.loadThemeFromStorage()
    const [image, setImage] = useState(loggedinUser.image)
    const navigate = useNavigate()
    const [profileModal, setProfileModal] = useState(false)
    const [chatModal, setChatModal] = useState(false)
    const [mobileBtns, setMobileBtns] = useState(false)
    const refOne = useRef()

    const useOnClickOutside = (ref, handler) => {
        useEffect(
            () => {
                const listener = (event) => {
                    if (!ref.current || ref.current.contains(event.target)) {
                        return;
                    }
                    handler(event);
                };
                document.addEventListener("mousedown", listener);
                document.addEventListener("touchstart", listener);
                return () => {
                    document.removeEventListener("mousedown", listener);
                    document.removeEventListener("touchstart", listener);
                };
            },
            [ref, handler]
        );
    }

    const chatRef = useRef()
    useOnClickOutside(chatRef, () => setChatModal(false));

    const userRef = useRef()
    useOnClickOutside(userRef, () => setProfileModal(false));
    
    const mobileRef = useRef()
    useOnClickOutside(mobileRef, () => setMobileBtns(false));




    // document.addEventListener('mouseup', function (e) {
    //     var container = document.getElementById('box');
    //     if (!container.contains(e.target)) {
    //         container.style.display = 'none';
    //     }
    // });
    // document.addEventListener('mouseup', function (e) {
    //     var container = document.getElementById('box2');
    //     if (!container.contains(e.target)) {
    //         container.style.display = 'none';
    //     }
    // });
    // document.addEventListener('mouseup', function (e) {
    //     var container = document.getElementById('box3');
    //     if (!container.contains(e.target)) {
    //         container.style.display = 'none';
    //     }
    // });




    const getImageFromCloudinary = (image) => {
        const currUser = { ...loggedinUser }
        setImage(image)
        currUser.image = image
        changeUser(currUser)
    }

    const showHiddenButtons = () => {
        const hiddenContainer = document.getElementById('hidden-btns')
        hiddenContainer.style.display = 'block'
    }

    return (
        <div className='header container'>
            <nav>
                <div className="left-side">
                    <div className='logo' onClick={() => (navigate('/feed'))}>LOGO</div>
                    <div className="filter">
                        <TextField onChange={(e) => searchPosts(e.target.value)} id="outlined-basic" label="Search..." variant="outlined" />
                    </div>
                </div>
                <div className="right-side">
                    <Button onClick={() => changeTheme()}>{theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />} </Button>
                    <Button onClick={() => setChatModal(!chatModal)}><ChatIcon /></Button>
                    <Button onClick={() => setProfileModal(!profileModal)}><Avatar alt={loggedinUser?.firstName} src={loggedinUser?.image} /></Button>
                </div>
                <Button onClick={() => setMobileBtns(!mobileBtns)} className='burger' startIcon={<MenuIcon />}></Button>
            </nav>
            {mobileBtns &&
                <div id='box3' ref={mobileRef} className='mobile-btns'>
                    <Button onClick={() => changeTheme()}>{theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />} </Button>
                    <Button onClick={() => setChatModal(!chatModal)}><ChatIcon /></Button>
                    <Button onClick={() => setProfileModal(!profileModal)}><Avatar alt={loggedinUser?.firstName} src={loggedinUser?.image} /></Button>
                </div>
            }
            {profileModal && <div ref={userRef} id='box' className="profile-modal">
                <Button onClick={() => navigate('/')}>Log Out</Button>
                <Cloudinary getImageFromCloudinary={getImageFromCloudinary} />
            </div>
            }
            {chatModal &&
                <div ref={chatRef} id='box2'>
                    <Chats loggedinUser={loggedinUser} setChatModal={setChatModal} />
                </div>
            }
        </div>
    )
}
