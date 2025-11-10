# E-Commerce Assessment

This repo is a lightweight e-commerce demo with a React + Vite frontend and Node + Express + MongoDB backend.

Features:
- Browse products
- View product details
- Add/update/remove items in cart (persistent in MongoDB)
- Simple responsive UI

## Quick start (15 minutes)

Prereqs: Node.js (16+), npm, Git.

1. Unzip the project and open a terminal.

2. Start backend:
   cd backend
   cp .env.example .env
   # edit .env and set MONGODB_URI (use MongoDB Atlas or local mongodb://localhost:27017/ecommerce)
   npm install
   npm run seed
   npm run dev

3. Start frontend (in a second terminal):
   cd frontend
   npm install
   npm run dev

4. Open http://localhost:5173 in your browser.


