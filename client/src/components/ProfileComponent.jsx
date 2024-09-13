import React, { useEffect, useState } from 'react'
import porfile_pic from '../assets/ChatBoxPhoto.jpeg'
import { IoMdClose } from "react-icons/io";

const ProfileComponent = ({profile}) => {

    const [userData, setUserData] = useState(null);
    const [name, setName] = useState('');
    const [update, setUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [_id, setId] = useState('');

    const handleUpdate = async () => {
        await updateUserDetails();
        await getUserDetails();
        setUpdate(false);
    }

    const handleEdit = () => {
        setUpdate(true);
    }

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
        <div className='bg-gray-100 px-12 py-8 rounded-lg shadow-lg w-[650px] h-[650px]  bg-opacity-40'>
            <div onClick={profile} className='w-full pl-[500px]'><IoMdClose className='w-auto h-8 cursor-pointer'/></div>
            <div className='flex flex-col items-center justify-between gap-5'>
                <img src={porfile_pic} alt='Profile Picture' className='w-96 h-96 rounded-full border-4 border-blue-500 mb-6' />
                {!update ? (
                    <div className='flex flex-col items-center'>
                        <h2 className='text-2xl font-semibold text-gray-800'>{userData && userData.name}</h2>
                        <p className='text-lg text-gray-600'>{userData && userData.email}</p>
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

    )
}

export default ProfileComponent
