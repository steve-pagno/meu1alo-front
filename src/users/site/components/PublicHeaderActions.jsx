import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Fade, Menu, MenuItem } from '@mui/material';
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
        <Box sx={{ alignItems: 'center', display: 'flex', gap: 2 }}>
            <Button color="inherit" onClick={navigateToSobre} sx={{ display: { sm: 'block', xs: 'none' } }}>
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
                sx={{ borderRadius: '20px', fontWeight: 'bold', paddingX: 3 }}
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
                    sx: { borderRadius: '12px', minWidth: 200, mt: 1.5 }
                }}
                anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'bottom',
                }}
                transformOrigin={{
                    horizontal: 'right',
                    vertical: 'top',
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
