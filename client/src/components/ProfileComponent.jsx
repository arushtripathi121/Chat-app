import React, { useEffect, useState } from 'react'
import profile_pic from '../assets/user.png'
import { IoMdClose } from "react-icons/io";
import { AiOutlineEdit, AiOutlineMail, AiOutlineSave, AiOutlineUpload, AiOutlineUser } from 'react-icons/ai';
import serverApi from '../constants/api';

const ProfileComponent = ({ profile }) => {

    const [userData, setUserData] = useState(null);
    const [name, setName] = useState('');
    const [update, setUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [_id, setId] = useState('');
    const [uploadImage, setUploadImage] = useState('');

    const handleUpdate = async () => {
        await updateUserDetails();
        await getUserDetails();
        setUpdate(false);
    }

    const handleEdit = () => {
        setUpdate(true);
    }

    const handlePhoto = async () => {
        if (!uploadImage) {
            setErrorMessage('No image selected');
            return;
        }

        const formData = new FormData();
        formData.append('image', uploadImage);
        formData.append('_id', _id);
        try {
            const data = await fetch(`${serverApi}updateUserProfilePicture`, {
                method: 'POST',
                body: formData,
            });

            const res = await data.json();
            console.log(res);

            if (!res.success) {
                setErrorMessage(res.message);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setErrorMessage('Error uploading image');
        }

        await getUserDetails();
    };


    const getUserDetails = async () => {
        const res = await fetch(`${serverApi}getUserDetails`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const data = await res.json();
        setUserData(data.userData);
        setName(data.userData.name);
        setId(data.userData._id);
        console.log(data.userData);
    }

    const updateUserDetails = async () => {
        const res = await fetch(`${serverApi}updateUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id, name })
        })

        const data = await res.json();
        if (data.success == false) {
            setErrorMessage(data.message);
        }
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className='flex justify-center items-center bg-gray-50'>
            {userData ? (
                <div className='bg-white px-8 py-6 rounded-lg shadow-lg w-full max-w-lg bg-opacity-90 border border-orange-300'>
                    <div onClick={profile} className='w-full flex justify-end pr-4'>
                        <IoMdClose className='w-8 h-8 cursor-pointer text-orange-600' />
                    </div>
                    <div className='flex flex-col items-center justify-between gap-6'>
                        <div className='flex flex-col items-center'>
                            {userData.profile_pic ? (
                                <img
                                    src={userData.profile_pic}
                                    alt='Profile Picture'
                                    className='w-40 h-40 rounded-full border-4 border-orange-500 mb-4'
                                />
                            ) : (
                                <img
                                    src={profile_pic}
                                    alt='Profile Picture'
                                    className='w-40 h-40 rounded-full border-4 border-orange-500 mb-4'
                                />
                            )}
                            <div className='flex items-center gap-3'>
                                <input
                                    type='file'
                                    placeholder='Choose photo'
                                    className='border border-gray-300 rounded-lg px-3 py-2'
                                    onChange={e => setUploadImage(e.target.files[0])}
                                />
                                <button
                                    onClick={handlePhoto}
                                    className='bg-orange-500 text-white rounded-lg px-4 py-2 font-semibold shadow-md hover:bg-orange-600 transition duration-300'
                                >
                                    <AiOutlineUpload className='inline-block mr-2' />
                                    Update
                                </button>
                            </div>
                        </div>
                        {!update ? (
                            <div className='flex flex-col items-center gap-2'>
                                <h2 className='text-xl font-semibold text-gray-800'>{userData.name}</h2>
                                <p className='text-md text-gray-600 flex items-center gap-1'>
                                    <AiOutlineMail className='text-gray-500' />
                                    {userData.email}
                                </p>
                                <p className='text-md text-gray-600 flex items-center gap-1'>
                                    <AiOutlineUser className='text-gray-500' />
                                    userName: {userData.userName}
                                </p>
                            </div>
                        ) : (
                            <div className='flex flex-col items-center gap-4'>
                                <input
                                    type='text'
                                    onChange={e => setName(e.target.value)}
                                    placeholder={name}
                                    className='border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-orange-500'
                                />
                            </div>
                        )}
                        {!update ? (
                            <button
                                onClick={handleEdit}
                                className='bg-orange-500 text-white rounded-lg px-6 py-2 font-semibold shadow-md hover:bg-orange-600 transition duration-300'
                            >
                                <AiOutlineEdit className='inline-block mr-2' />
                                Edit Details
                            </button>
                        ) : (
                            <button
                                onClick={handleUpdate}
                                className='bg-orange-500 text-white rounded-lg px-6 py-2 font-semibold shadow-md hover:bg-orange-600 transition duration-300'
                            >
                                <AiOutlineSave className='inline-block mr-2' />
                                Update Details
                            </button>
                        )}
                        {errorMessage && <p className='text-red-600 text-lg'>{errorMessage}</p>}
                    </div>
                </div>
            ) : (
                <p className='text-center text-gray-700'>Loading profile...</p>
            )}
        </div>
    )
}

export default ProfileComponent
