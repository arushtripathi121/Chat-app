import React, { useEffect } from 'react'
import { AiOutlineSend } from "react-icons/ai";
import profile_pic from '../assets/user.png'
import { useSelector } from 'react-redux';
const ChatBox = ({ data }) => {
  const onlineUser = useSelector(state => state?.user?.onlineUser);
  const socketConnection = useSelector(state => state.user?.socketConnection);

  useEffect(() => {
    if(socketConnection) {
      console.log(data);
      // socketConnection.emit('message', data._id);
    }
  }, [data, socketConnection ])
  return (
    <main className='flex flex-col h-screen w-full'>
      {data ? (
        <div className='flex flex-col h-full w-full'>
          <section className='flex items-center border border-gray-300 rounded-lg shadow-md bg-orange-100 px-5 py-3 w-full'>
            <img
              src={data.profile_pic ? data.profile_pic : profile_pic}
              alt="Profile"
              className='w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border border-orange-300'
            />
            <div className='ml-4'>
              <p className='font-semibold text-gray-800 text-md md:text-lg'>{data.name}</p>
              <p className='text-sm text-gray-600'>{data.userName}</p>
              <p className='text-sm text-green-600'>
                {onlineUser && onlineUser.includes(data._id) && 'online'}
              </p>
            </div>
          </section>

          <section className='flex-grow overflow-y-auto bg-white p-4 w-full'>
          </section>


          <section className='bg-gray-50 border-t border-gray-200 p-4 flex items-center w-full'>
            <div className='flex-grow flex items-center gap-4'>
              <input
                type='text'
                placeholder='Write your message...'
                className='flex-grow outline-none px-4 py-2 text-base md:text-lg rounded-lg border border-gray-300 bg-gray-100 bg-opacity-50 font-medium'
              />
              <button className='px-4 py-2 bg-orange-600 rounded-full shadow hover:bg-orange-700 transition duration-300'>
                <AiOutlineSend className='h-6 w-6 md:h-7 md:w-7 text-white' />
              </button>
            </div>
          </section>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-orange-50">
          <div className="text-center p-8 bg-white shadow-xl rounded-lg border border-orange-200 max-w-xl mx-4 w-full">
            <p className="text-2xl font-bold text-orange-600 mb-4">Start chatting with Chatterly</p>
            <p className="mb-4 text-gray-700">
              Connect with friends and colleagues effortlessly. Chatterly makes communication simple and fun!
            </p>
            <p className="mb-4 text-gray-700">
              Create new conversations, stay updated, and keep your chats organized. Dive into the conversation now!
            </p>
            <p className="mb-4 text-gray-700">
              No chats yet? Start a new chat to connect with others. Chatterly is here to keep you engaged and informed.
            </p>
            <p className="text-sm text-gray-500">
              To start chatting, please select a conversation from the list or create a new one.
            </p>
          </div>
        </div>
      )}
    </main>
  )
}

export default ChatBox
