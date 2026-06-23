import React, { useState, useEffect, useRef } from 'react';
import { Bell, Search, User, Heart, MessageSquare, X, Send } from 'lucide-react'; // Added MessageSquare, X, Send
import { Outlet } from 'react-router-dom';
import io from 'socket.io-client';

// Connect to your Node.js socket backend port
const socket = io.connect('http://localhost:5000');

export default function DonorNavbar() {
  // States for managing chat visibility and messages
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);

  // Mock data - replace these with actual user state / dynamic values from your auth context
  const currentUserId = localStorage.getItem('email') || "Donor";
  const activeChatId = "room_needy_donor_123"; // MUST match the room ID used by the needy user
  
  const messagesEndRef = useRef(null);

  // 1. Join the Socket Room when Chat Drawer is opened
  useEffect(() => {
    if (isChatOpen) {
      socket.emit('join_room', activeChatId);
    }
  }, [isChatOpen]);

  // 2. Listen for incoming real-time messages
  useEffect(() => {
    socket.on('receive_message', (incomingData) => {
      setMessages((prev) => [...prev, incomingData]);
    });

    return () => socket.off('receive_message');
  }, []);

  // 3. Keep messages scrolled to the bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle message submission
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
    setMessages((prev) => [...prev, messagePayload]); // Optimistic UI update
    setMessageText("");
  };

  return ( 
    <>
    <nav className="bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400 shadow-lg relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg backdrop-blur-sm">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold">DonorHub</h1>
              <p className="text-xs text-white/80">Dashboard</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-white/90 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
              Home
            </a>
            <a href="#" className="text-white/90 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
              Donations
            </a>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            
            {/* NEW: Chat / Message Button */}
            <button 
              onClick={() => setIsChatOpen(true)}
              className="flex items-center space-x-1.5 p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-white/10"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Chat</span>
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>

            {/* Profile */}
            <div className="flex items-center space-x-2 p-2 text-white/90">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    {/* --- Slide-out Chat Drawer for Donor --- */}
    <div 
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transition-transform duration-300 ease-in-out z-50 flex flex-col ${
        isChatOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Drawer Header */}
      <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5" />
          <span className="font-bold text-lg">Needy Chat Room</span>
        </div>
        <button 
          onClick={() => setIsChatOpen(false)}
          className="p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-3">
        {messages.map((msg, index) => {
          const isMe = msg.senderId === currentUserId;
          return (
            <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                isMe 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
              }`}>
                <p className="break-words">{msg.text}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Box */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type your reply here..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="flex-grow bg-slate-100 border border-slate-200 rounded-full py-2 px-4 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all"
        />
        <button 
          type="submit"
          className="p-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>

    {/* Backdrop Blur Mask */}
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