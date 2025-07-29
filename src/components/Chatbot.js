import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Loader2, TestTube } from 'lucide-react';
import './chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I\'m Ashen\'s ChatBot. Ask me anything!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Please enter a message.' }]);
      return;
    }

    const newMessages = [...messages, { sender: 'user', text: trimmedInput }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // Different Gemini models to try
    const geminiModels = [
      'gemini-1.5-flash',     // Fastest, most available
      'gemini-1.5-pro',      // More capable but busier
      'gemini-pro'           // Fallback legacy model
    ];

    let lastError = null;

    for (let attempt = 0; attempt < 3; attempt++) {
      for (const model of geminiModels) {
        try {
          // Check for API key first
          const geminiApiKey = process.env.REACT_APP_GEMINI_API_KEY;
          console.log('Checking API key:', geminiApiKey ? `Found: ${geminiApiKey.substring(0, 10)}...` : 'NOT FOUND');
          
          if (!geminiApiKey) {
            setMessages(prev => [...prev, { 
              sender: 'bot', 
              text: 'Gemini API key not found! Please:\n\n1. Go to https://aistudio.google.com/app/apikey\n2. Create an API key\n3. Add to .env file as:\nREACT_APP_GEMINI_API_KEY=your_key_here\n4. Restart your server'
            }]);
            setIsLoading(false);
            return;
          }

          console.log(`Attempt ${attempt + 1}: Trying model ${model}...`);
          
          // Call Google Gemini API with current model
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: trimmedInput
                }]
              }],
              generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
              }
            })
          });

          console.log(`${model} Response Status:`, response.status);

          if (response.ok) {
            const data = await response.json();
            console.log(`Success with ${model}:`, JSON.stringify(data, null, 2));

            // Extract the AI response
            const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
            
            if (aiResponse) {
              console.log('AI Response:', aiResponse);
              setMessages(prev => [...prev, { 
                sender: 'bot', 
                text: aiResponse + `\n\nPowered by ${model}`
              }]);
              setIsLoading(false);
              return; // Success! Exit all loops
            }
          } else {
            const errorData = await response.json();
            console.log(`${model} failed:`, errorData);
            lastError = errorData;
            
            // If 503 (overloaded), try next model immediately
            if (response.status === 503) {
              console.log(`Model ${model} overloaded, trying next model...`);
              continue;
            }
            
            // For other errors, don't try other models in this attempt
            break;
          }

        } catch (error) {
          console.error(`${model} request failed:`, error);
          lastError = { error: { message: error.message } };
        }
      }

      // Wait before next attempt (exponential backoff)
      if (attempt < 2) {
        const waitTime = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
        console.log(`All models busy, waiting ${waitTime}ms before retry...`);
        
        // Show user we're retrying
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: `Models are busy, retrying in ${waitTime/1000} seconds... (Attempt ${attempt + 1}/3)`
        }]);
        
        await new Promise(resolve => setTimeout(resolve, waitTime));
        
        // Remove the retry message
        setMessages(prev => prev.slice(0, -1));
      }
    }

    // If we get here, all attempts failed
    console.error('All attempts failed. Last error:', lastError);
    
    let errorMessage = 'Gemini AI is currently overloaded. ';
    if (lastError?.error?.code === 503) {
      errorMessage += 'All models are busy right now. This usually resolves in 1-2 minutes.\n\nTry again in a moment or ask a shorter question.';
    } else if (lastError?.error?.code === 429) {
      errorMessage += 'Rate limit exceeded. You have 15 requests per minute on the free tier.';
    } else if (lastError?.error?.code === 400) {
      errorMessage += 'Invalid request. Try rephrasing your question.';
    } else if (lastError?.error?.code === 403) {
      errorMessage += 'API key issue. Please check your API key permissions.';
    } else {
      errorMessage += `Error: ${lastError?.error?.message || 'Unknown error'}`;
    }
    
    setMessages(prev => [...prev, { sender: 'bot', text: errorMessage }]);
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading) {
        handleSend();
      }
    }
  };

  // Test API connection function
  const testConnection = async () => {
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    if (apiKey) {
      console.log('Testing API connection...');
      setMessages(prev => [...prev, { sender: 'bot', text: 'Testing Gemini API connection...' }]);
      setInput('Hello, are you working?');
      handleSend();
    } else {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: 'No API key found for testing. Please add REACT_APP_GEMINI_API_KEY to your .env file.'
      }]);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Enhanced AI Bot Icon */}
      <div 
        className={`chatbot-icon ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Bot className="w-7 h-7 text-white" />
        )}
      </div>

      {/* Enhanced Chat Window */}
      {isOpen && (
        <div className="chatbot-popup">
          {/* Modern Header */}
          <div className="chatbot-header">
            <div className="header-content">
              <div className="header-info">
                <h4>Ashen's AI Assistant</h4>
                <p>Powered by Gemini AI</p>
              </div>
              <div className="header-actions">
                <button 
                  onClick={testConnection}
                  className="header-btn"
                  title="Test API Connection"
                >
                  <TestTube />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="header-btn"
                  title="Close Chat"
                >
                  <X />
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Chat Body with Fixed Height and Scroll */}
          <div 
            ref={chatBodyRef}
            className="chatbot-body"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`message-container ${msg.sender}`}>
                <div className={`chat-message ${msg.sender}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="loading-container">
                <div className="loading-message">
                  <Loader2 className="loading-spinner" />
                  <span className="loading-text">AI is thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Footer */}
          <div className="chatbot-footer">
            <div className="input-container">
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="chat-input"
              />
              <button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()}
                className="send-btn"
              >
                {isLoading ? (
                  <Loader2 className="loading-spinner" />
                ) : (
                  <Send />
                )}
              </button>
            </div>
            
            <div className="status-indicator">
              <div className={`status-dot ${process.env.REACT_APP_GEMINI_API_KEY ? 'connected' : 'disconnected'}`}></div>
              <span className="status-text">
                {process.env.REACT_APP_GEMINI_API_KEY ? 'API Connected' : 'API Disconnected'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;