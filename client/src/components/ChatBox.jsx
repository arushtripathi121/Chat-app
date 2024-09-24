import React, { useEffect, useState } from 'react';
import { AiOutlineSend } from "react-icons/ai";
import profile_pic from '../assets/user.png';
import { useSelector } from 'react-redux';

const ChatBox = ({ data }) => {
  const onlineUser = useSelector(state => state?.user?.onlineUser);
  const socketConnection = useSelector(state => state?.user?.socketConnection);
  const [messages, setMessages] = useState([]);
  const [writeMessage, setWriteMessage] = useState('');
  const userId = localStorage.getItem('_id');
  const [loadingPreviousMessages, setLoadingPreviousMessage] = useState(true);

  useEffect(() => {
    if (socketConnection && data?._id) {
      const loadData = {
        userId: userId,
        receiverId: data._id
      }
      socketConnection.emit('join-chat', loadData);

      socketConnection.on('loaded-chats', (lodedMessages) => {
        setLoadingPreviousMessage(true);
        setMessages(Array.isArray(lodedMessages) ? lodedMessages.map(m => {
          return {
            message: m.text,
            isSent: m.sendBy === userId,
            receiver: data._id,
            sender: m.sendBy
          };
        }) : []);
        setLoadingPreviousMessage(false);
      });


      const handleNewMessage = (messageData) => {
        if (messageData.receiver === data._id || messageData.sender === data._id) {
          setMessages(prevMessages => [
            ...prevMessages,
            { ...messageData, isSent: messageData.sender === userId }
          ]);
        }
      };

      socketConnection.on('get-message', handleNewMessage);

      return () => {
        socketConnection.off('get-message', handleNewMessage);
      };
    }
  }, [data, socketConnection, userId]);


  const sendMessage = () => {
    if (writeMessage.trim()) {
      const messageData = {
        sender: userId,
        receiver: data._id,
        message: writeMessage
      };
      setMessages(prevMessages => [
        ...prevMessages,
        { ...messageData, isSent: true }
      ]);
      socketConnection.emit('new-message', messageData);
      setWriteMessage('');
    }
  };

  return (
    <main className='flex flex-col h-screen w-full bg-homeChat'>
      {data ? (
        <div className='flex flex-col h-full w-full'>
          <section className='flex items-center border border-gray-300 rounded-lg shadow-md bg-orange-100 px-5 py-3 w-full'>
            <img
              src={data.profile_pic || profile_pic}
              alt="Profile"
              className='w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border border-orange-300'
            />
            <div className='ml-4'>
              <p className='font-semibold text-gray-800 text-md md:text-lg'>{data.name}</p>
              <p className='text-sm text-gray-600'>{data.userName}</p>
              <p className='text-sm text-green-600'>
                {onlineUser?.includes(data._id) && 'online'}
              </p>
            </div>
          </section>

          {!loadingPreviousMessages ? (
            <section className='flex-grow overflow-y-auto p-6 w-full rounded-lg shadow-lg'>
              {messages && messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'} mb-4`}>
                  <p className={`p-3 rounded-lg max-w-xs shadow-md transition-all duration-300 ease-in-out transform ${msg.isSent ? 'bg-green-500 text-white hover:scale-105' : 'bg-white text-black border border-gray-300 hover:shadow-lg'}`}>
                    {msg.message}
                  </p>
                </div>
              ))}
            </section>
          ) : (
            <p className='w-full h-full text-center text-lg font-semibold text-gray-700'>Loading messages...</p>
          )}


          <section className='p-4 flex items-center w-full'>
            <input
              type='text'
              value={writeMessage}
              placeholder='Write your message...'
              className='flex-grow outline-none px-4 py-2 text-base md:text-lg rounded-lg border border-gray-300 bg-gray-100 font-medium'
              onChange={(e) => setWriteMessage(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className='ml-4 px-4 py-2 bg-orange-600 rounded-full shadow hover:bg-orange-700 transition duration-300'
            >
              <AiOutlineSend className='h-6 w-6 md:h-7 md:w-7 text-white' />
            </button>
          </section>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-orange-50">
          <div className="text-center p-8 bg-white shadow-xl rounded-lg border border-orange-200 max-w-xl mx-4 w-full">
            <p className="text-2xl font-bold text-orange-600 mb-4">Start chatting with Chatterly</p>
            <p className="mb-4 text-gray-700">Connect with friends and colleagues effortlessly. Chatterly makes communication simple and fun!</p>
            <p className="mb-4 text-gray-700">Create new conversations, stay updated, and keep your chats organized. Dive into the conversation now!</p>
            <p className="mb-4 text-gray-700">No chats yet? Start a new chat to connect with others. Chatterly is here to keep you engaged and informed.</p>
            <p className="text-sm text-gray-500">To start chatting, please select a conversation from the list or create a new one.</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default ChatBox;

