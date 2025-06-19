# 📊 Student Progress Management System

A full-stack MERN application to manage and monitor students' programming progress on **Codeforces**.

> 🚀 Built with MongoDB, Express, React, and Node.js  
> 🎯 Tracks Codeforces ratings, contests, problem-solving activity  
> 🔔 Sends inactivity reminders via email  
> 🌙 Supports responsive UI, Dark Mode, and CSV export

---

## 📌 Features

### 🧑‍🎓 Student Table View
- List all enrolled students
- Show:
  - Name, Email, Phone, Codeforces Handle
  - Current Rating & Max Rating
- Actions:
  - View Profile
  - Edit / Delete Student
  - Export all data as CSV

### 📈 Student Profile View
#### A. Contest History
- Filter by: Last 30 / 90 / 365 days
- Line graph for rating changes
- Table: Contest name, rating change, rank, unsolved problems

#### B. Problem Solving Analytics
- Filter by: Last 7 / 30 / 90 days
- Show:
  - Most difficult problem solved
  - Total problems solved
  - Average rating & problems/day
  - Bar chart of problems by rating bucket
  - Submission heatmap

### 🔁 Codeforces Data Sync
- Daily scheduled sync (default: 2 AM)
- Admin controls to:
  - Change sync time & frequency
  - Force sync on handle update
- Last sync time shown per student

### 🚨 Inactivity Detection
- Detect no submissions in last 7 days
- Auto-send email reminders
- Track:
  - Number of reminders sent
  - Toggle to disable reminders for specific students

### 🖥️ Frontend UI
- Responsive layout (mobile + desktop)
- Dark Mode toggle (with localStorage)
- Smooth transitions and modern theme colors

---

## 🛠️ Tech Stack

| Layer     | Tech                                |
|-----------|-------------------------------------|
| Frontend  | React, Tailwind CSS, React Router   |
| Backend   | Node.js, Express.js                 |
| Database  | MongoDB + Mongoose                  |
| Charts    | Chart.js / Recharts / Cal-Heatmap   |
| Cron Jobs | node-cron                           |
| Email     | Nodemailer (Gmail SMTP)             |
| API Sync  | Codeforces Public API               |

---

## 📂 Project Structure

```
student-progress-system/
│
├── client/                # React frontend
│   ├── components/
│   ├── pages/
│   └── App.jsx
│
├── server/                # Node/Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── syncCodeforces.js
│
├── .env                   # Environment config
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🔧 Setup Instructions

### 1. Clone Repo

```bash
git clone https://github.com/Nitesh-18/student-progress-management.git
cd student-progress-management
```

### 2. Backend Setup

```bash
cd server
npm install
```

🧪 Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Start the server:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## ✅ API Endpoints

| Method | Route                       | Description                  |
|--------|-----------------------------|------------------------------|
| GET    | `/api/students`             | Get all students             |
| POST   | `/api/students`             | Add new student              |
| PUT    | `/api/students/update/:id`  | Update a student             |
| DELETE | `/api/students/:id`         | Delete a student             |
| GET    | `/api/students/:id`         | Get student profile          |

---

<!-- ## 🎨 Screenshots

| Dark Mode View | Student Analytics |
|----------------|-------------------|
| ![Dark Mode](./screenshots/dark-mode.png) | ![Profile](./screenshots/profile.png) | -->

---

## 🤝 Contributions

PRs are welcome. For major changes, open an issue first to discuss what you want to change.

---

## 📄 License

MIT License © 2025 Nitesh Ranjankar
