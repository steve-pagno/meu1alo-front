import React, { useEffect, useState } from 'react';
import { Backdrop, CircularProgress, Typography } from '@mui/material';

const LoadingBackdrop = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleLoading = (event) => {
            setLoading(event.detail);
        };

        window.addEventListener('global-loading', handleLoading);
        return () => {
            window.removeEventListener('global-loading', handleLoading);
        };
    }, []);

    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: 1350,
                flexDirection: 'column',
                gap: 2,
                backgroundColor: 'rgba(93, 48, 122, 0.5)',
                backdropFilter: 'blur(5px)',
                transition: 'all 0.3s ease-in-out'
            }}
            open={loading}
        >
            <CircularProgress color="secondary" size={60} thickness={4.5} />
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, letterSpacing: '0.5px' }}>
                Processando requisição...
            </Typography>
        </Backdrop>
    );
};

export default LoadingBackdrop;
