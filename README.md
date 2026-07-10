<div align="center">

# 🚀 AI Powered Code Reviewer

### 🤖 Intelligent AI-Powered Code Analysis & Review Platform

Web URL : https://ai-powered-code-reviewer-cyan.vercel.app/

**Analyze • Detect • Secure • Optimize • Refactor**

⭐ Intelligent Code Review • AI Refactoring • Security Analysis • Performance Insights ⭐

<br>

![GitHub repo size](https://img.shields.io/github/repo-size/SelvanayakiSelvaraj/AI-Powered-Code-Reviewer?color=6C63FF&style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/SelvanayakiSelvaraj/AI-Powered-Code-Reviewer?color=6C63FF&style=for-the-badge)
![GitHub stars](https://img.shields.io/github/stars/SelvanayakiSelvaraj/AI-Powered-Code-Reviewer?color=6C63FF&style=for-the-badge)

</div>

---

## 📖 About

**AI Powered Code Reviewer** is an intelligent full-stack web application that leverages **Google Gemini AI** to analyze source code, identify bugs, detect security vulnerabilities, estimate complexity, recommend optimizations, and generate AI-powered refactored code.

The platform securely stores every review in **MongoDB Atlas**, enabling users to revisit previous analyses, monitor improvements through analytics, and continuously enhance code quality.

---

## ✨ Key Features

| 🚀 Feature | Description |
|---|---|
| 🤖 **AI Code Review** | Intelligent review powered by Google Gemini |
| 🐞 **Bug Detection** | Detects syntax, runtime and logical errors |
| 🛡️ **Security Analysis** | Identifies SQL Injection, XSS & hardcoded secrets |
| ⚡ **Complexity Analysis** | Calculates Time & Space Complexity |
| 💡 **Optimization Suggestions** | Recommends better algorithms and coding practices |
| 🔄 **AI Refactoring** | Generates cleaner and optimized code |
| 📂 **History** | Stores all previous reviews |
| 📊 **Analytics Dashboard** | Visualizes code quality improvements |
| 🔐 **Authentication** | Secure JWT Login & Signup |
| 🌙 **Theme Support** | Modern Light & Dark Mode |

---

## 🏗️ System Architecture

### 🔄 Application Workflow

```
User → Frontend (React + Vite)
          ↓
      Backend API (Node.js + Express)
          ↓
   ┌──────────────────────┐
   │   Google Gemini AI   │  ←── AI Code Analysis
   └──────────────────────┘
          ↓
   MongoDB Atlas (Store Reviews)
          ↓
   Response → Frontend Dashboard
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| 🎨 **Frontend** | React, Vite, Tailwind CSS, JavaScript |
| ⚙️ **Backend** | Node.js, Express.js |
| 🗄️ **Database** | MongoDB Atlas |
| 🤖 **AI Engine** | Google Gemini API |
| 🔐 **Authentication** | JWT, bcrypt |
| 📊 **Charts** | Recharts |
| 🔧 **Version Control** | Git & GitHub |

---

## 📂 Project Structure

```plaintext
AI-Powered-Code-Reviewer/
│
├── backend/                         # Node.js + Express Backend
│   ├── config/                      # Database configuration
│   ├── controllers/                 # Route controllers
│   ├── middlewares/                 # Auth & error middlewares
│   ├── models/                      # MongoDB models
│   ├── routes/                      # API routes
│   ├── services/                    # Gemini AI service
│   └── server.js                    # Entry point
│
├── frontend/                        # React + Vite Frontend
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   ├── context/                 # Auth & Theme context
│   │   ├── pages/                   # Application pages
│   │   └── services/                # API service layer
│   └── index.html
│
├── Documents/                       # Project Documentation
│   ├── Project_Overview.md
│   ├── API_Documentation.md
│   ├── Database_Documentation.md
│   ├── Prompt_Engineering.md
│   ├── System_Architecture.md
│   └── User_Manual.md
│
├── README.md
├── .env.example                     # Environment variable template
├── docker-compose.yml               # Docker configuration
└── start.bat                        # Quick start script (Windows)
```

---

## 📡 REST APIs

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register User |
| `POST` | `/auth/login` | User Login |
| `POST` | `/reviews/analyze` | Analyze Source Code |
| `GET` | `/reviews/history` | Fetch Previous Reviews |
| `GET` | `/reviews/analytics` | Analytics Dashboard |

---

## 💾 Database

### 👤 Users Collection

| Field | Type | Description |
|---|---|---|
| `name` | String | User's full name |
| `email` | String | Unique email address |
| `password` | String | bcrypt encrypted password |
| `createdAt` | Date | Account creation timestamp |

### 📑 Reviews Collection

| Field | Type | Description |
|---|---|---|
| `programmingLanguage` | String | Language of submitted code |
| `sourceCode` | String | Original source code |
| `qualityScore` | Number | Overall quality score |
| `bugs` | Array | Detected bugs |
| `securityIssues` | Array | Security vulnerabilities |
| `optimizationSuggestions` | Array | Improvement suggestions |
| `refactoredCode` | String | AI-generated refactored code |
| `timeComplexity` | String | Time complexity (Big-O) |
| `spaceComplexity` | String | Space complexity (Big-O) |
| `createdAt` | Date | Review timestamp |

---

## 🚀 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SelvanayakiSelvaraj/AI-Powered-Code-Reviewer.git
cd AI-Powered-Code-Reviewer
```

### 2. Setup Backend

```bash
cd backend
npm install
npm run dev
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

### 4. Open in Browser

```
http://localhost:5173
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

> 💡 Refer to `.env.example` for the full list of required variables.

---

 
---

## 🎯 Future Enhancements

- 🔍 **GitHub Repository Analysis** — Review entire GitHub repos
- 💻 **VS Code Extension** — Review code directly from VS Code
- 📁 **Multi-file Code Review** — Analyze multiple files together
- 🤖 **AI Coding Assistant** — Interactive AI chat for code help
- 👥 **Team Collaboration** — Share reviews with team members
- 🔄 **CI/CD Integration** — Auto-review on every push

---

## 👩‍💻 Developer

<div align="center">

**Selvanayaki S**

*B.E. Electronics and Communication Engineering*
*VSB Engineering College*

[![GitHub](https://img.shields.io/badge/GitHub-SelvanayakiSelvaraj-6C63FF?style=for-the-badge&logo=github)](https://github.com/SelvanayakiSelvaraj)

</div>

---

<div align="center">

⭐ **If you found this project helpful, please give it a star!** ⭐

Made with ❤️ by Selvanayaki S

</div>
