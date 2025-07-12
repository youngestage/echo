import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Headphones, Users, Gamepad2, Sparkles, Zap, Heart, Play } from 'lucide-react';

const HomePage: React.FC = () => {
  const modes = [
    {
      title: 'Flow Mode',
      description: 'Personalized soundscapes that adapt to your rhythm and mood',
      icon: <Headphones className="w-12 h-12 text-primary-purple" />,
      path: '/flow',
      gradient: 'from-purple-100/50 to-yellow-100/50',
    },
    {
      title: 'Jam Mode',
      description: 'Collaborative real-time music creation with friends',
      icon: <Users className="w-12 h-12 text-primary-purple" />,
      path: '/jam',
      gradient: 'from-yellow-100/50 to-purple-100/50',
    },
    {
      title: 'Play Mode',
      description: 'Social gaming with rhythm and sound challenges',
      icon: <Gamepad2 className="w-12 h-12 text-primary-purple" />,
      path: '/play',
      gradient: 'from-purple-100/50 to-cream-200/50',
    },
  ];

  const features = [
    {
      icon: <Sparkles className="w-12 h-12 text-primary-yellow" />,
      title: 'AI-Powered Adaptation',
      description: 'Intelligent soundscapes that learn from your preferences and adapt in real-time',
    },
    {
      icon: <Users className="w-12 h-12 text-primary-yellow" />,
      title: 'Real-Time Collaboration',
      description: 'Create music together with friends in synchronized, low-latency sessions',
    },
    {
      icon: <Zap className="w-12 h-12 text-primary-yellow" />,
      title: 'Interactive Gaming',
      description: 'Compete and collaborate through rhythm-based challenges and competitions',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen pt-16 bg-pattern">
      {/* Hero Section */}
      <section className="relative section-spacing overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-background to-cream-200/80" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-purple/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-yellow/20 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="relative container-echo text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            <h1 className="text-hero text-gradient mb-6 font-black">
              Echo
            </h1>
            <p className="text-2xl md:text-3xl text-description mb-8 max-w-4xl mx-auto leading-relaxed">
              Interactive soundscaping platform that adapts to your rhythm and connects you with others
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/flow" className="btn-primary flex items-center gap-2">
                <Play className="w-5 h-5" />
                Start Creating
              </Link>
              <Link to="/jam" className="btn-secondary">
                Explore Modes
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="floating-element"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <Heart className="w-24 h-24 mx-auto text-primary-yellow glow-yellow" />
              <div className="absolute inset-0 w-24 h-24 mx-auto bg-primary-yellow/20 rounded-full blur-xl animate-pulse" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modes Section */}
      <section className="section-spacing">
        <div className="container-echo">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-section-title text-foreground mb-6">
              Choose Your <span className="text-gradient">Experience</span>
            </h2>
            <p className="text-description max-w-3xl mx-auto">
              Three distinct modes designed for different creative journeys and collaborative experiences
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {modes.map((mode, index) => (
              <motion.div
                key={mode.title}
                variants={itemVariants}
                className={`floating-element ${index === 1 ? 'floating-element-delayed' : ''}`}
              >
                <Link to={mode.path} className="block">
                  <div className="mode-card h-full group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} rounded-elegant-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="relative z-10">
                      <div className="mb-6">{mode.icon}</div>
                      <h3 className="text-card-title text-foreground mb-4">{mode.title}</h3>
                      <p className="text-description mb-8 leading-relaxed">{mode.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="btn-accent text-sm">
                          Enter Mode
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Play className="w-5 h-5 text-primary-yellow" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing bg-white/30">
        <div className="container-echo">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-section-title text-foreground mb-6">
              Why Choose <span className="text-gradient">Echo</span>?
            </h2>
            <p className="text-description max-w-3xl mx-auto">
              Cutting-edge technology meets intuitive design for the ultimate audio experience
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="feature-card"
              >
                <div className="mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="text-card-title text-foreground mb-4">{feature.title}</h3>
                <p className="text-description leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-spacing">
        <div className="container-echo">
          <motion.div
            className="glass-card-purple p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-gradient mb-2">10K+</div>
                <div className="text-description">Active Creators</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gradient mb-2">50K+</div>
                <div className="text-description">Soundscapes Created</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gradient mb-2">1M+</div>
                <div className="text-description">Sessions Played</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing">
        <div className="container-echo">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-section-title text-foreground mb-6">
              Ready to <span className="text-gradient">Experience</span> Echo?
            </h2>
            <p className="text-description mb-12">
              Join thousands of creators, listeners, and gamers in our interactive soundscape community. 
              Start your journey today and discover what makes Echo special.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/flow" className="btn-primary flex items-center gap-2">
                <Play className="w-5 h-5" />
                Start Your Journey
              </Link>
              <Link to="/jam" className="btn-secondary">
                Create Together
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 