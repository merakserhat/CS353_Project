import React from 'react';
import { Button, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';

interface ProfileButtonProps {
    name: string;
    email: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ name, email }) => {
    // Function to truncate email if it's too long
    const truncateEmail = (email: string, maxLength: number): string => {
        if (email.length <= maxLength) return email;
        const truncatedEmail = email.substring(0, maxLength - 3) + '...';
        return truncatedEmail;
    };

    return (
        <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
            <Button variant="contained" color="primary" sx={{ margin: "10px" }} startIcon={<AccountCircleIcon sx={{ width: "32px", height: "32px" }} />} >
                <Stack direction="column" spacing={0} >
                    <Typography variant="h6" style={{ marginRight: 'auto' }}>{truncateEmail(name, 15)}</Typography>
                    <Typography variant="subtitle2">{truncateEmail(email, 20)}</Typography>
                </Stack>
            </Button>
        </Link>

    );
};

export default ProfileButton;
