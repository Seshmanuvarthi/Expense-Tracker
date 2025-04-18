import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setUserId }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/login', { email, password });
      alert(res.data.message);

      // Store the JWT token in localStorage
      localStorage.setItem('authToken', res.data.token);

      // Set userId from response
      const userIdFromResponse = res.data.id;
      setUserId(userIdFromResponse);

      // Redirect to home or dashboard after successful login
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
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