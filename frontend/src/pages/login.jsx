import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

function Login({ setUserId }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const res = await axios.post('http://localhost:4000/api/login', { email, password });
      setSuccessMessage(res.data.message);

      // Store the JWT token in localStorage
      localStorage.setItem('authToken', res.data.token);

      // Set userId from response
      const userIdFromResponse = res.data.id;
      setUserId(userIdFromResponse);

      // Redirect to home or dashboard after successful login
      navigate('/home');
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <span 
          onClick={() => navigate('/signup')} 
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          Sign up
        </span>
      </p>
    </div>
  );
}

export default Login;
