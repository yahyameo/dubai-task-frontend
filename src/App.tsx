import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import { CssBaseline, Container } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="sm">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />}
          />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick />
      </Container>
    </Router>
  );
}

export default App;