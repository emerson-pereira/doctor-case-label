import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import MainSection from './components/MainSection';
import TopBar from './components/TopBar'

function App() {
  return (
    <div className="App">
      <TopBar />
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
