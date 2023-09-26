import React from 'react';
import { Fab } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  top: number;
  left: number;
}

const BackButton: React.FC<BackButtonProps> = ({ top, left }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <Fab
      style={{
        position: 'fixed',
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 1000, 
      }}
      color="primary"
      onClick={handleGoBack}
    >
      <ArrowBack />
    </Fab>
  );
};

export default BackButton;
