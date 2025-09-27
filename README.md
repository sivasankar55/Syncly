

# Syncly

Syncly is a modern **real-time collaboration platform** that combines chat, video calls, and team management into a seamless experience. It’s designed for productivity, simplicity, and scalability — whether you’re working with a small team or running large-scale online communities.

---

## 🚀 Features

* **🔐 Authentication & Authorization**

  * Secure login/signup with [Clerk](https://clerk.com)
  * JWT-based access & refresh tokens
  * Global Axios interceptors for attaching tokens
  * Automatic token refresh

* **💬 Real-time Chat**

  * Powered by [Stream Chat](https://getstream.io/chat/)
  * Direct messages (DMs) and group channels
  * Rich media support (pinned messages, attachments, emojis)
  * Presence indicators (online/offline status)

* **🎥 Video Calling**

  * Seamless video meetings using [Stream Video SDK](https://getstream.io/video/)
  * Join/leave call states
  * Speaker layouts & call controls
  * Secure room-based access with generated tokens

* **📡 Error Handling & Monitoring**

  * Integrated with [Sentry](https://sentry.io) for real-time error tracking
  * Toast notifications for graceful error feedback

* **⚡ Performance Optimizations**

  * [TanStack Query](https://tanstack.com/query) for efficient server-state management
  * Lazy loading routes for faster navigation

---

## 🛠️ Tech Stack

**Frontend:**

* React + Vite
* TailwindCSS
* TanStack Query
* Clerk (Authentication)
* Stream Chat & Video SDKs
* Sentry (Error Monitoring)

**Backend:**

* Node.js + Express
* Clerk Middleware for auth
* REST API endpoints for token generation

---

## 🧩 Project Workflow

1. **Authentication Setup**

   * Clerk integrated for user management
   * Global Axios interceptor ensures tokens are attached to each API call

2. **Chat Integration**

   * Users can join or create channels
   * Channel headers display metadata (pinned messages, members, invite modal)
   * Custom channel previews and member lists

3. **Video Call Setup**

   * Calls are protected via backend-generated tokens
   * Stream Video client handles joining/leaving states
   * UI includes controls like mute/unmute, screen share, and leave

4. **Error Monitoring & Logging**

   * Sentry tracks frontend issues in real-time
   * Custom toast messages provide instant feedback to users

---

## 📦 Installation & Setup

### Prerequisites

* Node.js >= 18
* npm or yarn
* Stream API Key & Secret
* Clerk project setup

### Clone & Install

```bash
git clone https://github.com/sivasankar55/syncly.git
cd syncly
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Clerk
CLERK_API_KEY=your_clerk_api_key
CLERK_SECRET_KEY=your_clerk_secret

# Stream
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

# Backend
PORT=5000
```

### Run the App

**Start Backend**

```bash
cd backend
npm run dev
```

**Start Frontend**

```bash
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📖 Usage

1. **Sign Up / Login**

   * Use Clerk’s secure authentication flow

2. **Join or Create Channels**

   * Start chatting with individuals or groups
   * Pin messages or invite new members

3. **Start a Video Call**

   * Enter a call room
   * Collaborate in real-time with audio/video features

4. **Error Monitoring**

   * Errors are logged via Sentry for developers
   * Users see friendly toast messages

---

## 🗺️ Roadmap

* [ ] File sharing in chat
* [ ] Whiteboard collaboration during calls
* [ ] Admin/moderator role support
* [ ] Mobile responsive PWA

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch (`git checkout -b feature-xyz`)
3. Commit changes (`git commit -m 'Add feature xyz'`)
4. Push to branch (`git push origin feature-xyz`)
5. Create a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.
