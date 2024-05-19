import React, { useContext } from 'react';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../data/context/GlobalContextProps';

const LogoutButton: React.FC = () => {
    const { setUser } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(undefined);
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
