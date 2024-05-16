import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../Login';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders login form', () => {
  const { getByPlaceholderText, getByText } = render(
    <Router>
      <Login />
    </Router>
  );

  getByPlaceholderText('Email');
  getByPlaceholderText('Password');
  getByText('Login');
});

test('allows user to login', () => {
  const { getByPlaceholderText, getByText } = render(
    <Router>
      <Login />
    </Router>
  );

  fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@test.com' } });
  fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });
  fireEvent.click(getByText('Login'));
});
