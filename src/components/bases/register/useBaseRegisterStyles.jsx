import React from 'react';
import { useTheme } from '@mui/material';

const useBaseRegisterStyles = () => {
    const theme = useTheme();

    return {
        finalButton: {
            '&:hover': {
                background: 'linear-gradient(135deg, #5D307A 0%, #E83268 100%)',
                boxShadow: '0 8px 25px rgba(232, 50, 104, 0.35)',
                transform: 'translateY(-2px)'
            },
            background: 'linear-gradient(135deg, #E83268 0%, #ff5c8c 100%)',
            borderRadius: '14px',
            boxShadow: '0 6px 20px rgba(232, 50, 104, 0.22)',
            fontFamily: 'Outfit, Inter, sans-serif',
            fontSize: '0.9rem',
            fontWeight: 800,
            letterSpacing: '0.5px',
            marginTop: '35px',
            px: 5,
            py: 1.5,
            textTransform: 'uppercase',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            width: 'fit-content'
        },
        grid: {
            [theme.breakpoints.up('xl')]: {
                maxWidth: '1200px',
                width: '100%',
            },
            display: 'grid',
            gap: 3,
            width: 'auto',
        },
        paper: {
            [theme.breakpoints.up('sm')]: {
                margin: '40px auto',
                maxWidth: '1000px',
                padding: '48px 40px',
            },
            [theme.breakpoints.up('md')]: {
                marginLeft: 'auto',
                marginRight: 'auto',
            },

            '& .MuiFormHelperText-root': {
                fontFamily: 'Outfit, Inter, sans-serif',
                fontSize: '0.75rem',
                marginLeft: '4px'
            },
            '& .MuiInputLabel-root': {
                '&.Mui-focused': {
                    color: '#5D307A',
                },
                fontFamily: 'Outfit, Inter, sans-serif',
                fontSize: '0.9rem'
            },
            // Custom modern overrides for all child Inputs/TextFields/Selects inside register
            '& .MuiOutlinedInput-root': {
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#E83268',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#5D307A',
                    borderWidth: '2px',
                },
                borderRadius: '14px',
                transition: 'all 0.2s ease-in-out',
            },
            background: 'linear-gradient(135deg, #ffffff 0%, #fefeff 100%)',
            border: '1px solid rgba(93, 48, 122, 0.06)',
            borderRadius: '28px',

            boxShadow: '0px 20px 50px rgba(93, 48, 122, 0.08)',
            margin: '16px',
            padding: '32px 24px'
        },
        textTitle: {
            '&::after': {
                background: 'linear-gradient(45deg, #5D307A 0%, #E83268 100%)',
                borderRadius: '2px',
                bottom: '-8px',
                content: '""',
                height: '4px',
                left: 0,
                position: 'absolute',
                width: '60px',
            },
            background: 'linear-gradient(45deg, #5D307A 20%, #E83268 85%)',
            display: 'inline-block',
            fontFamily: 'Outfit, Inter, sans-serif',
            fontSize: { md: '2rem', xs: '1.65rem' },
            fontWeight: 800,
            letterSpacing: '-0.5px',
            marginBottom: '40px',
            position: 'relative',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
        },
    };
};

export default useBaseRegisterStyles;
