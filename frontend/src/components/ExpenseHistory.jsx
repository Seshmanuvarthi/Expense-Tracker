import { useState, useEffect } from 'react';
import axios from 'axios';

function ExpenseHistory({ userId }) {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = () => {
    axios.get('http://localhost:4000/api/expenses', { params: { user_id: userId } })
      .then(res => {
        setExpenses(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch expenses', err);
      });
  };

  const fetchExpenses = () => {
    axios.get('http://localhost:4000/api/expenses', { params: { user_id: userId } })
      .then(res => {
        // Show only last 5 expenses
        setExpenses(res.data.slice(0, 5));
      })
      .catch(err => {
        console.error('Failed to fetch expenses', err);
      });
  };

  useEffect(() => {
    if (userId) {
      fetchExpenses();
    }
  }, [userId, refresh]);

  useEffect(() => {
    if (userId) {
      fetchExpenses();
    }
  }, [userId, refresh]);
  
  const fetchExpenses = () => {
    axios.get('http://localhost:4000/api/expenses', { params: { user_id: userId } })
      .then(res => {
        // Show only last 5 expenses
        setExpenses(res.data.slice(0, 5));
      })
      .catch(err => {
        console.error('Failed to fetch expenses', err);
      });
  };

  return (
    <div>
      <h3>Expense History</h3>
      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id}>
                <td>{new Date(expense.expense_date).toLocaleDateString()}</td>
                <td>{expense.category}</td>
                <td>{expense.title}</td>
                <td>${Number(expense.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExpenseHistory;
