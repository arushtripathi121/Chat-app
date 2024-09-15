import React, { useEffect, useState } from 'react'
import profile_pic from '../assets/user.png';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';

const Search = ({ setUserData }) => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const onlineUser = useSelector(state => state.user?.onlineUser);

    const search = async () => {
        const res = await fetch('http://localhost:5000/searchUser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query })
        })

        const data = await res.json();
        setSearchResults(data.data);
        console.log(searchResults);

    }

    const closeResults = () => {
        setSearchResults([]);
        setQuery('');
    }

    useEffect(() => {

        if (query == '') {
            setSearchResults([]);
        }
        const timer = setTimeout(() => {
            if (query.length >= 2) {
                search();
            }
        }, 1000)
    }, [query])

    return (
        <div className='flex flex-col py-5'>
            <div className='h-[10svh] bg-white px-4 md:px-5'>
                <p className='text-xl md:text-2xl text-orange-600 font-semibold py-2'>Chats</p>
                <div className='flex items-center bg-gray-100 rounded-lg px-2 md:px-4'>
                    <input
                        type='text'
                        onChange={e => setQuery(e.target.value)}
                        className='w-full outline-none px-3 py-2 text-base md:text-lg rounded-lg bg-gray-100'
                        placeholder='Search or start a new chat'
                    />
                    <IoMdClose className='w-5 h-5 text-orange-600 cursor-pointer ml-2' onClick={closeResults} />
                </div>
            </div>

            {searchResults.length > 0  && (
                <div className='border border-orange-600 bg-white bg-opacity-90 rounded-lg mt-2 mx-2 md:mx-4 max-w-full max-h-[75svh] md:max-h-[80svh] overflow-y-auto flex flex-col'>
                    {searchResults.map(m => (
                        <div
                            key={m._id}
                            className='flex items-center justify-between w-full px-4 py-3 cursor-pointer hover:bg-orange-200 transition-colors duration-200'
                            onClick={() => setUserData(m)}
                        >
                            <div className='relative flex items-center'>
                                <img
                                    src={m.profile_pic ? m.profile_pic : profile_pic}
                                    className='w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border-2 border-orange-300 object-cover'
                                    alt={`${m.name}'s profile`}
                                />
                                {onlineUser && onlineUser.includes(m._id) && (
                                    <span className='absolute bottom-1 right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 border-2 border-white rounded-full'></span>
                                )}
                            </div>
                            <div className='flex flex-col items-start ml-3'>
                                <p className='text-md md:text-lg font-semibold text-orange-600'>{m.name}</p>
                                <p className='text-sm md:text-md text-orange-600 opacity-75'>{m.userName}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Search
