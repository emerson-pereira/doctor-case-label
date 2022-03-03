import React from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import MainSection from './components/MainSection';
import TopBar from './components/TopBar';
import AuthProvider, { useAuth } from './contexts/auth';
import StateProvider from './contexts/state';

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user.name) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <StateProvider>
      <AuthProvider>
        <div className="App">
          <TopBar />

          <Routes>
            <Route path="/" element={
              <RequireAuth>
                <MainSection />
              </RequireAuth>
            } />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </AuthProvider>
    </StateProvider>
  );
}

export default App;
