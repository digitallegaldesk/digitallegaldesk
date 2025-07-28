const yayChatBtn = document.getElementById('yay-chatbot');
const yayChatWindow = document.getElementById('yay-chat-window');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

yayChatBtn.addEventListener('click', () => {
  yayChatWindow.style.display = (yayChatWindow.style.display === 'block') ? 'none' : 'block';
});

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') sendMessage();
});

function appendMessage(sender, message) {
  const msgDiv = document.createElement('div');
  msgDiv.innerHTML = '<strong>' + sender + ':</strong> ' + message;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;
  appendMessage('You', message);
  userInput.value = '';
  appendMessage('YAY AI', 'Typing...');

  try {
    const response = await fetch('backend.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: message }]
      })
    });
    const data = await response.json();
    const reply = data.choices[0].message.content.trim();
    chatMessages.lastChild.remove(); // Remove "Typing..."
    appendMessage('YAY AI', reply);
  } catch (error) {
    chatMessages.lastChild.remove();
    appendMessage('YAY AI', 'Sorry, something went wrong.');
  }
}
