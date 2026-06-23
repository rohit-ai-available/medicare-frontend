import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageSquare, X, Send } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

// Connect to your Node.js socket backend port
const socket = io.connect('http://localhost:5000');

export default function MedicineDonationNavbar({}) {
  const navigate = useNavigate();  
  
  // States for layout and chatting
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);

  // Mock data - replace these with your actual dynamic variables from localStorage/Auth Context
  const currentUserId = localStorage.getItem('email') || "User"; 
  const activeChatId = "room_needy_donor_123"; // A dynamic Room ID matching both users
  
  const messagesEndRef = useRef(null);

  // 1. Join Socket Room when Chat Drawer is opened
  useEffect(() => {
    if (isChatOpen) {
      socket.emit('join_room', activeChatId);
    }
  }, [isChatOpen]);

  // 2. Listen for incoming WebSocket messages
  useEffect(() => {
    socket.on('receive_message', (incomingData) => {
      setMessages((prev) => [...prev, incomingData]);
    });

    return () => socket.off('receive_message');
  }, []);

  // 3. Smooth scroll down on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function dorefsignup() {
    navigate('/');
  }

  // Handle hitting send button
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const messagePayload = {
      chatId: activeChatId,
      senderId: currentUserId,
      text: messageText,
      createdAt: new Date()
    };

    socket.emit('send_message', messagePayload);
    setMessages((prev) => [...prev, messagePayload]);
    setMessageText("");
  };

  return (
    <>
      <div className='bg-gradient-to-r from-purple-500 to-indigo-500 relative z-40'>
        <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-white" />
                <h1 className="text-2xl font-bold text-white">MediShare</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Chat Action Trigger Button */}
                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="flex items-center space-x-2 bg-purple-700/40 text-white border border-white/20 px-4 py-2 rounded-full font-semibold hover:bg-white/20 transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat</span>
                </button>

                <button onClick={dorefsignup} className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-50 transition-colors">
                  Home
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* --- Slide-out Chat Drawer Pane --- */}
      <div 
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transition-transform duration-300 ease-in-out z-50 flex flex-col ${
          isChatOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Chat Pane Header */}
        <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span className="font-bold text-lg">Donor Chat Room</span>
          </div>
          <button 
            onClick={() => setIsChatOpen(false)}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messaging Logs Body Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-3">
          {messages.map((msg, index) => {
            const isMe = msg.senderId === currentUserId;
            return (
              <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                  isMe 
                    ? 'bg-purple-600 text-white rounded-br-none' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                }`}>
                  <p className="break-words">{msg.text}</p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Interactive Typing Box */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type your message here..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="flex-grow bg-slate-100 border border-slate-200 rounded-full py-2 px-4 text-sm text-slate-800 outline-none focus:border-purple-500 focus:bg-white transition-all"
          />
          <button 
            type="submit"
            className="p-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Background Overlay Mask */}
      {isChatOpen && (
        <div 
          onClick={() => setIsChatOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      <Outlet />
    </>
  );
}