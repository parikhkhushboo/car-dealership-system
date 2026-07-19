# 🚗 Car Dealership Management System

## 📌 Project Overview
This is a full-stack web application for managing a car dealership. It allows users to browse vehicles and admins to manage inventory.

---

## ⚙️ Tech Stack

Frontend:
- React.js
- Tailwind CSS

Backend:
- Node.js
- Express.js

Database:
- MongoDB Atlas

Authentication:
- JWT (JSON Web Token)

---

## ✨ Features

### 👤 User
- Register & Login
- View available vehicles
- Purchase vehicles

### 🔐 Admin
- Add vehicles
- Update/Delete vehicles
- Restock vehicles
- View users/admins

---

## 🛠️ Setup Instructions

### 🔹 1. Clone Repo

```bash
git clone https://github.com/parikhkhushboo/car-dealership-system.git
cd car-dealership-system

### 🔹 2. Backend SetupBashcd backend

```bash
npm install

### Create a .env file in the backend directory and add the following environment

variables:Code snippetPORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key


Start the backend server:Bashnpm run dev

### 🔹 3. Frontend SetupBashcd ../frontend

npm install
npm start

### 📸 Screenshots
  ###🏠 Vehicles Page
  ### 🔐Login Page
  ![Vehicles](./frontend/public/screenshots/vehicles.png)
  
###🤖 AI Usage Disclosure
-- This project was developed with assistance from AI tools (ChatGPT) for the following tasks:

--Debugging backend errors and edge cases
--Designing and styling the frontend UI with Tailwind CSS
--Writing initial API routing logic
--Refactoring and improving overall code structureNote: All final code was reviewed, thoroughly understood, and modified by the author.

### 🧪 Test Report (Manual Testing)FeatureStatusRegister        ✅ Passed
Login                        ✅ Passed
Role-based access            ✅ Passed
Add vehicle                  ✅ Passed
Purchase vehicle             ✅ Passed


📂 Project StructurePlaintextcar-dealership/
│
├── backend/          # Node.js + Express backend source code
├── frontend/         # React.js frontend source code
├── README.md         # Project documentation
└── PROMPTS.md        # AI prompt history documentation


✍️ AuthorKhushboo Parikh


