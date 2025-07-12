import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import FlowMode from './pages/FlowMode';
import JamMode from './pages/JamMode';
import PlayMode from './pages/PlayMode';
import { AudioProvider } from './context/AudioContext';

function App() {
  return (
    <AudioProvider>
      <Router>
        <div className="App">
          <Navigation />
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/flow" element={<FlowMode />} />
              <Route path="/jam" element={<JamMode />} />
              <Route path="/play" element={<PlayMode />} />
            </Routes>
          </motion.main>
        </div>
      </Router>
    </AudioProvider>
  );
}

export default App;
