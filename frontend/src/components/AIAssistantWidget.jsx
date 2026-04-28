import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, X, Send } from 'lucide-react';
import './AIAssistantWidget.css';

const AIAssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your TravelMithra AI. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput('');
    setIsTyping(true);

    try {
      const { data } = await axios.post('http://localhost:5000/api/ai/chat', { message: userMessage });
      setMessages(prev => [...prev, { text: data.reply, isBot: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Oops, something went wrong on my end. Please try again later.", isBot: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="ai-widget-container">
      {/* Floating Button */}
      {!isOpen && (
        <button className="ai-fab shadow-glow" onClick={() => setIsOpen(true)}>
          <MessageSquare size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window glass-panel animate-fade-in">
          <div className="ai-chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div className="ai-avatar">🤖</div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'white' }}>TravelMithra AI</h3>
            </div>
            <button className="close-btn" style={{ color: 'white' }} onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="ai-chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`ai-message-wrapper ${msg.isBot ? 'bot' : 'user'}`}>
                <div className="ai-message">
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="ai-message-wrapper bot">
                <div className="ai-message typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="ai-chat-input">
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" disabled={!input.trim()}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIAssistantWidget;
