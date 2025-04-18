import { useState } from 'react';
import axios from 'axios';

function ExpenseForm({ userId, onExpenseAdded }) {
  const [categoryName, setCategoryName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [expenseDate, setExpenseDate] = useState('');

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
        category_id: categoryId,
        amount: parseFloat(amount),
        description,
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

  return (
    <form onSubmit={handleSubmit}>
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
      <br />
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
      <br />
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </label>
      <br />
      <label>
        Date:
        <input
          type="date"
          value={expenseDate}
          onChange={e => setExpenseDate(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;