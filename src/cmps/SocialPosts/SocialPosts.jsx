import { Avatar, Button } from '@mui/material'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './SocialPosts.scss'
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useForm } from "react-hook-form";
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/userService';
import { utilService } from '../../services/utilService';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';



export const SocialPosts = (props) => {
    const { post, handleLikes, addComment, deletePost, changeUser, loggedinUser, edit } = props
    const [commentsModal, setCommentsModal] = useState(false)
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate()



    const likePost = (post, val) => {
        handleLikes(post, val)

    }

    const onSubmit = (data) => {
        const value = data.comment
        addComment(post, value)
        reset()

    }

    const handleDelete = (post) => {
        post.liked = !post.liked
        deletePost(post)
    }


    const addUser = (user) => {
        const currUser = { ...loggedinUser }
        currUser.friends.push(user)
        // userService.update(currUser)
        userService.queryUser(user._id)
            .then(res => {
                res.friends.push(currUser)
                userService.update(res)
            })

        changeUser(currUser)
        // utilService.storage.saveUserToStorage(currUser)

    }

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
        <div className='social-posts'>
            <div className="post container">
                <div className="post-header">
                    <div className="left-side">
                        <Avatar alt={post.user.image} src={post.user.image} />
                        <div className="post-name">
                            <h4 onClick={() => navigate(`/feed/user/${post.user._id}`)}>{post.user.firstName}</h4>
                            <p>{post.user.location}</p>
                        </div>
                    </div>
                    <div className="right-side">
                        {edit &&
                            loggedinUser._id !== post.user._id ?
                            loggedinUser?.friends?.filter(friend => friend._id === post.user._id).length > 0 ? <Button onClick={() => removeFriend(post.user._id)}><PersonRemoveIcon /></Button> : <Button onClick={() => addUser(post.user)}><PersonAddAlt1Icon /></Button>
                            : ''}
                    </div>
                </div>
                <p>{post.title}</p>
                <div className="post-media">
                    <div className="post-image">
                        <div className="image">
                            {post.image ? <img src={post.image} alt='' /> : ''}
                        </div>
                        <div className="post-buttons">
                            <div className="left-side">
                                <div className="button-section">
                                    {post.liked.includes(loggedinUser._id) ?
                                        <Button onClick={() => likePost(post, -1)}><FavoriteIcon /></Button> :
                                        <Button onClick={() => likePost(post, 1)}><FavoriteBorderIcon /></Button>}
                                    <p>{post.likes}</p>
                                </div>
                                <div className="button-section">
                                    <Button onClick={() => setCommentsModal(!commentsModal)}><ChatBubbleOutlineIcon /></Button>
                                    <p>{post.comments?.length}</p>
                                </div>
                            </div>
                            <div className="right-side">
                                {loggedinUser._id === post.user._id ?
                                    <Button onClick={() => handleDelete(post)}><DeleteIcon /></Button>
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                    {commentsModal &&
                        <div className="comments">
                            <div className="comment-input">
                                <Avatar alt={loggedinUser?.firstName} src={loggedinUser?.image}></Avatar>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <input type="text" {...register('comment')} className='comment' placeholder='Add a comment...' />
                                    <Button type='submit' endIcon={<FileDownloadDoneIcon />}></Button>
                                </form>
                            </div>
                            {post.comments.map(comment => (
                                <div key={comment._id} className="comment">
                                    <div className="comment-user">
                                        <Avatar alt={comment.user.firstName} src={comment.user.image}></Avatar>
                                        <div className="comment-details">
                                            <p>{comment.user.firstName}</p>
                                            <p>{comment.comment}</p>
                                            <Moment fromNow ago>{comment.time}</Moment>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
