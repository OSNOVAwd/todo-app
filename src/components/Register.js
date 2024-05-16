import React, { useState } from 'react';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      history.push('/dashboard');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h1>Register</h1>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
