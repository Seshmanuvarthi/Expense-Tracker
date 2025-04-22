/**
 * ExpenseForm component allows users to add a new expense.
 * It manages form state and handles submission to backend API.
 */

import { useState } from 'react';
import axios from 'axios';
import './ExpenseForm.css';

function ExpenseForm({ userId, onExpenseAdded }) {
  const [categoryName, setCategoryName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [expenseDate, setExpenseDate] = useState('');

  /**
   * Handles form submission.
   * Checks if category exists or creates a new one,
   * then adds the expense with the category.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName || !amount || !expenseDate) {
      alert('Please fill all required fields');
      return;
    }
    try {
      // First, check if category exists or create it
      let categoryId = null;
      // Fetch categories to find if categoryName exists
      const categoriesRes = await axios.get('http://localhost:4000/api/categories');
      const existingCategory = categoriesRes.data.find(cat => cat.category_name.toLowerCase() === categoryName.toLowerCase());
      if (existingCategory) {
        categoryId = existingCategory.category_id;
      } else {
        // Create new category
        const createCatRes = await axios.post('http://localhost:4000/api/categories', { category_name: categoryName });
        categoryId = createCatRes.data.category_id;
      }

      // Now add expense with categoryId
      const res = await axios.post('http://localhost:4000/api/expenses', {
        user_id: userId,
        category: categoryName,
        amount: parseFloat(amount),
        title: description,
        expense_date: expenseDate,
      });
      alert(res.data.message);
      setCategoryName('');
      setAmount('');
      setDescription('');
      setExpenseDate('');
      onExpenseAdded();
    } catch (err) {
      console.error('Failed to add expense', err);
      alert('Failed to add expense');
    }
  };

  // Render the expense form
  return (
    <div className="form-wrapper">
      <form className="container" onSubmit={handleSubmit}>
        <h3>Add New Expense</h3>
        <label>
          Category:
          <input
            type="text"
            value={categoryName}
            onChange={e => setCategoryName(e.target.value)}
            placeholder="Type category"
            required
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={expenseDate}
            onChange={e => setExpenseDate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
