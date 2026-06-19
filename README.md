# AI Starter App

A clean, minimal AI chat application powered by OpenAI. Get up and running with a conversational AI interface in minutes.

## Features

- 💬 Real-time AI chat interface
- 🔒 API key kept server-side (never exposed to the browser)
- 📜 Conversation history maintained per session
- ✨ Clean, dark-themed UI
- 📱 Responsive layout

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- An [OpenAI API key](https://platform.openai.com/api-keys)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/emeraldestatesegypt-ops/19-6-AI.git
   cd 19-6-AI
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure your API key**

   ```bash
   cp .env.example .env
   ```

   Open `.env` and replace `your_openai_api_key_here` with your actual OpenAI API key:

   ```
   OPENAI_API_KEY=sk-...
   PORT=3000
   ```

4. **Start the server**

   ```bash
   npm start
   ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── public/
│   ├── index.html  # Chat interface
│   ├── style.css   # Styles
│   └── app.js      # Frontend JavaScript
├── server.js       # Express server & OpenAI proxy
├── package.json    # Node.js project metadata
├── .env.example    # Environment variable template
└── .gitignore      # Ignored files
```

## How It Works

- The frontend (`app.js`) sends chat messages to `/api/chat` on the local server.
- The server (`server.js`) forwards the conversation history to the OpenAI Chat Completions API using your server-side API key.
- Replies are returned to the browser as a single JSON payload and displayed in the chat UI.

## Customization

| Setting | Location | Default |
|---|---|---|
| AI model | `server.js` → `model` | `gpt-4o-mini` |
| Temperature | `server.js` → `temperature` | `0.7` |
| Port | `.env` → `PORT` | `3000` |

## License

MIT
