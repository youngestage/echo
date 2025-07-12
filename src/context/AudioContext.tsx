import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  volume: number;
  currentMode: string;
  audioData: number[];
  setIsPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  setCurrentMode: (mode: string) => void;
  playSound: (soundType: string) => void;
  stopSound: () => void;
  generateAudioData: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentMode, setCurrentMode] = useState('');
  const [audioData, setAudioData] = useState<number[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window !== 'undefined' && window.AudioContext) {
      audioContextRef.current = new window.AudioContext();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playSound = (soundType: string) => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    // Stop any existing sound
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
    }

    // Create new oscillator
    const oscillator = audioContextRef.current.createOscillator();
    oscillatorRef.current = oscillator;

    // Set frequency based on sound type
    const frequencies: { [key: string]: number } = {
      ambient: 220,
      nature: 440,
      focus: 528,
      relax: 174,
      energize: 741,
      meditate: 396,
    };

    oscillator.frequency.setValueAtTime(
      frequencies[soundType] || 440,
      audioContextRef.current.currentTime
    );

    // Set wave type
    oscillator.type = 'sine';

    // Connect to gain node
    oscillator.connect(gainNodeRef.current);

    // Start the sound
    oscillator.start();
    setIsPlaying(true);

    // Auto-stop after 30 seconds
    setTimeout(() => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        setIsPlaying(false);
      }
    }, 30000);
  };

  const stopSound = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      setIsPlaying(false);
    }
  };

  const generateAudioData = () => {
    // Generate random audio visualization data
    const newAudioData = Array.from({ length: 64 }, () => Math.random() * 100);
    setAudioData(newAudioData);
  };

  // Update volume
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current?.currentTime || 0);
    }
  }, [volume]);

  // Generate audio data for visualization
  useEffect(() => {
    const interval = setInterval(generateAudioData, 100);
    return () => clearInterval(interval);
  }, []);

  const value: AudioContextType = {
    isPlaying,
    volume,
    currentMode,
    audioData,
    setIsPlaying,
    setVolume,
    setCurrentMode,
    playSound,
    stopSound,
    generateAudioData,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}; 