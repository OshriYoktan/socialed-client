import { Avatar, Button } from '@mui/material'
import './SocialFriends.scss'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { userService } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

export const SocialFriends = (props) => {
    const { loggedinUser, changeUser, edit } = props
    const navigate = useNavigate()


    const removeFriend = (id) => {
        const currUser = { ...loggedinUser }
        const loggedIdx = loggedinUser.friends.findIndex(friend => friend._id === id)
        currUser.friends.splice(loggedIdx, 1)
        userService.queryUser(id)
            .then(res => {
                const friendIdx = res.friends.findIndex(friend => friend._id === loggedinUser._id)
                res.friends.splice(friendIdx, 1)
                userService.update(res)
            })
        changeUser(currUser)
    }

    return (
        <div className='social-friends container'>
            <h3>Friends List</h3>
            {loggedinUser?.friends?.length ?
                loggedinUser.friends.map(friend => (
                    <div key={friend._id} className="friend">
                        <div className="left-side">
                            <Avatar alt={friend.firstName} src={friend.image} />
                            <div className="user-name">
                                <p onClick={() => navigate(`/feed/user/${friend._id}`)}>{friend.firstName} {friend.lastName}</p>
                                <small>{friend.occupation}</small>
                            </div>
                        </div>
                        <div className="right-side">
                            {edit &&
                                <Button onClick={() => removeFriend(friend._id)}><PersonRemoveIcon /></Button>
                            }
                        </div>
                    </div>
                ))
                : ''
            }
        </div>
    )
}
