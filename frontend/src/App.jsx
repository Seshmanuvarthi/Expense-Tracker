import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/Signup';
import ExpenseForm from './components/ExpenseForm';
import ExpenseHistory from './components/ExpenseHistory';
import MonthlySummary from './components/MonthlySummary';
import ErrorBoundary from './components/ErrorBoundary';
import { useState, useEffect } from 'react';

function App() {
  const [id, setId] = useState(() => {
    // Initialize id from localStorage if available
    const storedId = localStorage.getItem('id');
    return storedId ? parseInt(storedId, 10) : null;
  });
  const [refreshExpenses, setRefreshExpenses] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== null) {
      localStorage.setItem('id', id);
    } else {
      localStorage.removeItem('id');
    }
  }, [id]);

  const handleLogout = () => {
    setId(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('id');
    navigate('/');
  };

  const handleExpenseAdded = () => {
    setRefreshExpenses(prev => !prev);
  };

  return (
    <Routes>
      <Route path="/" element={<Login setUserId={setId} />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/home"
        element={
          <>
            <h1>Expense Tracker Dashboard</h1>
            {id ? (
              <>
                <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
                <ErrorBoundary>
                  <ExpenseForm userId={id} onExpenseAdded={handleExpenseAdded} />
                  <ExpenseHistory userId={id} refresh={refreshExpenses} />
                  <MonthlySummary userId={id} />
                </ErrorBoundary>
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
