import { Avatar, Button } from '@mui/material'
import { useState } from 'react'
import { Chat } from '../Chat/Chat'
import './Chats.scss'
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const Chats = (props) => {

    const { loggedinUser, setChatModal } = props
    const [queryFriends, setQueryFriends] = useState(loggedinUser.friends)
    const [chatFriend, setChatFriend] = useState(null)

    const searchFriends = (name) => {
        const friends = loggedinUser.friends.filter(f => f.firstName.toLowerCase().includes(name.toLowerCase()))
        setQueryFriends(friends)
    }


    return (
        <div className='chats'>
            <div className="buttons">
                {chatFriend ? <Button startIcon={<ArrowBackIosNewIcon/>} onClick={() => setChatFriend(null)}></Button> : ''}
                <Button onClick={() => setChatModal(false)} startIcon={<CloseIcon />}></Button>
            </div>
            {!chatFriend &&
                <div className="search-friend">
                    <input onChange={(e) => searchFriends(e.target.value)} type="text" placeholder='Who would you like to message...' />
                </div>

            }
            {!chatFriend && queryFriends.length ?
                loggedinUser.friends.map(friend => (
                    <div onClick={() => setChatFriend(friend)} key={friend._id} className="friend">
                        <Button>
                            <Avatar src={friend.image} alt={friend.firstName} />
                            <p>{friend.firstName}</p>
                        </Button>
                    </div>
                ))
                : ''
            }
            {chatFriend && <Chat chatFriend={chatFriend} loggedinUser={loggedinUser} />}

        </div>
    )
}
