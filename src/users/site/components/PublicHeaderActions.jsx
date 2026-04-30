import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Menu, MenuItem, Fade } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const PublicHeaderActions = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleLoginClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = (path) => {
        handleClose();
        navigate(path);
    };

    const navigateToSobre = () => {
        navigate('/sobre');
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button color="inherit" onClick={navigateToSobre} sx={{ display: { xs: 'none', sm: 'block' } }}>
                Sobre a plataforma
            </Button>
            {/* <Button color="inherit" sx={{ display: { xs: 'none', md: 'block' } }}> */}
                {/* Equipe */}
            {/* </Button> */}
            
            <Button
                variant="contained"
                color="secondary"
                disableElevation
                onClick={handleLoginClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ borderRadius: '20px', paddingX: 3, fontWeight: 'bold' }}
            >
                Fazer login
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                PaperProps={{
                    elevation: 3,
                    sx: { mt: 1.5, minWidth: 200, borderRadius: '12px' }
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={() => handleNavigate('/fono/login')}>
                    Área do Fonoaudiólogo
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/pais/login')}>
                    Área dos Pais
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/institucional/login')}>
                    Área da Instituição
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/secretaria/login')}>
                    Área da Secretaria
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default PublicHeaderActions;
