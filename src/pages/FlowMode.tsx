import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, Cloud, Waves, TreePine, Coffee, Brain, Heart } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const FlowMode: React.FC = () => {
  const { isPlaying, volume, setVolume, playSound, stopSound, audioData } = useAudio();
  const [selectedSoundscape, setSelectedSoundscape] = useState('');
  const [intensity, setIntensity] = useState(50);
  const [focusLevel, setFocusLevel] = useState(75);

  const soundscapes = [
    { id: 'ambient', name: 'Ambient Drone', icon: <Cloud size={24} />, description: 'Deep, atmospheric sounds for concentration' },
    { id: 'nature', name: 'Nature Sounds', icon: <TreePine size={24} />, description: 'Forest, rain, and wind sounds' },
    { id: 'focus', name: 'Focus Flow', icon: <Brain size={24} />, description: 'Scientifically designed for productivity' },
    { id: 'relax', name: 'Relaxation', icon: <Heart size={24} />, description: 'Calming tones for stress relief' },
    { id: 'energize', name: 'Energize', icon: <Coffee size={24} />, description: 'Uplifting sounds for motivation' },
    { id: 'meditate', name: 'Meditation', icon: <Waves size={24} />, description: 'Peaceful sounds for mindfulness' },
  ];

  const handlePlayPause = () => {
    if (isPlaying) {
      stopSound();
    } else if (selectedSoundscape) {
      playSound(selectedSoundscape);
    }
  };

  const handleSoundscapeSelect = (soundscape: string) => {
    setSelectedSoundscape(soundscape);
    if (isPlaying) {
      playSound(soundscape);
    }
  };

  return (
    <div className="page-container">
      <motion.div
        className="page-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="page-title">Flow Mode</h1>
        <p className="page-subtitle">Personalized soundscapes that adapt to your mood and activity</p>
      </motion.div>

      <div className="container-echo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Soundscape Selection */}
          <motion.div
            className="control-panel"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-primary-yellow mb-6">
              Choose Your Soundscape
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {soundscapes.map((soundscape) => (
                <motion.div
                  key={soundscape.id}
                  className={`soundscape-card text-center ${selectedSoundscape === soundscape.id ? 'active' : ''}`}
                  onClick={() => handleSoundscapeSelect(soundscape.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-primary-yellow mb-3 flex justify-center">
                    {soundscape.icon}
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{soundscape.name}</h4>
                  <p className="text-sm text-description">
                    {soundscape.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            className="control-panel"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-primary-yellow mb-6">
              Controls
            </h3>
            
            {/* Play/Pause */}
            <div className="control-group">
              <motion.button
                className={`btn-primary w-full flex items-center justify-center gap-2 ${!selectedSoundscape ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handlePlayPause}
                disabled={!selectedSoundscape}
                whileHover={{ scale: selectedSoundscape ? 1.05 : 1 }}
                whileTap={{ scale: selectedSoundscape ? 0.95 : 1 }}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                {isPlaying ? 'Pause' : 'Play'}
              </motion.button>
            </div>

            {/* Volume Control */}
            <div className="control-group">
              <label className="control-label">
                <Volume2 size={16} className="mr-2" />
                Volume: {Math.round(volume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="control-slider w-full"
              />
            </div>

            {/* Intensity Control */}
            <div className="control-group">
              <label className="control-label">
                Intensity: {intensity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="control-slider w-full"
              />
            </div>

            {/* Focus Level */}
            <div className="control-group">
              <label className="control-label">
                Focus Level: {focusLevel}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={focusLevel}
                onChange={(e) => setFocusLevel(parseInt(e.target.value))}
                className="control-slider w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Audio Visualizer */}
      <div className="container-echo">
        <motion.div
          className="audio-visualizer"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="visualizer-bars">
            {audioData.map((bar, index) => (
              <div
                key={index}
                className="visualizer-bar"
                style={{
                  height: `${bar}%`,
                  opacity: isPlaying ? 1 : 0.3,
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gradient mb-2">
                {selectedSoundscape ? soundscapes.find(s => s.id === selectedSoundscape)?.name : 'Select a Soundscape'}
              </div>
              <div className="text-description">
                {isPlaying ? 'Now Playing' : 'Ready to Play'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Status Display */}
      <div className="container-echo">
        <motion.div
          className="glass-card text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3 className="text-xl font-bold text-primary-yellow mb-6">Current Session</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-description text-sm mb-1">Soundscape</p>
              <p className="text-foreground font-semibold">
                {selectedSoundscape ? soundscapes.find(s => s.id === selectedSoundscape)?.name : 'None Selected'}
              </p>
            </div>
            <div>
              <p className="text-description text-sm mb-1">Status</p>
              <p className={`font-semibold ${isPlaying ? 'text-green-400' : 'text-red-400'}`}>
                {isPlaying ? 'Playing' : 'Paused'}
              </p>
            </div>
            <div>
              <p className="text-description text-sm mb-1">Focus Score</p>
              <p className="text-primary-yellow font-semibold">
                {Math.round((focusLevel + intensity) / 2)}%
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FlowMode; 