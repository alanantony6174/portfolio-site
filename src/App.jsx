import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProjectDetails from './components/ProjectDetails';
import Footer from './components/Footer';
import Background3D from './components/Background3D';

function App() {
  return (
    <div className="min-h-screen bg-transparent text-gray-900 font-sans relative">
      <Background3D />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

