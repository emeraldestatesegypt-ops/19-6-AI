const messagesEl = document.getElementById('messages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');

// Conversation history sent to the API
let conversationHistory = [];

// Auto-resize textarea as the user types
userInput.addEventListener('input', () => {
  userInput.style.height = 'auto';
  userInput.style.height = Math.min(userInput.scrollHeight, 180) + 'px';
});

// Send on Enter (Shift+Enter for newline)
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

sendBtn.addEventListener('click', sendMessage);
clearBtn.addEventListener('click', clearConversation);

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  // Remove welcome screen on first message
  const welcome = messagesEl.querySelector('.welcome-message');
  if (welcome) welcome.remove();

  // Append user message
  appendMessage('user', text);
  conversationHistory.push({ role: 'user', content: text });

  // Reset input
  userInput.value = '';
  userInput.style.height = 'auto';
  setLoading(true);

  // Show typing indicator
  const typingEl = appendTyping();

  try {
    const reply = await fetchReply(conversationHistory);
    typingEl.remove();
    appendMessage('ai', reply);
    conversationHistory.push({ role: 'assistant', content: reply });
  } catch (err) {
    typingEl.remove();
    appendMessage('error', err.message || 'Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
}

async function fetchReply(messages) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data.reply;
}

function appendMessage(role, text) {
  const isUser = role === 'user';
  const isError = role === 'error';

  const wrapper = document.createElement('div');
  wrapper.classList.add('message', isUser ? 'user' : isError ? 'error ai' : 'ai');

  const avatar = document.createElement('div');
  avatar.classList.add('avatar');
  avatar.textContent = isUser ? 'U' : '✦';

  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.textContent = text;

  wrapper.appendChild(avatar);
  wrapper.appendChild(bubble);
  messagesEl.appendChild(wrapper);
  scrollToBottom();

  return wrapper;
}

function appendTyping() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('message', 'ai');

  const avatar = document.createElement('div');
  avatar.classList.add('avatar');
  avatar.textContent = '✦';

  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  const dots = document.createElement('div');
  dots.classList.add('typing-dots');
  dots.innerHTML = '<span></span><span></span><span></span>';

  bubble.appendChild(dots);
  wrapper.appendChild(avatar);
  wrapper.appendChild(bubble);
  messagesEl.appendChild(wrapper);
  scrollToBottom();

  return wrapper;
}

function clearConversation() {
  conversationHistory = [];
  messagesEl.innerHTML = `
    <div class="welcome-message">
      <div class="welcome-icon">✦</div>
      <h2>Welcome to AI Starter App</h2>
      <p>Start a conversation by typing a message below.</p>
    </div>
  `;
  userInput.focus();
}

function setLoading(loading) {
  sendBtn.disabled = loading;
  userInput.disabled = loading;
  if (!loading) userInput.focus();
}

function scrollToBottom() {
  const container = messagesEl.parentElement;
  container.scrollTop = container.scrollHeight;
}
