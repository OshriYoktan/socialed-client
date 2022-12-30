import './UserDetails.scss'
import Avatar from '@mui/material/Avatar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Button } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { useState } from 'react';
import { userService } from '../../services/userService';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

export const UserDetails = (props) => {
    const { loggedinUser, changeUser,edit,posts } = props
    const [socialModal, setSocialModal] = useState(false)

    const handleChange = (e) => {
        const currUser = { ...loggedinUser }
        // const userPosts = posts.filter(post => post.user._id === currUser._id)
        // userPosts.map(post => (
        //     post.user[e.target.name] = e.target.value
        // ))
        currUser[e.target.name] = e.target.value
        changeUser(currUser)
    }

    const addSocial = (e) => {
        e.preventDefault()
        const currUser = { ...loggedinUser }
        const value = document.querySelector('.social').value
        currUser.social = value
        userService.queryUser(currUser._id)
            .then(res => (
                res.social = value,
                userService.update(res),
                changeUser(res),
                setSocialModal(false)
            ))
        // user.social = value
        // userService.update(user)
        // changeUser(currUser)
        // setSocialModal(false)
    }

    return (
        <div className='user-details container'>
            <div className="user-header">
                <div className="left-side">
                    <Avatar alt={loggedinUser?.firstName} src={loggedinUser?.image} />
                    <div className="user-name">
                        {edit ? 
                        <input type="text" onChange={(e) => handleChange(e)} name='firstName' value={loggedinUser?.firstName} />
                        : <p>{loggedinUser.firstName}</p>
                    }
                        <small> {loggedinUser?.friends?.length} Friends</small>
                    </div>
                </div>
            </div>
            <div className="user-info">
                <div className="user-location user-section">
                    <LocationOnIcon></LocationOnIcon>
                    {edit ? 
                    <input type="text" onChange={(e) => handleChange(e)} name='location' placeholder='Enter Your Location' value={loggedinUser?.location} />
                        : <p>{loggedinUser?.location}</p>
                }
                </div>
                <div className="user-section">
                    <WorkOutlineIcon></WorkOutlineIcon>
                    {edit ?
                    <input type="text" onChange={(e) => handleChange(e)} name='occupation' placeholder='Enter your occupation' value={loggedinUser?.occupation} />
                    : <p>{loggedinUser?.occupation? loggedinUser.occupation : 'Empty...'}</p>
                }
                </div>
            </div>
            <div className="user-followers">
                <div className="user-follow user-section">
                    <p>Total Posts:</p>
                    {loggedinUser?.posts?.length? loggedinUser?.posts.length : 0 }
                </div>
                <div className="user-follow user-section">
                    <p>Total Likes:</p>
                    {loggedinUser?.likes}
                </div>
            </div>
            <div className="user-social">
                <h3>Social Profile</h3>
                {loggedinUser?.social ?
                    <div className="social-section">
                        <div className="left-side">
                            <LinkedInIcon></LinkedInIcon>
                            {socialModal ?
                                <form onSubmit={(e) => addSocial(e)} >
                                    <input name='social' className='social' type="text" defaultValue={loggedinUser?.social} />
                                    <Button type='submit' endIcon={<FileDownloadDoneIcon/>}></Button>
                                </form> :
                                edit ?
                                <div onClick={() => setSocialModal(true)} className="social-media">
                                    <p>Linkedin</p>
                                    <small>Social Network</small>
                                </div>
                                : <div className="social-media">
                                <p>Linkedin</p>
                                <small>Social Network</small>
                            </div>
                            
                            }
                            <div className="right-side">
                            <Button href={loggedinUser?.social} target='_blank' ><LaunchIcon /></Button>
                        </div>
                        </div>
                        
                    </div>
                    :
                    edit ?
                    <form onSubmit={(e) => addSocial(e)} >
                        <input name='social' className='social' type="text" placeholder='Enter Your Linkedin...' />
                        <Button type='submit' endIcon={<FileDownloadDoneIcon/>}></Button>
                    </form>
                    : <p>{loggedinUser?.social}</p>
                }
            </div>
        </div>
    )
}
