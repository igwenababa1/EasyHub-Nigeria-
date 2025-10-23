import React, { useState, useEffect, useRef } from 'react';
import { ChatBubbleLeftRightIcon, XIcon } from './Icons';

type Message = {
  sender: 'user' | 'agent';
  text: string;
};

export const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      setMessages([{ sender: 'agent', text: "Hello! Welcome to EasyHub Support. How can I help you today?" }]);
    } else {
      setMessages([]);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(scrollToBottom, [messages]);
  
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.message as HTMLInputElement;
    const userMessage = input.value.trim();
    if (userMessage) {
      setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
      input.value = '';
      
      // Simulate agent response
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'agent', text: "Thank you for your message. An agent will be with you shortly to assist with your query about '" + userMessage.substring(0, 20) + "...'. Please hold on." }]);
      }, 1500);
    }
  };

  return (
    <>
      <div className="fixed bottom-8 left-8 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out"
          aria-label={isOpen ? "Close chat" : "Open live chat"}
        >
          {isOpen ? <XIcon className="w-8 h-8" /> : <ChatBubbleLeftRightIcon className="w-8 h-8" />}
        </button>
      </div>
      
      {isOpen && (
        <div className="fixed bottom-28 left-8 z-50 w-80 h-96 bg-gray-900 rounded-2xl shadow-2xl flex flex-col animate-slide-up-chat">
          <div className="p-4 bg-gray-800 rounded-t-2xl flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <h3 className="font-bold text-white">Live Support</h3>
          </div>
          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl ${msg.sender === 'user' ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-700">
            <input
              type="text"
              name="message"
              placeholder="Type your message..."
              autoComplete="off"
              className="w-full bg-gray-800 border-gray-600 rounded-full py-2 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </form>
        </div>
      )}
      <style>{`
        @keyframes slide-up-chat {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up-chat {
          animation: slide-up-chat 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};