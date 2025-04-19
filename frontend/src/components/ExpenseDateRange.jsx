import { useState } from 'react';
import axios from 'axios';
import './ExpenseDateRange.css';

function ExpenseDateRange({ userId }) {
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

  return (
    <div className="expense-date-range">
      <h3>Expense History (Date Range)</h3>
      <div>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </label>
        <button className="fetch-btn" onClick={fetchExpenses}>
          Fetch Expenses
        </button>
      </div>
      {expenses.length === 0 ? (
        <p>No expenses found for the selected date range.</p>
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

export default ExpenseDateRange;
