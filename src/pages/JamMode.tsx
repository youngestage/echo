import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Share2, Mic, MicOff, Volume2, Plus, Trash2, Settings } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

interface Collaborator {
  id: string;
  name: string;
  color: string;
  isActive: boolean;
}

interface SoundLayer {
  id: string;
  name: string;
  type: string;
  volume: number;
  createdBy: string;
  color: string;
}

const JamMode: React.FC = () => {
  const { isPlaying, volume, setVolume, playSound, stopSound, audioData } = useAudio();
  const [isRecording, setIsRecording] = useState(false);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    { id: '1', name: 'You', color: '#ff6b6b', isActive: true },
    { id: '2', name: 'Alex', color: '#4ecdc4', isActive: true },
    { id: '3', name: 'Sam', color: '#ffd93d', isActive: false },
  ]);
  const [soundLayers, setSoundLayers] = useState<SoundLayer[]>([
    { id: '1', name: 'Ambient Base', type: 'ambient', volume: 0.7, createdBy: '1', color: '#ff6b6b' },
    { id: '2', name: 'Nature Layer', type: 'nature', volume: 0.5, createdBy: '2', color: '#4ecdc4' },
  ]);
  const [roomCode, setRoomCode] = useState('ECHO-2024');

  const handleAddLayer = () => {
    const newLayer: SoundLayer = {
      id: Date.now().toString(),
      name: `Layer ${soundLayers.length + 1}`,
      type: 'ambient',
      volume: 0.5,
      createdBy: '1',
      color: '#ff6b6b',
    };
    setSoundLayers([...soundLayers, newLayer]);
  };

  const handleRemoveLayer = (layerId: string) => {
    setSoundLayers(soundLayers.filter(layer => layer.id !== layerId));
  };

  const handleLayerVolumeChange = (layerId: string, newVolume: number) => {
    setSoundLayers(soundLayers.map(layer => 
      layer.id === layerId ? { ...layer, volume: newVolume } : layer
    ));
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      stopSound();
    } else {
      playSound('ambient');
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
        <h1 className="page-title">Jam Mode</h1>
        <p className="page-subtitle">Collaborative sonic canvas for real-time creation</p>
      </motion.div>

      {/* Room Info */}
      <div className="container-echo">
        <motion.div
          className="glass-card mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-primary-yellow">Room: {roomCode}</h3>
            <motion.button
              className="btn-secondary flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 size={16} />
              Share Room
            </motion.button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <Users size={20} className="text-primary-yellow" />
              <span className="text-description">
                {collaborators.filter(c => c.isActive).length} active collaborators
              </span>
            </div>
            <div className="flex gap-2 ml-auto">
              {collaborators.map(collaborator => (
                <motion.div
                  key={collaborator.id}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                    collaborator.isActive ? 'ring-2 ring-white' : 'opacity-50'
                  }`}
                  style={{ backgroundColor: collaborator.color }}
                  whileHover={{ scale: 1.1 }}
                  title={collaborator.name}
                >
                  {collaborator.name[0]}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Sound Layers */}
          <motion.div
            className="control-panel"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-primary-yellow">Sound Layers</h3>
              <motion.button
                className="btn-secondary flex items-center gap-2 text-sm"
                onClick={handleAddLayer}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={16} />
                Add Layer
              </motion.button>
            </div>

            <div className="space-y-4">
              {soundLayers.map((layer) => (
                <motion.div
                  key={layer.id}
                  className="sound-layer"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{ borderColor: layer.color }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-foreground font-semibold">{layer.name}</h4>
                    <motion.button
                      onClick={() => handleRemoveLayer(layer.id)}
                      className="p-2 rounded-md bg-red-500/20 border border-red-400 text-red-400 hover:bg-red-500/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                  <div className="flex items-center gap-2 text-sm mb-3">
                    <span className="text-description">Created by:</span>
                    <span className="font-semibold" style={{ color: layer.color }}>
                      {collaborators.find(c => c.id === layer.createdBy)?.name}
                    </span>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-description text-sm">Volume</label>
                      <span className="text-foreground text-sm font-medium">
                        {Math.round(layer.volume * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={layer.volume}
                      onChange={(e) => handleLayerVolumeChange(layer.id, parseFloat(e.target.value))}
                      className="control-slider w-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recording Controls */}
          <motion.div
            className="control-panel"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-primary-yellow mb-6">Recording Controls</h3>
            
            {/* Recording Button */}
            <div className="control-group">
              <motion.button
                className={`btn-primary w-full flex items-center justify-center gap-2 ${
                  isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : ''
                }`}
                onClick={handleToggleRecording}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </motion.button>
            </div>

            {/* Master Controls */}
            <div className="control-group">
              <motion.button
                className="btn-secondary w-full flex items-center justify-center gap-2"
                onClick={handlePlayPause}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? 'Pause Session' : 'Play Session'}
              </motion.button>
            </div>

            {/* Master Volume */}
            <div className="control-group">
              <label className="control-label">
                <Volume2 size={16} className="mr-2" />
                Master Volume: {Math.round(volume * 100)}%
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

            {/* Session Settings */}
            <div className="mt-8">
              <h4 className="text-foreground font-semibold mb-4 flex items-center gap-2">
                <Settings size={16} />
                Session Settings
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-description text-sm">Auto-sync</span>
                  <div className="w-10 h-6 bg-primary-yellow rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-description text-sm">Loop recording</span>
                  <div className="w-10 h-6 bg-cream-400 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-description text-sm">Metronome</span>
                  <div className="w-10 h-6 bg-primary-yellow rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Collaborative Canvas */}
      <div className="container-echo">
        <motion.div
          className="audio-visualizer relative h-80"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="visualizer-bars">
            {audioData.map((bar, index) => (
              <div
                key={index}
                className="visualizer-bar"
                style={{
                  height: `${bar}%`,
                  opacity: isPlaying ? 1 : 0.3,
                  background: `linear-gradient(to top, ${collaborators[index % collaborators.length].color}, #ffde59)`,
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gradient mb-2">
                {isPlaying ? 'Collaborative Session Active' : 'Ready to Jam'}
              </div>
              <div className="text-description">
                {soundLayers.length} layers • {collaborators.filter(c => c.isActive).length} collaborators
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JamMode; 