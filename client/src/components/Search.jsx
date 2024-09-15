import React, { useEffect, useState } from 'react'
import profile_pic from '../assets/user.png';
import { IoMdClose } from 'react-icons/io';

const Search = ({ setUserData }) => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

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
        <div className=''>
            <div className='h-[15svh] bg-white border-b border-orange-300'>
                <p className='text-2xl text-orange-600 font-semibold px-5 pt-5 pb-5'>Chats</p>
                <p className='px-5 flex flex-row items-center bg-gray-100'>
                    <input
                        type='text'
                        onChange={e => setQuery(e.target.value)}
                        className='w-full outline-none px-3 py-2 text-lg font-medium rounded-lg bg-gray-100 border'
                        placeholder='Search or start a new chat'
                    />
                    <IoMdClose className='w-5 h-5 text-orange-600' onClick={closeResults} />
                </p>
            </div>
            {searchResults && query &&
                <div className='border border-orange-600 max-w-[350px] max-h-[500px] bg-white bg-opacity-90 rounded-lg absolute top-[15svh] left-12 right-0 mx-5 overflow-y-auto component-with-scrollbar flex flex-col items-center'>
                    {searchResults.map(m => (
                        <div key={m._id} className='flex flex-row items-center justify-between w-full px-2 py-2 border-b border-orange-300 cursor-pointer hover:bg-orange-200' onClick={() => setUserData(m)}>
                            <img src={m.profile_pic ? m.profile_pic : profile_pic} className='w-32 h-32 rounded-full' />
                            <div className='flex flex-col items-center'>
                                <p className='text-xl text-orange-600'>{m.name}</p>
                                <p className='text-xl text-orange-600'>{m.userName}</p>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Search
