import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Trophy, Users, Timer, Target, Zap, Heart, Star } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

interface Game {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  players: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Rhythm' | 'Memory' | 'Creativity' | 'Speed';
}

interface GameSession {
  id: string;
  gameName: string;
  players: number;
  score: number;
  timeLeft: number;
  status: 'waiting' | 'playing' | 'finished';
}

const PlayMode: React.FC = () => {
  const { isPlaying, playSound, stopSound, audioData } = useAudio();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const games: Game[] = [
    {
      id: 'rhythm-match',
      name: 'Rhythm Match',
      description: 'Match the rhythm patterns as they appear. Test your timing and musical memory!',
      icon: <Target size={24} />,
      players: '1-4',
      duration: '3-5 min',
      difficulty: 'Medium',
      category: 'Rhythm'
    },
    {
      id: 'sound-memory',
      name: 'Sound Memory',
      description: 'Remember and recreate increasingly complex sound sequences.',
      icon: <Heart size={24} />,
      players: '1-8',
      duration: '2-4 min',
      difficulty: 'Easy',
      category: 'Memory'
    },
    {
      id: 'beat-builder',
      name: 'Beat Builder',
      description: 'Collaborate to build the most creative beat in limited time.',
      icon: <Zap size={24} />,
      players: '2-6',
      duration: '5-10 min',
      difficulty: 'Hard',
      category: 'Creativity'
    },
    {
      id: 'speed-composer',
      name: 'Speed Composer',
      description: 'Create melodies as fast as possible while maintaining quality.',
      icon: <Timer size={24} />,
      players: '1-4',
      duration: '2-3 min',
      difficulty: 'Hard',
      category: 'Speed'
    }
  ];

  const handleGameStart = (game: Game) => {
    setSelectedGame(game);
    setGameSession({
      id: Date.now().toString(),
      gameName: game.name,
      players: 1,
      score: 0,
      timeLeft: 180, // 3 minutes
      status: 'playing'
    });
    setGameActive(true);
    setPlayerScore(0);
    setStreak(0);
    playSound('energize');
  };

  const handleGameEnd = () => {
    setGameActive(false);
    setGameSession(prev => prev ? { ...prev, status: 'finished' } : null);
    stopSound();
  };

  const handleScoreIncrease = () => {
    setPlayerScore(prev => prev + 10 * (streak + 1));
    setStreak(prev => prev + 1);
  };

  const handleMissedNote = () => {
    setStreak(0);
  };

  // Simulate rhythm game
  const [activeNotes, setActiveNotes] = useState<number[]>([]);

  useEffect(() => {
    if (gameActive && selectedGame?.id === 'rhythm-match') {
      const interval = setInterval(() => {
        setActiveNotes([Math.floor(Math.random() * 4)]);
        setTimeout(() => setActiveNotes([]), 500);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameActive, selectedGame]);

  // Game timer
  useEffect(() => {
    if (gameSession?.status === 'playing' && gameSession.timeLeft > 0) {
      const timer = setTimeout(() => {
        setGameSession(prev => prev ? { ...prev, timeLeft: prev.timeLeft - 1 } : null);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameSession?.timeLeft === 0) {
      handleGameEnd();
    }
  }, [gameSession?.timeLeft, gameSession?.status]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#4ecdc4';
      case 'Medium': return '#ffd93d';
      case 'Hard': return '#ff6b6b';
      default: return '#ffffff';
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
        <h1 className="page-title">Play Mode</h1>
        <p className="page-subtitle">Social mini-games that combine music creation with interactive challenges</p>
      </motion.div>

      {!gameActive ? (
        <>
          {/* Game Selection */}
          <div className="container-echo">
            <motion.div
              className="games-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {games.map((game) => (
                <motion.div
                  key={game.id}
                  className="game-card group"
                  onClick={() => handleGameStart(game)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-primary-yellow text-3xl">
                      {game.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{game.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-description">
                        <span>{game.players} players</span>
                        <span>•</span>
                        <span>{game.duration}</span>
                        <span>•</span>
                        <span 
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: `${getDifficultyColor(game.difficulty)}20`,
                            color: getDifficultyColor(game.difficulty)
                          }}
                        >
                          {game.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-description mb-6 leading-relaxed">{game.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-yellow font-medium capitalize">{game.category}</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="btn-accent text-sm">
                        Start Game
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Leaderboard */}
          <div className="container-echo">
            <motion.div
              className="glass-card mt-12"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-primary-yellow mb-6 text-center">
                🏆 Today's Leaderboard
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Alex', score: 2450, game: 'Rhythm Match' },
                  { name: 'Sam', score: 2380, game: 'Sound Memory' },
                  { name: 'Jordan', score: 2150, game: 'Beat Builder' },
                  { name: 'Casey', score: 1890, game: 'Speed Composer' }
                ].map((player, index) => (
                  <div 
                    key={player.name} 
                    className={`leaderboard-item ${index === 0 ? 'border-2 border-primary-yellow' : ''}`}
                  >
                    <div className="text-2xl mr-4">
                      {index === 0 ? '🏆' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🎯'}
                    </div>
                    <div>
                      <div className="text-foreground font-semibold">
                        {player.name}
                      </div>
                      <div className="text-description text-sm">
                        {player.score} pts • {player.game}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      ) : (
        /* Game Interface */
        <div className="container-echo">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Game HUD */}
            <div className="glass-card mb-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-description text-sm">Score</div>
                    <div className="text-primary-yellow text-2xl font-bold">
                      {playerScore.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-description text-sm">Streak</div>
                    <div className="text-green-400 text-2xl font-bold">
                      {streak}x
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-foreground text-xl font-semibold">
                    {selectedGame?.name}
                  </div>
                  <div className="text-description text-sm">
                    {gameSession?.players} player{gameSession?.players !== 1 ? 's' : ''}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-description text-sm">Time Left</div>
                  <div className={`text-2xl font-bold ${
                    (gameSession?.timeLeft ?? 0) < 30 ? 'text-red-400' : 'text-foreground'
                  }`}>
                    {formatTime(gameSession?.timeLeft ?? 0)}
                  </div>
                </div>
              </div>
            </div>

            {/* Game Area */}
            {selectedGame?.id === 'rhythm-match' && (
              <div className="glass-card-purple min-h-96 flex flex-col justify-center items-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[0, 1, 2, 3].map(index => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        if (activeNotes.includes(index)) {
                          handleScoreIncrease();
                        } else {
                          handleMissedNote();
                        }
                      }}
                      className={`rhythm-button ${activeNotes.includes(index) ? 'active' : ''}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      animate={activeNotes.includes(index) ? { scale: [1, 1.2, 1] } : {}}
                    >
                      {index + 1}
                    </motion.button>
                  ))}
                </div>
                <p className="text-description text-center text-lg">
                  Hit the glowing buttons as they appear!
                </p>
              </div>
            )}

            {/* Game Controls */}
            <div className="flex justify-center mt-8">
              <motion.button
                className="btn-secondary"
                onClick={handleGameEnd}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                End Game
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PlayMode; 