import React, { useEffect, useState } from 'react'
import profile_pic from '../assets/user.png'
import { IoMdClose } from "react-icons/io";

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
            const data = await fetch('http://localhost:5000/updateUserProfilePicture', {
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
        const res = await fetch('http://localhost:5000/getUserDetails', {
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
    }

    const updateUserDetails = async () => {
        const res = await fetch('http://localhost:5000/updateUser', {
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
        <div>{userData ?
            <div className='bg-slate-300 px-12 py-8 rounded-lg shadow-lg w-[700px] h-[750px]  bg-opacity-90'>

                <div onClick={profile} className='w-full pl-[600px]'><IoMdClose className='w-auto h-8 cursor-pointer' /></div>
                <div className='flex flex-col items-center justify-between gap-5'>

                    <div className='flex flex-col pt-4 items-center'>
                        {userData.profile_pic != null ? <img src={userData.profile_pic} alt='Profile Picture' className='w-96 h-96 rounded-full border-4 border-blue-500 mb-6' />
                            :
                            <img src={profile_pic} alt='Profile Picture' className='w-96 h-96 rounded-full border-4 border-blue-500 mb-6' />
                        }
                        <p className='flex items-center'>
                            <input type='file' placeholder='Chose photo' onChange={e => setUploadImage(e.target.files[0])} />
                            <button onClick={handlePhoto} className='bg-blue-500 text-white rounded-lg px-6 py-2 font-semibold shadow-md hover:bg-blue-600 transition duration-300'>Update</button>
                        </p>
                    </div>
                    {!update ? (
                        <div className='flex flex-col items-center'>
                            <h2 className='text-2xl font-semibold text-gray-800'>{userData && userData.name}</h2>
                            <p className='text-lg text-gray-600'>{userData && userData.email}</p>
                            <p className='text-lg text-gray-600'>userName : {userData && userData.userName}</p>
                        </div>
                    ) : (
                        <div className='flex flex-col items-center gap-4'>
                            <input type='text' onChange={e => setName(e.target.value)} placeholder={`${name}`} className='border border-gray-300 rounded-lg px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500' />
                        </div>
                    )}

                    {!update ?
                        <button onClick={handleEdit} className='bg-blue-500 text-white rounded-lg px-6 py-2 font-semibold shadow-md hover:bg-blue-600 transition duration-300'>
                            Edit Details
                        </button>
                        :
                        <button onClick={handleUpdate} className='bg-blue-500 text-white rounded-lg px-6 py-2 font-semibold shadow-md hover:bg-blue-600 transition duration-300'>
                            Update Details
                        </button>
                    }

                    {errorMessage && <p className='text-red-600 text-lg'>{errorMessage}</p>}
                </div>
            </div>
            :
            <p className='text-center'>Loading profile</p>
        }
        </div>

    )
}

export default ProfileComponent
