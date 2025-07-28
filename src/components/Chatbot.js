import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2, Zap, TestTube } from 'lucide-react';

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
    <div className="fixed bottom-6 left-6 z-50">
      {/* Chat Icon */}
      <div 
        className={`w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'rotate-180' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="text-white w-6 h-6" />
        ) : (
          <MessageCircle className="text-white w-6 h-6" />
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 left-0 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden transform transition-all duration-300 ease-out">
          {/* Header */}
          <div className="flex justify-between items-center p-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div>
              <h4 className="font-semibold text-lg">Ashen's AI Chatbot</h4>
              <p className="text-sm opacity-90">Powered by Gemini</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={testConnection}
                className="text-white hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-white hover:bg-opacity-20"
                title="Test API Connection"
              >
                <TestTube className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div 
            ref={chatBodyRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-md' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                    <span className="text-sm text-black">ChatBot is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-white">
            <div className="flex space-x-3 mb-3">
              <input
                type="text"
                placeholder="Ask Chatbot anything..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 text-sm bg-gray-50 focus:bg-white transition-colors text-black"
              />
              <button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()}
                className="px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                process.env.REACT_APP_GEMINI_API_KEY ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className="text-xs text-gray-500">
                {process.env.REACT_APP_GEMINI_API_KEY ? 'API Key Connected' : 'No API Key'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;