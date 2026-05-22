import React from 'react';
import { useTheme } from '@mui/material';

const useBaseLoginStyles = () => {
    const theme = useTheme();

    return {
        container: {
            alignItems: 'center',
            // Fundo roxo escuro profundo de fallback
            background: 'radial-gradient(circle at 0% 0%, #5D307A 0%, #2E1147 100%)', backgroundColor: '#3b1c55',
            display: 'flex',
            justifyContent: 'center',
            minHeight: '100vh',
            overflow: 'hidden',
            padding: '24px 16px',
            position: 'relative',
            width: '100%'
        },
        forgotPassword: {
            '&:hover': {
                color: '#5D307A',
                textDecoration: 'underline'
            },
            color: '#E83268',
            fontSize: '0.85rem',
            fontWeight: '600',
            textDecoration: 'none',
            transition: 'all 0.2s ease'
        },
        paper: {
            backdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '28px',
            boxShadow: '0 25px 60px -15px rgba(26, 8, 41, 0.4)',
            margin: 'auto',
            maxWidth: '460px',
            padding: { md: '48px 40px', xs: '36px 24px' },
            position: 'relative',
            textAlign: 'center',
            width: '100%',
            zIndex: 2
        },
        partnersColor: 'transparent',
        subtitle: {
            color: '#718096',
            fontFamily: 'Outfit, Inter, sans-serif',
            fontSize: '0.9rem',
            lineHeight: 1.5,
            marginBottom: '8px'
        },
        title: {
            color: '#5D307A',
            fontFamily: 'Outfit, Inter, sans-serif',
            fontSize: { md: '1.9rem', xs: '1.65rem' },
            fontWeight: 800,
            letterSpacing: '-0.5px',
            lineHeight: 1.25,
            marginBottom: '8px'
        }
    };
};

export default useBaseLoginStyles;
