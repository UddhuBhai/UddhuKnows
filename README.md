# 🧠 UddhuKnows

> Ask Uddhu. He knows.

A personal AI chatbot built from scratch with **React, Node.js, Express, and an OpenAI-compatible API**.

Because apparently having ChatGPT wasn't enough.

So I made my own.

It is called **UddhuKnows.**

And yes, sometimes it says `hn?`

---

## 🤖 About

**UddhuKnows** is a personal AI assistant designed to feel less like a corporate chatbot and more like a smart friend who happens to know things.

The project has its own personality, conversation style, coding behavior, humor rules, and even a few very specific Uddhu-isms.

The AI is instructed to be:

- Friendly
- Casual
- Helpful
- Slightly chaotic
- Occasionally sarcastic
- Curious
- Practical
- Honest
- Good at explaining complicated things simply

And most importantly:

> Don't pretend to know something you don't know.

The personality is controlled through a custom system prompt on the backend rather than being hardcoded into the frontend.

---

## ✨ Features

### 💬 Real AI Conversations

Ask UddhuKnows literally anything.

Questions, ideas, explanations, random thoughts, coding problems, existential crises...

The frontend maintains the conversation and sends the message history to the backend.

---

### ⚡ Streaming AI Responses

Instead of waiting for the entire response to arrive, UddhuKnows streams the AI response chunk-by-chunk.

The backend requests a streaming completion and continuously writes incoming text to the response.

The frontend reads that stream using the browser's `ReadableStream` API and updates the AI message as the response arrives.

Basically:

```text
User asks something
        ↓
React sends conversation
        ↓
Express backend
        ↓
AI API
        ↓
Streaming response
        ↓
React receives chunks
        ↓
UddhuKnows starts talking
```

---

### 🧠 Custom AI Personality

This isn't just an API wrapper.

UddhuKnows has a dedicated personality system prompt defining how it should behave in different situations.

For example:

**Normal question**

> Be helpful and conversational.

**Coding question**

> Be practical and technical.

**Ridiculous question**

> "bro what 😭"

**Confusing question**

> "hn?"

**Serious question**

> Drop the jokes.

**Emotional question**

> Be supportive without becoming overly dramatic.



---

### 👨‍💻 Coding Assistant

UddhuKnows is also designed to help with programming.

Its coding behavior includes:

- Explain the idea first
- Provide clean working code
- Mention important mistakes
- Discuss edge cases
- Keep explanations beginner-friendly
- Avoid unnecessary theory



---

### 📝 Markdown Support

AI responses are rendered using Markdown, including:

- Headings
- Lists
- Bold text
- Links
- Blockquotes
- Inline code
- Code blocks

The frontend uses `react-markdown` and `remark-gfm` for this.

---

### 💻 Beautiful Code Blocks

Code responses get their own styled code blocks with:

- Language detection
- Syntax-friendly formatting
- Horizontal scrolling
- Copy button
- Custom dark styling

And yes, you can actually copy the code.

Because manually selecting code from a chatbot is criminal.



---

### 📋 One-Click Code Copy

Every generated code block has a `copy` button.

Click it.

Code copied.

Productivity restored.

Probably.

---

### 🔄 New Chat

Finished one conversation?

Hit:

```text
new chat +
```

and the conversation resets.

---

### ⌨️ Keyboard Support

Press:

```text
Enter
```

to send a message.

`Shift + Enter` can still be used without triggering the send action.

---

### 📱 Responsive Design

The interface adapts across:

- Desktop
- Tablets
- Mobile
- Very small phones

The CSS includes dedicated breakpoints for tablets, mobile devices, and very small screens. 

---

## 🎨 Design

The UI intentionally avoids the generic "AI chatbot dashboard" look.

Instead, it uses a minimal paper-inspired aesthetic.

### Design characteristics

- Warm off-white background
- Black typography
- Orange accent color
- Handwritten-style branding
- DM Sans for normal text
- DM Mono for technical elements
- Patrick Hand for personality
- Subtle animations
- Minimal borders
- Simple shadows
- Clean chat layout



The result is basically:

> Notebook + minimalist website + AI + questionable life decisions.

---

## 🧩 Technologies Used

### Frontend

- React
- Vite
- JavaScript
- React Markdown
- Remark GFM
- CSS

### Backend

- Node.js
- Express.js
- CORS
- dotenv
- OpenAI SDK

### AI

- Bazaarlink API
- Qwen 3.7 Flash
- Streaming Chat Completions

The backend initializes the OpenAI SDK with a Bazaarlink API endpoint and uses `qwen/qwen3.7-flash` for responses.  

---

## 🏗️ Architecture

The project follows a simple client-server architecture:

```text
                 ┌──────────────────────┐
                 │      User            │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │   React Frontend     │
                 │                      │
                 │  Chat UI             │
                 │  Markdown            │
                 │  Code Blocks         │
                 │  Streaming Reader    │
                 └──────────┬───────────┘
                            │
                         POST /chat
                            │
                            ▼
                 ┌──────────────────────┐
                 │   Express Backend    │
                 │                      │
                 │  Conversation        │
                 │  System Prompt       │
                 │  Validation          │
                 │  Streaming           │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │   Bazaarlink API     │
                 │                      │
                 │  Qwen 3.7 Flash      │
                 └──────────┬───────────┘
                            │
                     Streamed response
                            │
                            ▼
                 ┌──────────────────────┐
                 │   UddhuKnows UI      │
                 └──────────────────────┘
```

The backend also limits the conversation context to the most recent 12 messages before sending it to the model.

---

## 🧠 What I Practiced

This project was basically a crash course in building an actual AI-powered application.

### React

- State management
- Controlled inputs
- Rendering dynamic conversations
- `useEffect`
- `useRef`
- Conditional rendering
- Async functions

### APIs

- Sending POST requests
- JSON request bodies
- Handling HTTP errors
- Environment variables
- Client/server communication

### AI Integration

- OpenAI-compatible APIs
- System prompts
- Conversation history
- Model selection
- Streaming completions
- AI response handling

### Streaming

One of the biggest things I practiced was handling streaming data instead of waiting for one giant response.

```text
chunk
 ↓
decode
 ↓
append
 ↓
update React state
 ↓
render
 ↓
repeat
```

### Markdown

- Markdown rendering
- GitHub-flavored Markdown
- Custom code block rendering
- Code copying

### Backend Development

- Express routes
- Middleware
- CORS
- Request validation
- Error handling
- Streaming HTTP responses

---

## 🔥 Highlights

### Custom Personality

The AI doesn't just answer questions.

It has rules for how it should communicate.

```text
Be helpful.
Be casual.
Don't fake knowledge.
Don't force jokes.
Don't overuse slang.
Know when to be serious.
Occasionally say "hn?"
```

That's the entire point of UddhuKnows.



---

### Actually Feels Like a Chatbot

The interface includes:

- Conversation history
- Streaming responses
- Typing cursor
- Markdown
- Code blocks
- Copy buttons
- Auto-scroll
- New chat functionality

The frontend automatically scrolls toward the newest message as the conversation updates.

---

### Minimalist UI

No unnecessary dashboard.

No 47 buttons.

No enterprise analytics panel.

Just:

```text
hey, what's up?

ask me literally anything.
i'll figure it out.
```

And then:

```text
what are we overthinking today?
```



---

## 🚀 Future Improvements

There are a LOT of directions this could go.

### 🧠 Memory

Give UddhuKnows persistent memory so it can remember users across conversations.

### 🎙️ Voice Mode

Talk to UddhuKnows instead of typing.

Imagine hearing:

> "hn?"

through your speakers.

Terrifying.

### 🔍 Web Search

Allow UddhuKnows to search the internet for current information.

### 📎 File Uploads

Let users upload:

- PDFs
- Images
- Code
- Documents

and ask questions about them.

### 🧑‍🎨 Multiple Personalities

Add different modes like:

```text
UddhuKnows — Normal
UddhuKnows — Coding
UddhuKnows — Brutal
UddhuKnows — Therapist-ish
UddhuKnows — Professor
UddhuKnows — Unhinged
```

### 💾 Chat Persistence

Save conversations so users can come back to old chats.

### 🔐 Authentication

Add user accounts and private conversation history.

---

## 📚 Learning Outcome

Building UddhuKnows taught me that making an AI application isn't just:

```text
API + prompt = chatbot
```

There is a lot more involved.

You need to think about:

- Conversation state
- Context limits
- Streaming
- Error handling
- API architecture
- UI/UX
- Markdown rendering
- Code rendering
- Prompt design
- Responsive design
- User experience

The AI might be the brain.

But the application around it is what makes it usable.

---

## 💀 The Most Important Feature

It occasionally says:

```text
hn?
```

That's it.

That's the project.

---

## 🤝 Contributions

Got an idea to make UddhuKnows even more ridiculous?

Feel free to contribute.

Ideas, improvements, UI changes, AI personality tweaks, features, bug fixes — all welcome.

Just don't make it boring.

---

## ⭐ Support

If you liked the project, consider giving the repository a ⭐.

It won't make UddhuKnows smarter.

But it'll make me feel like I didn't spend all that time coding for nothing.

---

## 🧠 Final Thought

I wanted to build an AI chatbot.

So instead of just using one...

I built one.

**UddhuKnows.**

> Ask Uddhu. He knows.

Or at least...

> he thinks he knows.

hn?
