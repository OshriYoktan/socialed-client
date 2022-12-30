import './SignUp.scss'
import { useForm } from "react-hook-form";
import { utilService } from '../../services/utilService';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import { userService } from '../../services/userService';
import { Cloudinary } from '../Cloudinary/Cloudinary';

export const SignUp = () => {
    const { register, handleSubmit, reset } = useForm();
    const [image,setImage] = useState(null)
    const navigate = useNavigate()


    const getImageFromCloudinary = (image) => {
        setImage(image)
    }

    const onSubmit = (data, e) => {
        data.image = image
        data._id = utilService.makeId()
        data.friends = []
        data.posts = []
        data.messages = []
        data.likes = 0
        data.social = ''
        userService.save(data)
        utilService.storage.saveUserToStorage(data)
        navigate('/feed')
        reset()
    }
    const onError = (errors, e) => console.log(errors, e);
    return (
        <div className='sign-up'>
            <form onSubmit={handleSubmit(onSubmit, onError)} className='sign-up'>
                <h1>Sign up</h1>
                <div className="sign-up-name">
                    <input type="text" name='firstName' {...register('firstName')} placeholder='First name' />
                    <input type="text" name='lastName' {...register('lastName')} autoComplete='off' placeholder='Last name' />
                </div>
                <input type="password" name='pasword' {...register('password')} autoComplete='off' placeholder='Password' />
                <input type="email" name='email' {...register('email')} placeholder='Email' />
                <Cloudinary getImageFromCloudinary={getImageFromCloudinary} />
                <input type="text" name='location' {...register('location')} placeholder='Location' />
                <input type="text" name='occupation' {...register('occupation')} placeholder='Occupation' />
                <button>Sign Up!</button>
            </form>
        </div>
    )
}
