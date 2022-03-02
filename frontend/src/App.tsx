import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import MainSection from './components/MainSection';
import TopBar from './components/TopBar'

function App() {
  return (
    <div className="App">
      <TopBar />
      <Routes>
        <Route path="/" element={<MainSection />} />
      </Routes>
    </div>
  );
}

export default App;
