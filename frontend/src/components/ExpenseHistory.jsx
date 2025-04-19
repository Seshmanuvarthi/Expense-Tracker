import { useState, useEffect } from 'react';
import axios from 'axios';

function ExpenseHistory({ userId }) {
  const [expenses, setExpenses] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchExpenses = () => {
    const params = { user_id: userId };
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;

    axios.get('http://localhost:4000/api/expenses', { params })
      .then(res => {
        setExpenses(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch expenses', err);
      });
  };

  useEffect(() => {
    if (userId) {
      fetchExpenses();
    }
  }, [userId]);

  return (
    <div>
      <h3>Expense History</h3>
      <div>
        <label>
          Start Date:{' '}
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </label>
        <label style={{ marginLeft: '1rem' }}>
          End Date:{' '}
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </label>
        <button onClick={fetchExpenses} style={{ marginLeft: '1rem' }}>
          Fetch Expenses
        </button>
      </div>
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
