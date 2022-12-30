import { Avatar } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '../../cmps/Header/Header'
import { SocialFriends } from '../../cmps/SocialFriends/SocialFriends'
import { SocialPosts } from '../../cmps/SocialPosts/SocialPosts'
import { UserDetails } from '../../cmps/UserDetails/UserDetails'
import { postService } from '../../services/postService'
import { userService } from '../../services/userService'
import { utilService } from '../../services/utilService'
import './UserProfile.scss'

export const UserProfile = () => {

    const [currUser, setCurrUser] = useState(null)
    const [userPosts, setUserPosts] = useState(null)
    const [theme, setTheme] = useState(utilService.storage.loadThemeFromStorage())
    const { id } = useParams()
    const [loggedinUser, setLoggedinUser] = useState(utilService.storage.loadUserFromStorage())

    useEffect(() => {
        async function fetchUsers() {
            const user = await userService.queryUser(id)
            setCurrUser(user)
        }
        fetchUsers()

    }, [])

    useEffect(() => {
        postService.query('')
            .then(posts => {
                const res = posts.filter(post => post.user._id === id)
                setUserPosts(res)
            })
            .catch(err => console.log('Error', err))
    }, [])

    const addComment = (post, comment) => {
        post.comments.push({ _id: utilService.makeId(), comment: comment, time: Date.now(), user: { firstName: loggedinUser.firstName, image: loggedinUser.image } })
        const idx = userPosts.findIndex(p => p._id === post._id)
        postService.save(post)
            .then(res => {
                userPosts.splice(idx, 1, res)
                setUserPosts([...userPosts])
            })
    }


    const handleLikes = (post, val) => {
        currUser.likes += val
        if(!post.liked.includes(loggedinUser._id))post.liked.push(loggedinUser._id)
        else {
            const idx = post.liked.findIndex(p => p === loggedinUser._id)
            post.liked.splice(idx,1)
        }
        post.likes += val
        userService.update(currUser)
        const postIdx = userPosts.findIndex(p => p._id === post._id)
        postService.save(post)
            .then(res => {
                userPosts.splice(postIdx, 1, res)
                setUserPosts([...userPosts])
            })
        if (post.user._id === loggedinUser._id) {
            utilService.storage.saveUserToStorage(currUser)
            userService.update(currUser)
            setLoggedinUser(currUser)
        }
    
    }


    const deletePost = (post) => {
        const idx = userPosts.findIndex(p => p._id === post._id)
        userPosts.splice(idx, 1)
        setUserPosts([...userPosts])
        postService.remove(post._id)
        currUser.posts.splice(idx,1)
        currUser.likes -= post.likes
        userService.update(currUser)
        setCurrUser({...currUser})
        if (loggedinUser._id === post.user._id) {
            utilService.storage.saveUserToStorage(currUser)
        }
    }

    const removeFriend = (id) => {
        console.log('s');
        // const newUser = {...loggedinUser}
        // const loggedIdx = newUser.friends.findIndex(friend => friend._id === id)
        
    }

    const addFriend = () => {
        console.log('s');
        // const newUser = {...loggedinUser}
        // currUser.friends.push(newUser)
        // newUser.friends.push(currUser)
        // userService.update(currUser)
        // setLoggedinUser(newUser)
        // utilService.storage.saveUserToStorage(newUser)
    }

    const searchPosts = (value) => {
        postService.query(value)
            .then(posts => {
                setUserPosts(posts)
            })
            .catch(err => console.log('Error', err))

    }


    const changeTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
            utilService.storage.saveThemeToStorage('dark')
        }
        else {
            setTheme('light')
            utilService.storage.saveThemeToStorage('light')
        }
    }

    return (
        <div id={theme} className='user-profile'>
            <Header searchPosts={searchPosts} changeTheme={changeTheme} />
            {currUser ?
                <div className="user">
                    <div className="user-image">
                        <Avatar src={currUser.image} alt={currUser.firstName + ' ' + currUser.lastName} />
                    </div>
                    <div className="user-info">
                        <div className="user-details">
                            <UserDetails edit={false} loggedinUser={currUser} />
                        </div>
                        <div className="user-posts">
                            {userPosts?.length ? userPosts?.map(post => (
                                <SocialPosts  deletePost={deletePost} edit={false} addComment={addComment} handleLikes={handleLikes}  key={post._id} post={post} loggedinUser={loggedinUser} ></SocialPosts>
                            )) : <h1>No Posts Yet</h1>}
                        </div>
                        <div className="user-friends">
                            <SocialFriends edit={false} changeUser={removeFriend} loggedinUser={currUser} />
                        </div>
                    </div>
                </div>
                :
                ''}

        </div>
    )
}