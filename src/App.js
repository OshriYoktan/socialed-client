import { useEffect, useState } from 'react'
import './App.scss'
import { Header } from './cmps/Header/Header'
import { SocialFriends } from './cmps/SocialFriends/SocialFriends'
import { SocialUpload } from './cmps/SocialUpload/SocialUpload'
import { UserDetails } from './cmps/UserDetails/UserDetails'
import { postService } from './services/postService'
import { userService } from './services/userService'
import { utilService } from './services/utilService'

export const App = () => {
    const [loggedinUser, setLoggedinUser] = useState(utilService.storage.loadUserFromStorage())
    const [theme, setTheme] = useState(utilService.storage.loadThemeFromStorage())
    const [posts, setPosts] = useState(null)
    const [users, setUsers] = useState(null)

    useEffect(() => {
        postService.query('')
            .then(posts => {
                setPosts(posts)
            })
            .catch(err => console.log('Error', err))
        userService.query('')
            .then(users => {
                setUsers(users)

            })
            .catch(err => console.log('Error', err))
    }, [])


    const searchPosts = (value) => {
        postService.query(value)
            .then(posts => {
                setPosts(posts)
            })
            .catch(err => console.log('Error', err))
    }


    const changeUser = (currUser) => {
        const editedUser = { ...currUser }
        // const userPosts = posts.filter(post => post.user._id === currUser._id)
        // userPosts.map(post => (
        //     post.user.image = currUser.image
            
        // ))
        setLoggedinUser(editedUser)
        utilService.storage.saveUserToStorage(editedUser)
        userService.update(editedUser)
    }



    const add = (data) => {
        const post = {
            title: data.postTitle,
            image: data.image ? data.image : null,
            user:
            {
                _id: loggedinUser ? loggedinUser._id : 'Guest',
                image: loggedinUser ? loggedinUser.image : 'null',
                firstName: loggedinUser ? loggedinUser.firstName : 'Guest #01',
                lastName: loggedinUser ? loggedinUser.lastName : 'Guest #01',
                occupation: loggedinUser?.occupation,
                location: 'israel'
            },
            likes: 0,
            liked: [],
            comments: [],

        }
        const currUser = { ...loggedinUser }
        currUser.posts.push(post)
        setLoggedinUser(currUser)
        utilService.storage.saveUserToStorage(currUser)
        userService.update(currUser)
        postService.save(post)
            .then(res => {
                post._id = res._id
                posts.push(res)
                setPosts([...posts])
            })
    }


    const deletePost = (post) => {
        const postUser = userService.queryUser(post.user._id)
        const idx = posts.findIndex(p => p._id === post._id)
        posts.splice(idx, 1)
        setPosts([...posts])
        postService.remove(post._id)
        postUser.likes -= post.likes
        // userService.update(postUser)
        if (loggedinUser._id === post.user._id) {
            loggedinUser.likes -= post.likes
            const idx = loggedinUser.posts.findIndex(p => p._id === post._id)
            loggedinUser.posts.splice(idx, 1)
            utilService.storage.saveUserToStorage(loggedinUser)
            userService.update(loggedinUser)
        }
    }


    const handleLikes = (post, val) => {
        const postUser = users.find(u => u._id === post.user._id)
        postUser.likes += val
        if (!post.liked.includes(loggedinUser._id)) post.liked.push(loggedinUser._id)
        else {
            const idx = post.liked.findIndex(p => p === loggedinUser._id)
            post.liked.splice(idx, 1)
        }
        post.likes += val
        userService.update(postUser)
        const idx = posts.findIndex(p => p._id === post._id)
        postService.save(post)
            .then(res => {
                posts.splice(idx, 1, res)
                setPosts([...posts])
            })
        if (post.user._id === loggedinUser._id) {
            const currUser = { ...loggedinUser }
            currUser.likes += val
            utilService.storage.saveUserToStorage(currUser)
            userService.update(currUser)
            setLoggedinUser(currUser)
        }
    }



    const addComment = (post, comment) => {
        post.comments.push({ _id: utilService.makeId(), comment: comment, time: Date.now(), user: { firstName: loggedinUser.firstName, image: loggedinUser.image } })
        const idx = posts.findIndex(p => p._id === post._id)
        postService.save(post)
            .then(res => {
                posts.splice(idx, 1, res)
                setPosts([...posts])
            })
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
        <div className='app' id={theme} >
            <Header searchPosts={searchPosts} changeUser={changeUser} changeTheme={changeTheme} />
            <div className="social-app">
                <UserDetails posts={posts} edit={true} users={users} changeUser={changeUser} loggedinUser={loggedinUser}></UserDetails>
                <SocialUpload loggedinUser={loggedinUser} changeUser={changeUser} deletePost={deletePost} addComment={addComment} posts={posts} handleLikes={handleLikes} addPost={add} ></SocialUpload>
                <SocialFriends changeUser={changeUser} edit={true} loggedinUser={loggedinUser}></SocialFriends>
            </div>
        </div>
    )
}