import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import FlightsList from './components/FlightsList';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-16">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/flights" 
              element={
                <ProtectedRoute>
                  <FlightsList />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/flights" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
