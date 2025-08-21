
# Task Flow App  

A full-stack **task management application** with **user authentication** and a **Kanban board** to organize tasks efficiently.  

## 🚀 Features  

- 🔐 User authentication (Register & Login)  
- 🗂️ Kanban board with three columns: **To-Do**, **In-Progress**, **Done**  
- 📝 Add, edit, and delete tasks with **title, description, and due date**  
- 🔄 **Drag & drop** tasks between columns  
- 📅 Due date tracking  
- ⚡ Responsive and intuitive UI  

## 🛠️ Tech Stack  

- **Frontend**: React + TailwindCSS  
- **Backend**: Laravel (Dockerized)  
- **Database**: MySQL (Dockerized)  

## 🔧 Installation & Setup  

### 1. Clone the repository  
```bash
git clone https://github.com/your-username/task-flow-app.git
```

---

### 2. Backend Setup (Laravel with Docker)  
```bash
cd backend

# Build and start containers
docker-compose up -d --build

# Run migrations
docker exec -it backend php artisan migrate
```

---

### 3. Frontend Setup (React)  
```bash
cd frontend
npm install
npm run dev
```

---

### 4. Access the App  
- Backend API → `http://localhost:8000`  
- Frontend → `http://localhost:5173`  

## 📂 Project Structure  

```
task-flow-app/
│
├── backend/          # Laravel backend (Dockerized)
│   ├── app/
│   ├── routes/
│   ├── docker-compose.yml
│   └── ...
│
├── frontend/         # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```
