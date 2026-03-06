// Community chat functionality
document.addEventListener('DOMContentLoaded', function() {
    const nameForm = document.getElementById('name-form');
    const messageForm = document.getElementById('message-form');
    const userInput = document.getElementById('user-input');
    const messageInput = document.getElementById('message-input');
    const messageList = document.getElementById('message-list');

    if (nameForm) {
        nameForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const userText = userInput?.value;
            if (userText && userText.trim() !== '') {
                userInput.disabled = true;
                if (messageInput) messageInput.disabled = false;
                
                // Store username in localStorage
                localStorage.setItem('chatUsername', userText);
                
                // Add system message
                addMessage('System', `Welcome ${userText}! You can now start chatting.`, 'system');
            }
        });
    }

    if (messageForm) {
        messageForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const userText = userInput?.value;
            const messageText = messageInput?.value;
            
            if (userText && userText.trim() !== '' && messageText && messageText.trim() !== '') {
                addMessage(userText, messageText, 'user');
                messageInput.value = '';
            }
        });
    }

    // Load saved username
    const savedUsername = localStorage.getItem('chatUsername');
    if (savedUsername && userInput) {
        userInput.value = savedUsername;
        userInput.disabled = true;
        if (messageInput) messageInput.disabled = false;
    }

    // Add demo messages for better UX
    setTimeout(() => {
        addMessage('System', 'Welcome to MediConnect Community Chat! Feel free to ask questions and share experiences.', 'system');
    }, 500);
});

// Add message to chat
function addMessage(sender, text, type = 'user') {
    const messageList = document.getElementById('message-list');
    if (!messageList) return;

    const messageItem = document.createElement('li');
    messageItem.className = `message message-${type}`;
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageItem.innerHTML = `
        <strong>${escapeHtml(sender)}</strong> 
        <span class="text-muted small">${time}</span>
        <br>
        ${escapeHtml(text)}
    `;
    
    messageList.appendChild(messageItem);
    messageList.scrollTop = messageList.scrollHeight;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}