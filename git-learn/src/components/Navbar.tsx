import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Tutorials', path: '/tutorials' },
    { label: 'Interactive Demo', path: '/interactive-demo' },
    { label: 'Final Project', path: '/project' }
  ];

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 50%, rgba(240, 147, 251, 0.9) 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ display: 'flex', alignItems: 'center', marginRight: '2rem' }}
        >
          <GitHubIcon sx={{ mr: 1, fontSize: 28 }} />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              cursor: 'pointer',
              background: 'linear-gradient(45deg, #fff, #4ECDC4)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            onClick={() => navigate('/')}
          >
            GitLearn
          </Typography>
        </motion.div>

        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <motion.div
              key={item.path}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <Button
                color="inherit"
                onClick={() => navigate(item.path)}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  color: location.pathname === item.path ? '#4ECDC4' : 'rgba(255,255,255,0.9)',
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#4ECDC4'
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: location.pathname === item.path ? '100%' : '0%',
                    height: '2px',
                    background: 'linear-gradient(45deg, #4ECDC4, #FF6B6B)',
                    transition: 'width 0.3s ease'
                  },
                  '&:hover::after': {
                    width: '100%'
                  }
                }}
              >
                {item.label}
              </Button>
            </motion.div>
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.3)',
                '&:hover': {
                  borderColor: '#4ECDC4',
                  backgroundColor: 'rgba(76, 205, 196, 0.1)',
                  color: '#4ECDC4'
                }
              }}
              href="https://github.com"
              target="_blank"
            >
              GitHub
            </Button>
          </motion.div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 