import { useState, useEffect } from 'react';
import axios from 'axios';

function MonthlySummary({ userId }) {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    if (!userId) return;
    axios.get('http://localhost:4000/api/summary', { params: { user_id: userId } })
      .then(res => {
        setSummary(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch monthly summary', err);
      });
  }, [userId]);

  return (
    <div>
      <h3>Monthly Expense Summary</h3>
      {summary.length === 0 ? (
        <p>No summary data available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {summary.map(item => (
              <tr key={item.month}>
                <td>{item.month}</td>
                <td>${item.total_amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MonthlySummary;
