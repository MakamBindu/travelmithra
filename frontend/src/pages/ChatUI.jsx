import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import { Send, ArrowLeft } from 'lucide-react';
import './ChatUI.css';

const ENDPOINT = 'http://localhost:5000';
let socket;

const ChatUI = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [bookingInfo, setBookingInfo] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('join_room', bookingId);

    // Fetch previous messages
    const fetchMessages = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get(`${ENDPOINT}/api/chat/${bookingId}`, config);
        setMessages(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();

    // Fetch booking details to know who we are chatting with
    const fetchBookingDetails = async () => {
      // In a real app we'd have a specific route for this.
      // Assuming we get it from a global state or simple fetch
    };
    fetchBookingDetails();

    socket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [bookingId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // We need the receiver's ID. 
    // In a full implementation, we'd fetch the booking to see if we are customer or guide, 
    // then set the receiver to the other person.
    // For this prototype, we'll assume the chat component knows or it sends to the booking channel.
    const messageData = {
      booking: bookingId,
      sender: userInfo._id,
      receiver: userInfo._id, // Mocked receiver for prototype
      content: newMessage,
    };

    socket.emit('send_message', messageData);
    setNewMessage('');
  };

  return (
    <div className="chat-container animate-fade-in">
      <div className="chat-header glass-panel">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h3>Booking Chat</h3>
      </div>
      
      <div className="chat-messages glass-panel">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`message-bubble ${msg.sender._id === userInfo._id ? 'my-message' : 'their-message'}`}
          >
            <p>{msg.content}</p>
            <span className="msg-time">{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-area glass-panel" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="btn-primary btn-send">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatUI;
