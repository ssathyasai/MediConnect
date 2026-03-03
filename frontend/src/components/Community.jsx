import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Community = () => {
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [nameSet, setNameSet] = useState(false);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('communityMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('communityMessages', JSON.stringify(messages));
  }, [messages]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      setNameSet(true);
    }
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        user: userName,
        text: message,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4" style={{ color: '#04364a', fontFamily: 'Cabin, sans-serif' }}>
        Community Chat
      </h1>
      
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow" style={{ backgroundColor: '#d2e0fb' }}>
            <div className="card-body">
              {!nameSet ? (
                <form onSubmit={handleNameSubmit} className="mb-3">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name to join the chat"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <button className="btn btn-primary" type="submit">Join Chat</button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="mb-3">
                    <div className="bg-light p-3 rounded" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                      {messages.length === 0 ? (
                        <p className="text-muted text-center">No messages yet. Start the conversation!</p>
                      ) : (
                        messages.map((msg) => (
                          <div key={msg.id} className="mb-2 p-2 rounded" style={{ 
                            backgroundColor: msg.user === userName ? '#cce5ff' : '#f8f9fa',
                            marginLeft: msg.user === userName ? '20%' : '0',
                            marginRight: msg.user === userName ? '0' : '20%'
                          }}>
                            <strong>{msg.user}:</strong> {msg.text}
                            <small className="text-muted d-block">{msg.timestamp}</small>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  
                  <form onSubmit={handleMessageSubmit}>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <button className="btn btn-success" type="submit">Send</button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;