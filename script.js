const yayChatBtn = document.getElementById('yay-chatbot');
const yayChatWindow = document.getElementById('yay-chat-window');

yayChatBtn.addEventListener('click', () => {
  if (yayChatWindow.style.display === 'none' || yayChatWindow.style.display === '') {
    yayChatWindow.style.display = 'block';
  } else {
    yayChatWindow.style.display = 'none';
  }
});
