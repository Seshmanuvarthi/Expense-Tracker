# 💸 Expense Tracker Web Application

A full-stack Expense Tracker web application built with **React** (frontend) and **Node.js/Express** (backend). This app helps users manage their expenses efficiently with features like user authentication, expense history tracking, category filtering, and date-based reports.

---

## 📌 Features

### 🔐 User Authentication
- Signup and login pages with inline success/error messages.
- Secure JWT-based authentication with token stored in localStorage.

### 💰 Expense Management
- Add new expenses with category, amount, title, and date.
- View last 5 expenses instantly.
- Filter expenses by custom date range.

### 📊 Categories
- Add and manage custom expense categories.
- Organize your expenses for better insights.

### 🧾 History & Reporting
- View a history of your expenses.
- Filter by date to review past spending.

### 🌐 Responsive UI
- Clean and user-friendly design.
- Fully responsive for mobile and desktop views.
- Styled with dedicated CSS files per component/page.

### 🧯 Robust Error Handling
- ErrorBoundary component in React to catch and display frontend errors gracefully.

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- Context API (or Redux if added)
- CSS Modules / Plain CSS
- Axios

### Backend
- Node.js
- Express.js
- JWT for Authentication
- bcrypt for Password Hashing
- CORS
- dotenv

### Database
- SQLite
- Tables:
  - `Users` — `id`, `name`, `email`, `password`
  - `Categories` — `category_id`, `category_name`
  - `Expenses` — `id`, `user_id`, `category`, `amount`, `title`, `expense_date`

---

## 📦 Installation & Setup

### 🔹 Backend

1. Navigate to the backend folder:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the backend root and add:

    ```
    DB_HOST=
    DB_USER=
    DB_PASSWORD=
    DB_NAME=
    PORT=
    ```

4. Start the backend server:

    ```bash
    npm start
    ```

---

### 🔹 Frontend

1. Navigate to the frontend folder:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the React app:

    ```bash
    npm start
    ```

The app will run at `http://localhost:5173`.

---

## 🚀 Future Enhancements

- Pie & bar chart analytics using Chart.js or Recharts
- Monthly budget planning and alerts
- Export/Import expenses to/from CSV
- Dark mode toggle
- Recurring expense automation

---

## 📧 Contact

Created by **M. Seshadri Naidu** — [LinkedIn](https://www.linkedin.com/in/seshadri-naidu-manuvarthi-366466295/) | [GitHub](https://github.com/Seshmanuvarthi)
