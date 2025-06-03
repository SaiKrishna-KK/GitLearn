import React from 'react';
import { Container, Typography, Box, Button, Paper, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import TerminalIcon from '@mui/icons-material/Terminal';
import SchoolIcon from '@mui/icons-material/School';
import BuildIcon from '@mui/icons-material/Build';
import CodeIcon from '@mui/icons-material/Code';
import StarIcon from '@mui/icons-material/Star';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Interactive Tutorials',
      description: 'Master Git concepts through hands-on, step-by-step interactive lessons with real examples',
      path: '/tutorials',
      icon: <SchoolIcon sx={{ fontSize: 48, color: '#4CAF50' }} />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      lessons: '12 Lessons',
      difficulty: 'Beginner to Advanced'
    },
    {
      title: 'Live Terminal',
      description: 'Practice Git commands in a real terminal environment with instant feedback and guidance',
      path: '/interactive-demo',
      icon: <TerminalIcon sx={{ fontSize: 48, color: '#FF9800' }} />,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      lessons: '50+ Commands',
      difficulty: 'Hands-on Practice'
    },
    {
      title: 'Build Your Own Git',
      description: 'Understand Git internals by building your own version control system in Python',
      path: '/project',
      icon: <BuildIcon sx={{ fontSize: 48, color: '#2196F3' }} />,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      lessons: '5 Modules',
      difficulty: 'Advanced Project'
    }
  ];

  const stats = [
    { number: '50+', label: 'Git Commands', icon: <CodeIcon /> },
    { number: '12', label: 'Interactive Lessons', icon: <SchoolIcon /> },
    { number: '100%', label: 'Hands-on Learning', icon: <StarIcon /> },
    { number: '1', label: 'Complete Project', icon: <BuildIcon /> }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1 }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <Box sx={{ pt: 12, pb: 8, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <GitHubIcon sx={{ fontSize: 80, color: 'white', filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.5))' }} />
              </motion.div>
            </Box>
            
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #fff, #FFE082, #FFAB91)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '3rem', md: '4rem', lg: '5rem' },
                textShadow: '0 0 30px rgba(255,255,255,0.3)',
                mb: 3
              }}
            >
              Master Git Like a Pro
            </Typography>
            
            <Typography 
              variant="h4" 
              color="rgba(255,255,255,0.95)" 
              paragraph
              sx={{ mb: 6, fontWeight: 400, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
            >
              Interactive learning • Real terminal • Build your own Git
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 8 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/tutorials')}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.2rem',
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1)',
                  boxShadow: '0 8px 32px rgba(255, 107, 107, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FF5252, #26A69A, #2196F3)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 40px rgba(255, 107, 107, 0.4)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Start Learning
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/interactive-demo')}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.2rem',
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.4)',
                  borderWidth: '2px',
                  backdropFilter: 'blur(10px)',
                  background: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    borderColor: '#4ECDC4',
                    background: 'rgba(78, 205, 196, 0.2)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 32px rgba(78, 205, 196, 0.3)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Try Terminal
              </Button>
            </Box>

            {/* Stats Section */}
            <Box 
              sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                gap: 4,
                mb: 8
              }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                >
                  <Paper
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      background: 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: 3,
                      '&:hover': {
                        background: 'rgba(255,255,255,0.25)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                      },
                      transition: 'all 0.4s ease',
                    }}
                  >
                    <Box sx={{ color: '#FFE082', mb: 1, fontSize: '24px' }}>{stat.icon}</Box>
                    <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                      {stat.number}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      {stat.label}
                    </Typography>
                  </Paper>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Box>

        {/* Features Section */}
        <Box sx={{ pb: 8 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              sx={{ 
                textAlign: 'center', 
                color: 'white', 
                mb: 6,
                fontWeight: 'bold',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              Choose Your Learning Path
            </Typography>
          </motion.div>

          <Box 
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' },
              gap: 4,
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -15, scale: 1.02 }}
              >
                <Paper
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 4,
                    '&:hover': {
                      background: 'rgba(255,255,255,0.2)',
                      boxShadow: '0 25px 80px rgba(0,0,0,0.15)',
                      border: '1px solid rgba(255,255,255,0.3)',
                    },
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: feature.gradient,
                    }
                  }}
                  onClick={() => navigate(feature.path)}
                >
                  <Box sx={{ mb: 3, transform: 'scale(1.1)' }}>
                    {feature.icon}
                  </Box>

                  <Typography variant="h5" component="h3" gutterBottom sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
                    {feature.title}
                  </Typography>

                  <Typography color="rgba(255,255,255,0.9)" paragraph sx={{ flexGrow: 1, mb: 3 }}>
                    {feature.description}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Chip 
                      label={feature.lessons} 
                      size="small" 
                      sx={{ 
                        background: 'rgba(255, 224, 130, 0.2)',
                        color: '#FFE082',
                        border: '1px solid rgba(255, 224, 130, 0.3)',
                        fontWeight: 500
                      }} 
                    />
                    <Chip 
                      label={feature.difficulty} 
                      size="small" 
                      sx={{ 
                        background: 'rgba(78, 205, 196, 0.2)',
                        color: '#4ECDC4',
                        border: '1px solid rgba(78, 205, 196, 0.3)',
                        fontWeight: 500
                      }} 
                    />
                  </Box>

                  <Button
                    variant="contained"
                    sx={{
                      background: feature.gradient,
                      color: 'white',
                      fontWeight: 600,
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      '&:hover': {
                        opacity: 0.9,
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(feature.path);
                    }}
                  >
                    Get Started
                  </Button>
                </Paper>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 