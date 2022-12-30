import { Avatar, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { SocialPosts } from '../SocialPosts/SocialPosts'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import './SocialUpload.scss'
import { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone'
import { Cloudinary } from '../Cloudinary/Cloudinary';

export const SocialUpload = (props) => {
    const { loggedinUser, posts, addPost, handleLikes, addComment, deletePost, changeUser } = props
    const { register, handleSubmit, reset } = useForm();
    const [imageModal, setImageModal] = useState(false)
    const [image, setImage] = useState(null)



    const onSubmit = (data, e) => {
        data.image = image
        addPost(data)
        reset()
    }
    const onError = (errors, e) => console.log(errors, e);

    const getImageFromCloudinary = (image) => {
        setImage(image)
    }


    return (
        <div className='social-posts'>
            <form onSubmit={handleSubmit(onSubmit, onError)} className="upload-section container">
                <div className="text-area">
                    <Avatar alt={loggedinUser?.firstName} src={loggedinUser?.image} />
                    <input {...register('postTitle')} type="text" placeholder='What`s on your mind...' />
                </div>
                {imageModal &&
                    <Cloudinary id='cloud' getImageFromCloudinary={getImageFromCloudinary} />
                }
                <div className="attach-links">
                    <div className="link">
                        <Button onClick={() => setImageModal(!imageModal)} type='button' startIcon={<AddPhotoAlternateOutlinedIcon />}>Image / Clip</Button>
                    </div>
                    <div className="link">
                        <Button className='post-btn' type='submit'>Post</Button>
                    </div>
                </div>
            </form>
            {posts ?
                posts.map(post => (
                    <SocialPosts edit={true} key={post._id} loggedinUser={loggedinUser} changeUser={changeUser} deletePost={deletePost} addComment={addComment} handleLikes={handleLikes} post={post}></SocialPosts>
                )) : 'loading'
            }
        </div>
    )
}
