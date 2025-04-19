import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log('🟡 Submitting signup:', { name, email, password });

    try {
      const res = await axios.post('http://localhost:4000/api/signup', {
        name,
        email,
        password,
      });
      console.log('✅ Response:', res.data);
      alert(res.data.message);
      navigate('/');
    } catch (err) {
      console.error('❌ Error:', err.response?.data || err.message);
      alert(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account?{' '}
        <span
          onClick={() => navigate('/')}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Signup;
