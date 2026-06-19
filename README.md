# Syncly

A real-time team collaboration platform that brings messaging, channels, and video calls into one seamless workspace. Built with modern, scalable web technologies and ready for production deployment.

---

## Overview

Syncly is a full-stack collaboration application designed for teams that need instant communication. Users authenticate securely, join public or private channels, exchange direct messages, start one-click video calls, and manage channel members — all powered by Stream's real-time Chat and Video APIs.

The project is split into a React frontend and an Express backend, each configured for independent development and Vercel deployment.

---

## Features

- **Secure Authentication** — User sign-in, sign-up, and session management via Clerk, with JWT tokens attached automatically to API requests.
- **Real-time Messaging** — Public and private channels, direct messages, unread badges, presence indicators, pinned messages, and invites powered by Stream Chat.
- **Video Calls** — Room-based video calls with speaker layout and call controls using the Stream Video SDK.
- **User Management** — Automatic user provisioning, stream user synchronization, and cleanup via Clerk webhooks handled by Inngest.
- **Error Monitoring** — Sentry integration on both frontend and backend for real-time error tracking and performance monitoring.
- **Responsive UI** — TailwindCSS-based styling with custom Stream Chat theme overrides.

---

## Tech Stack

### Frontend

| Technology | Purpose |
| --- | --- |
| React 19 | UI library |
| Vite 7 | Build tool and dev server |
| TailwindCSS 4 | Utility-first styling |
| React Router 7 | Client-side routing |
| TanStack Query 5 | Server-state management |
| Clerk React | Authentication |
| Stream Chat React | Chat UI components |
| Stream Video React SDK | Video call UI |
| Sentry React | Error & performance monitoring |
| Axios | HTTP client |
| Lucide React | Icons |

### Backend

| Technology | Purpose |
| --- | --- |
| Node.js | Runtime |
| Express 5 | Web framework |
| Mongoose | MongoDB ODM |
| Clerk Express | Authentication middleware |
| Stream Chat | Chat backend & token generation |
| Inngest | Async event handling |
| Sentry Node | Error & performance monitoring |
| CORS | Cross-origin requests |

---

## Project Structure

```
Syncly/
├── backend/
│   ├── src/
│   │   ├── config/          # DB, env, Inngest, Stream, Sentry
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Auth middleware
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API route definitions
│   │   └── server.js        # Application entry point
│   ├── .env                 # Backend environment variables
│   ├── instrument.mjs       # Sentry initialization
│   ├── package.json
│   └── vercel.json          # Vercel deployment config
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components (modals, headers, lists)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # API helpers and Axios config
│   │   ├── pages/           # Auth, Home, Call pages
│   │   ├── providers/       # Auth provider
│   │   ├── styles/          # Custom CSS
│   │   ├── App.jsx          # Route setup
│   │   └── main.jsx         # Application entry point
│   ├── .env                 # Frontend environment variables
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json          # Vercel deployment config
└── README.md
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- npm (bundled with Node.js)
- A [Clerk](https://clerk.com) account and application
- A [Stream](https://getstream.io) account and application
- A [MongoDB](https://mongodb.com) database URI
- A [Sentry](https://sentry.io) project DSN (optional, but recommended)
- An [Inngest](https://inngest.com) account with event and signing keys (for Clerk webhooks)

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/sivasankar55/syncly.git
cd syncly
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

---

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development

CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

STREAM_API_KEY=...
STREAM_API_SECRET=...

SENTRY_DSN=https://...@sentry.io/...

INNGEST_EVENT_KEY=...
INNGEST_SIGNING_KEY=signkey-...

CLIENT_URL=http://localhost:5173,https://syncly-frontend.vercel.app
```

### Frontend (`frontend/.env`)

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_...
VITE_STREAM_API_KEY=...
VITE_SENTRY_DSN=https://...@sentry.io/...
VITE_API_BASE_URL=http://localhost:5001/api
```

> **Note:** `CLIENT_URL` supports multiple origins as a comma-separated list. Include both your local dev URL and deployed frontend URL (e.g., `https://syncly-frontend.vercel.app`). Never commit real `.env` files to version control.

---

## Running Locally

### Start the backend

```bash
cd backend
npm run dev
```

The server will start on `http://localhost:5001` by default.

### Start the frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

The Vite dev server will start on `http://localhost:5173` by default.

Open `http://localhost:5173` in your browser to use the app.

---

## API Reference

| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| GET | `/` | Health check / Hello World | Public |
| GET | `/api/chat/token` | Returns a Stream Chat token for the authenticated user | Protected |
| GET/POST | `/api/inngest` | Inngest event handler for Clerk webhooks | Public (Inngest-signed) |
| GET | `/debug-sentry` | Test endpoint for Sentry integration | Public |

---

## Webhooks & Async Jobs

Syncly uses Inngest to handle Clerk lifecycle events asynchronously:

| Event | Function | Behavior |
| --- | --- | --- |
| `clerk/user.created` | `sync-user` | Creates a user record in MongoDB, upserts the user in Stream, and adds them to all discoverable public channels. |
| `clerk/user.deleted` | `delete-user-from-db` | Removes the user record from MongoDB and deletes the Stream user. |

Configure these events in your Clerk dashboard to send to your Inngest webhook URL (e.g., `https://your-app.com/api/inngest`).

---

## Deployment

Both the frontend and backend are configured for Vercel.

### Backend

The `backend/vercel.json` uses `@vercel/node` and routes all requests to `src/server.js`.

### Frontend

The `frontend/vercel.json` rewrites all routes to `index.html` so React Router handles client-side navigation.

To deploy, push the respective folders to Vercel or connect them as separate Vercel projects.

---

## Monitoring

- **Sentry** is initialized in both frontend (`main.jsx`) and backend (`instrument.mjs`) to capture errors, trace transactions, and monitor performance.
- **React Hot Toast** provides user-friendly toast notifications for authentication and call errors.

---

## Available Scripts

### Backend

```bash
npm run dev      # Start development server with nodemon
npm run start    # Start production server with node
```

### Frontend

```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

---

## Contributing

Contributions are welcome. To propose a change:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes with clear messages.
4. Push the branch and open a Pull Request.

Please ensure the code follows the existing structure and passes linting before submitting.

---

## License

This project is licensed under the [MIT License](LICENSE).
