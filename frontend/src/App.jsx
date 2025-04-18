import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/Signup';
import ExpenseForm from './components/ExpenseForm';
import ExpenseHistory from './components/ExpenseHistory';
import MonthlySummary from './components/MonthlySummary';
import { useState } from 'react';

function App() {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserId(null);
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={<Login setUserId={setUserId} />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/home"
        element={
          <>
            <h1>Expense Tracker Dashboard</h1>
            {userId ? (
              <>
                <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
                <ExpenseForm userId={userId} onExpenseAdded={() => {}} />
                <ExpenseHistory userId={userId} />
                <MonthlySummary userId={userId} />
              </>
            ) : (
              <>
                <p>Please login to view your expenses.</p>
                <Link to="/">Go to Login</Link>
              </>
            )}
          </>
        }
      />
    </Routes>
  );
}

export default App;