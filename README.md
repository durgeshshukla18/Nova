# 🌌 Nova AI – Full Stack Project

Nova AI is a **full-stack AI assistant** that allows users to chat with an AI, generate images, and manage their credits through an easy-to-use web app.  

Built with **React (frontend)** and **Node.js + Express + MongoDB (backend)**, it integrates **OpenAI** for text responses and **ImageKit** for image generation.

---

## ✨ Features

- 🧑‍💻 User authentication (register, login, JWT-secured)
- 💬 Chat with AI (text-based messages)
- 🖼️ Generate AI-powered images
- 💳 Credit-based system (deducts credits per action)
- 📂 Saved chats for each user
- 🌗 Light/Dark mode support on frontend
- ⚡ Fully responsive UI with TailwindCSS

---

## 🛠️ Tech Stack

### Frontend (client/)
- React + Vite
- Redux Toolkit (state management)
- TailwindCSS (UI styling)
- React Markdown + PrismJS (syntax highlighting in chats)

### Backend (server/)
- Node.js + Express
- MongoDB + Mongoose
- OpenAI SDK (text generation)
- ImageKit API (image generation & hosting)
- JWT Authentication
- Axios

---

## 📂 Folder Structure
Nova-AI/
│── client/ # React frontend
│ └── README.md # Docs for client
│
│── server/ # Express backend API
│ └── README.md # Docs for server
│
│── package.json # Root dependencies (if any)
│── README.md # This file

---

## 🚀 Usage

1. Register or log in as a user.

2. Start a new chat.

3. Type a prompt to get AI responses.

4. Generate AI images using the image mode.

5. Manage your credits (each text/image generation deducts credits).

---
## 👨‍💻 Author

Developed by Durgesh Shukla ✨<br>
Contributions are welcome! Feel free to fork, raise issues, or submit PRs.