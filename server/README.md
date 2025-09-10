# 🚀 Nova AI Server (Backend)

This is the **backend API** for the Nova AI project.  
It powers the chat system, AI text responses, image generation, user authentication, and credit management.  

Built with **Node.js, Express, MongoDB, and OpenAI/ImageKit integrations**.

---

## 📌 Features

- 🔑 User authentication (JWT-based)
- 💬 AI-powered chat (text + image modes)
- 🖼️ AI image generation via ImageKit
- 💳 Credit-based system (consumes credits per request)
- 📂 MongoDB for persisting chats, users, and credit plans
- ⚡ REST API with secure routes and middleware

---

## 🛠️ Tech Stack

- **Node.js + Express** – Backend framework
- **MongoDB + Mongoose** – Database & models
- **OpenAI SDK** – AI text responses
- **ImageKit** – AI image generation & hosting
- **JWT** – Authentication
- **Axios** – HTTP requests for image generation

---

## 📂 Folder Structure
server/
│── configs/ # API keys and external service configs
│── controllers/ # API controllers (chat, messages, auth, credits)
│── middlewares/ # Auth & validation middleware
│── models/ # MongoDB models (User, Chat, CreditPlan)
│── routes/ # Express API routes
│── utils/ # Helper functions
│── server.js # Main entry point
│── .env # Environment variables


---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repo
```bash
git clone https://github.com/yourusername/nova-ai.git
cd server
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Create a .env file
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# OpenAI API
OPENAI_API_KEY=your_openai_key

# ImageKit API
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

### 4️⃣ Start the server
```bash
npm run dev
```
Server will run at 👉 http://localhost:5000

---

## 🔑 API Endpoints
### Auth

- POST `/api/auth/register` → Register new user

- POST `/api/auth/login` → Login and get token

- GET `/api/user/data` → Get logged-in user details

### Chat

- POST `/api/chat/create` → Create a new chat

- GET `/api/chat/get` → Fetch all chats of a user

- DELETE `/api/chat/:id` → Delete a chat

### Messages

- POST `/api/message/text` → Send a text prompt, get AI reply

- POST `/api/message/image` → Send a prompt, get AI image

### Credits

- GET `/api/credit/plan` → Fetch available credit plans

- POST `/api/credit/buy` → Buy a credit plan

---

## 🔒 Middleware

- **authMiddleware** → Protects routes by validating JWT tokens

- **creditCheck** → Ensures users have enough credits before AI requests

---

## 📦 Models
### User
```js
{
  name: String,
  email: String,
  password: String,
  credits: Number
}
```

### Chat
```js
{
  userId: String,
  userName: String,
  name: String,
  messages: [
    {
      role: "user" | "assistant",
      content: String,
      isImage: Boolean,
      timestamp: Date
    }
  ]
}
```

### CrediPlan
```js
{
  name: String,
  credits: Number,
  price: Number,
  features: [String]
}
```

---
## 📜 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Developed by **Durgesh Shukla**✨<br>
Feel free to contribute or raise issues!