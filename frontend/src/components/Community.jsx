import React, { useState } from 'react';
import NavigationBar from './Navbar';
import '../styles/community.css';

const Community = ({ isLoggedIn, user, onLogout }) => {
    const [messages, setMessages] = useState([]);
    const [userName, setUserName] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const [nameSet, setNameSet] = useState(false);

    const handleNameSubmit = (e) => {
        e.preventDefault();
        if (userName.trim()) {
            setNameSet(true);
        }
    };

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        if (messageInput.trim()) {
            const newMessage = {
                user: userName,
                text: messageInput,
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages([...messages, newMessage]);
            setMessageInput('');
        }
    };

    return (
        <>
            <NavigationBar isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} />
            
            <div className="community-container">
                <h1>Community Chat</h1>
                
                <div id="chat-container" className="chat-container">
                    {!nameSet ? (
                        <div className="name-section">
                            <form onSubmit={handleNameSubmit} id="name-form">
                                <input
                                    type="text"
                                    id="user-input"
                                    placeholder="Enter Your Name"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                                <button type="submit">Join Chat</button>
                            </form>
                        </div>
                    ) : (
                        <>
                            <div className="chat-header">
                                <h3>Welcome, {userName}!</h3>
                            </div>
                            
                            <div className="messages-section">
                                <ul id="message-list" className="message-list">
                                    {messages.map((msg, index) => (
                                        <li key={index} className="message">
                                            <strong>{msg.user}</strong> [{msg.timestamp}]: {msg.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="message-input-section">
                                <form onSubmit={handleMessageSubmit} id="message-form">
                                    <input
                                        type="text"
                                        id="message-input"
                                        placeholder="Enter your message..."
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                    />
                                    <button type="submit">Send</button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
                
                <div className="community-guidelines">
                    <h3>Community Guidelines</h3>
                    <ul>
                        <li>Be respectful and kind to others</li>
                        <li>No medical advice - share experiences only</li>
                        <li>Protect your privacy - don't share personal information</li>
                        <li>Report inappropriate behavior</li>
                        <li>Seek professional help for medical emergencies</li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Community;