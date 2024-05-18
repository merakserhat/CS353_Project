import React from 'react';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <Button
            sx={{ color:"white" }}
            variant="text"
            color="secondary"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
        >
            Logout
        </Button>
    );
};

export default LogoutButton;
