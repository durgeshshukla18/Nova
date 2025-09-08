# 📌 Client (Nova AI Frontend)

This folder contains the **frontend application** for the Nova AI project.  
It is built using **React (Vite)** and provides a modern, responsive UI for chatting with the AI assistant, managing credits, and exploring features like image generation and code highlighting.

---

## 🚀 Tech Stack
- ⚛️ **React 18** – Component-based UI
- 🎨 **TailwindCSS** – Utility-first styling
- 🛣️ **React Router** – Routing and navigation
- 🔥 **React Hot Toast** – Notifications
- 📦 **Axios** – API requests
- 📝 **React Markdown + PrismJS** – Rendering markdown and syntax highlighting
- 🌙 **Dark Mode Support** – Theme toggle
- ⚡ **Vite** – Fast bundler and dev server

---

## 📂 Folder Structure
client/
│── public/              # Static assets (favicons, images, etc.)
│── src/
│   ├── assets/          # Dummy data, logos, etc.
│   ├── components/      # Reusable UI components (ChatBox, Message, Credits, etc.)
│   ├── context/         # Global state using React Context API
│   ├── pages/           # Page-level components (Home, Credits, etc.)
│   ├── App.jsx          # Root app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Tailwind and global styles
│
│── .env                 # Environment variables
│── package.json         # Dependencies and scripts
│── vite.config.js       # Vite configuration
│── README.md            # Project documentation (this file)



---

## ⚙️ Installation & Setup

1. **Navigate to the client folder**
   ```sh
   cd client
   ```

2. **Install dependencies**
    ```sh
    npm install
    ```
3. **Set environment variables**<br>
Create a .env file in the client directory:
    ```env
    VITE_SERVER_URL=http://localhost:5000
    ```

4. ** Start development server
    ```sh
    npm run dev
    ```

---

**📜 Available Scripts**

- `npm run dev` – Start development server

- `npm run build` – Build for production

- `npm run preview` – Preview production build

- `npm run lint` – Run linting

---

**✨ Features**

- 🔑 Authentication support with JWT

- 💬 Real-time chat interface (AI + User messages)

- 🖼️ AI Image Rendering directly in chat bubbles

- 📊 Credit Management System with plans

- 🌙 Dark/Light theme toggle

- 📖 Markdown rendering (code, lists, links, etc.)

- 🎨 Responsive design for desktop and mobile


**🤝 Contributing**

1. Fork the repository

2. Create a new branch (`feature/your-feature`)

3. Commit your changes

4. Push and create a PR

