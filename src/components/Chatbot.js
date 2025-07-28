// src/components/Chatbot.js
import React, { useState } from 'react';
import './chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Ask me anything.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await fetch(
        'https://corsproxy.io/?https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': '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', // 🔑 Replace this!
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
              ...newMessages.map(m => ({
                role: m.sender === 'user' ? 'user' : 'assistant',
                content: m.text
              }))
            ],
            temperature: 0.7,
            max_tokens: 100,
          })
        }
      );

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || 'Sorry, I couldn’t reply.';
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    } catch (err) {
      console.error('OpenAI Error:', err);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Oops! Something went wrong.' }]);
    }
  };

  return (
    <>
      <div className="chatbot-icon" onClick={() => setIsOpen(!isOpen)}>💬</div>

      {isOpen && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <h4>AI Chat</h4>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="chatbot-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-footer">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
