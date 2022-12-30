import { Avatar, Button } from '@mui/material'
import { useEffect } from 'react'
import { useState } from 'react'
import { userService } from '../../services/userService'
import './Chat.scss'
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';


export const Chat = (props) => {
    const { chatFriend, loggedinUser } = props
    const [currFriend, setCurrFriend] = useState(chatFriend)

    useEffect(() => {
        userService.queryUser(chatFriend._id)
            .then(res => setCurrFriend(res))
    },[])


    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {...currFriend}
        const value = document.querySelector('.message-input').value
        if (value === '') return
        user.messages.push({_id: loggedinUser._id, message:value})
        setCurrFriend(user)
        userService.update(user)
        document.querySelector('.message-input').value = ''
    }

    return (
        <div className='chat'>
            <div className="chat-name">
                <p>{chatFriend.firstName}</p>
            </div>
            <div className="chat-messages">
                <div className="messages">
                    {currFriend.messages?.filter(m => m._id === loggedinUser._id).map((message, idx) => (
                        <div key={idx} className="message">
                            <Avatar src={chatFriend.image} alt={chatFriend.firstName} />
                            <p>{message.message}</p>
                        </div>
                    ))}
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input className='message-input' type="text" placeholder='Send a message...' />
                    <Button type='submit' endIcon={<FileDownloadDoneIcon />}></Button>
                </form>
            </div>

        </div>
    )
}
